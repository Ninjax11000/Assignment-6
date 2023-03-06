const loadAi=()=>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=>res.json())
    .then(data=>Ai(data.data.tools,1));

}

const Ai= (data,limit)=>{
    toggleSpinner(true);
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerText='';
    if(limit===1) data=data.slice(0,6);
    else data=data;
  
    
    data.forEach(element => {
        
       
        const cardDiv=document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML=`
        <div class="card">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Features</h5>
                  <ol>
                  ${element.features.map(a=> `<li> ${a}</li>`).join('')}
                  </ol>
                </div>
                <hr class="mx-3">
                <h5 class="mx-3">${element.name}</h5>
                <div class="d-flex justify-content-between align-items-center mb-2 me-2"><P class="ms-3"><i class="fa-solid fa-calendar-days"></i> ${element.published_in}</P>
                <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchDetails('${element.id}')">Go somewhere</a>
                </div>
              </div>
        
        `
        cardContainer.appendChild(cardDiv);
    });
    toggleSpinner(false);
}

const toggleSpinner=isLoading=>{
  const loaderSection=document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}

document.getElementById('show-all-btn').addEventListener('click',function(){

  fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then(res=>res.json())
  .then(data=>Ai(data.data.tools,5));

  const showBtn=document.getElementById('show-all-btn');
  showBtn.classList.add('d-none');

})

const fetchDetails=id=>{
  const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
  console.log(url);
  fetch(url)
  .then(res=>res.json())
  .then(data=>showDetails(data));
}

const showDetails=data=>{

  
  const a=[];
  for (const key in data.data.features) {
    a.push(data.data.features[key].feature_name);
    console.log(data.data.features[key].feature_name);
  }
  
  const modalElement=document.getElementById('modalContent');
  const modalContent=document.createElement('div');
  modalContent.classList.add('modal-body')
  modalContent.innerHTML=`
  
              <div class="d-flex gap-3">
                <!-- first card -->
                <div class="card">

                  <div class="card-body">
                    <h5 class="card-title">${data.data.description}</h5>
                    <div class="d-flex">
                      <div>$10/month Basic</div>
                      <div>$10/month Basic</div>
                      <div>$10/month Basic</div>
                    </div>
                    <div class="d-flex">
                      <div>
                        <h2 class="fs-5 fw-semibold">Features</h2>
                        <ul>
                        ${a.map(x=> `<li> ${x}</li>`).join('')}
                        </ul>
                      </div>
                      <div>
                        <h2 class="fs-5 fw-semibold">Integrations</h2>
                        <ul>
                          <li>Customizable responses</li>
                          <li>Customizable responses</li>
                          <li>Customizable responses</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 2nd card -->
                <div>
                  <div class="card">

                    <div class="card-body">
                      <h5 class="card-title">ChatGPT is a large language model developed by OpenAI that can generate
                        human-like responses in a conversation.</h5>
                      <div class="d-flex">
                        <div>$10/month Basic</div>
                        <div>$10/month Basic</div>
                        <div>$10/month Basic</div>
                      </div>
                      <div class="d-flex">
                        <div>
                          <h2 class="fs-5 fw-semibold">Features</h2>
                          <ul>
                            <li>Customizable responses</li>
                            <li>Customizable responses</li>
                            <li>Customizable responses</li>
                          </ul>
                        </div>
                        <div>
                          <h2 class="fs-5 fw-semibold">Integrations</h2>
                          <ul>
                            <li>Customizable responses</li>
                            <li>Customizable responses</li>
                            <li>Customizable responses</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




            
  `
  modalElement.appendChild(modalContent);

}
