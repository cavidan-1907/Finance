let id= new URLSearchParams (window.location.search).get("id");
let botom= document.querySelector(".bottttom");
let url = "http://localhost:3000/data/";
async function getCardById(id){
    let res = await axios.get(url + id);
    let element= await res.data

    botom.innerHTML=
    `
    <div class="cardd">
    <div class="img"> <img src=${element.image}> </div>
            
    <div class="text"><span>${element.head}</span>
    <h2>${element.name}</h2>
    <p>${element.text}</p>
   <a href="./index.html"><button class="hom">Home</button class="hom"></a>
    </div>
    </div>
    `
    };
getCardById(id);