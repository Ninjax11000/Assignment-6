const loadAi=()=>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=>res.json())
    .then(data=>Ai(data.data.tools));

}

const Ai= data=>{
    console.log(data);
    const cardContainer=document.getElementById('card-container');
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
              </div>
        
        `
        cardContainer.appendChild(cardDiv);
    });
}

loadAi();