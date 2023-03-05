const loadAi=()=>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=>res.json())
    .then(data=>Ai(data.data.tools));

}

const Ai= data=>{
    console.log(data);
    const cardContainer=document.getElementById('card-container');
    data.forEach(element => {
        console.log(element);
        const cardDiv=document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML=`
        <div class="card">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
              </div>
        
        `
        cardContainer.appendChild(cardDiv);
    });
}

loadAi();