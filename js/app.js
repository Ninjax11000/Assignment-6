const loadAi = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => Ai(data.data.tools, 1));
};

const Ai = (data, limit) => {
  toggleSpinner(true);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = "";
  if (limit === 1) data = data.slice(0, 6);
  else data = data;

  data.forEach((element) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    cardDiv.innerHTML = `
        <div class="card">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Features</h5>
                  <ol>
                  ${element.features.map((a) => `<li> ${a}</li>`).join("")}
                  </ol>
                </div>
                <hr class="mx-3">
                <h5 class="mx-3">${element.name}</h5>
                <div class="d-flex justify-content-between align-items-center mb-2 me-2"><P class="ms-3"><i class="fa-solid fa-calendar-days"></i> ${
                  element.published_in
                }</P>
                <a href="#" class="btn bg-danger rounded-circle bg-opacity-10 text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchDetails('${
                  element.id
                }')"><i class="fa-sharp fa-solid fa-arrow-right"></i></a>
                </div>
              </div>
        
        `;
    cardContainer.appendChild(cardDiv);
  });
  toggleSpinner(false);
};

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

document.getElementById("show-all-btn").addEventListener("click", function () {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => Ai(data.data.tools, 5));

  const showBtn = document.getElementById("show-all-btn");
  showBtn.classList.add("d-none");
});

const fetchDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data));
};

const showDetails = (data) => {
  const a = [];
  for (const key in data.data.features) {
    a.push(data.data.features[key].feature_name);
    // console.log(data.data.features[key].feature_name);
  }

  const modalElement = document.getElementById("modalContent");
  modalElement.innerText = "";
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-body");
  modalContent.innerHTML = `
  
              <div class="row  px-5 py-5">
                <!-- first card -->
                <div class="col  col-md-6">
                <div class="card bg-danger bg-opacity-10 ">

                  <div class="card-body">
                    <h5 class="card-title pb-3 fs-5">${
                      data.data.description
                    }</h5>
                    <div class="d-md-flex gap-2 my-2 text-center  ">
                      <div class="bg-light rounded text-success fw-semibold  px-2 py-2">${
                        data.data.pricing
                          ? data.data.pricing[0].price
                          : "no price"
                      } ${
    data.data.pricing ? data.data.pricing[0].plan : "no plan"
  }</div>
                      <div class="bg-light rounded text-warning fw-semibold px-2 py-2">${
                        data.data.pricing
                          ? data.data.pricing[1].price
                          : "no price"
                      } ${
    data.data.pricing ? data.data.pricing[1].plan : "no plan"
  }</div>
                      <div  class="bg-light rounded text-danger fw-semibold px-2 py-2">${
                        data.data.pricing
                          ? data.data.pricing[2].price
                          : "no price"
                      } ${
    data.data.pricing ? data.data.pricing[2].plan : "no plan"
  }</div>
                    </div>
                    <div class="d-md-flex mt-3 justify-content-between">
                      <div>
                        <h5 class=" fw-semibold">Features</h2>
                        <ul>
                        ${a.map((x) => `<li> ${x}</li>`).join("")}
                        </ul>
                      </div>
                      <div>
                        <h5 class=" fw-semibold">Integrations</h2>
                        <ul>
                        ${
                          data.data.integrations
                            ? data.data.integrations
                                .map((x) => `<li> ${x}</li>`)
                                .join("")
                            : "not available"
                        }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                
                <!-- 2nd card -->
                <div class="col  " >
                  <div class="card ">

                    <div class="card-body text-center " >
                    <div>
                    <button id="accuracyBtn" type="button" class="btn btn-danger aButton ">
                      ${data.data.accuracy.score?data.data.accuracy.score*100:'blank'}% accuracy
                      </button>
                    <img  src="${
                      data.data.image_link[0]
                    }" class="img-fluid rounded" alt="..." onload="hideAccuracy(${data.data.accuracy.score})">
                    <h2 class="fs-5">${
                      data.data.input_output_examples
                        ? data.data.input_output_examples[0].input
                        : "Can you give any example?"
                    }</h2>
                    <p>${
                      data.data.input_output_examples
                        ? data.data.input_output_examples[0].output
                        : "No! Not Yet! Take a break!!!"
                    }</p>
                    </div>
                   

                    </div>
                  </div>
                </div>
              </div>




            
  `;
  modalElement.appendChild(modalContent);
};

function hideAccuracy(data){
  const accuracy=document.getElementById('accuracyBtn');
  
  if(data===null){
    
    accuracy.classList.add('d-none');
  }
  else{
    accuracy.classList.remove('d-none');
  }
  
}

const sortByDate=()=>{
  fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then((res) => res.json())
  .then((data) => (data.data.tools));
}