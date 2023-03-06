const loadAi=()=>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=>res.json())
    .then(data=>Ai(data.data.tools));

}

const Ai= data=>{
    console.log(data);
    toggleSpinner(true);
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerText='';
  
    data=data.slice(0,6);
    data.forEach(element => {
        console.log(element.features);
       
        const cardDiv=document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML=`
        <div class="card">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Features</h5>
                  <ol>
                  ${element.features.map(a=> `<li> ${a}</li>`)}
                  </ol>
                </div>
                <hr class="mx-3">
                <h5 class="mx-3">${element.name}</h5>
                <P class="ms-3"><i class="fa-solid fa-calendar-days"></i> ${element.published_in}</P>
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

