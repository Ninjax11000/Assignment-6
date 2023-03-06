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

document.getElementById('show-all-btn').addEventListener('click',function(){

  fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then(res=>res.json())
  .then(data=>Ai(data.data.tools,5));

  const showBtn=document.getElementById('show-all-btn');
  showBtn.classList.add('d-none');

})
