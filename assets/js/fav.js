let url=(`http://localhost:3000/data`);
let favurl=('http://localhost:3000/favorit');
let filterArr = [];
let coppy = [];
let searchInp = document.querySelector("#search");
let loadBtn = document.querySelector(".load")
let page=3;

let botom=document.querySelector(".botttom")
async function getAlldata(){
  let res = await axios.get(favurl);
  let data = await res.data;
  coppy = data;
botom.innerHTML='';
filterArr = filterArr.length || searchInp.value ? filterArr : data;
filterArr.slice(0, page).forEach(element => {

botom.innerHTML+=`
<div class="cardd">
<div class="img"> <img src=${element.image}> </div>
        
<div class="text"><span>${element.head}</span>
<h2>${element.name}</h2>
<p>${element.text}</p>
<div class="icon">
<button class="delete" onclick="deleteCard(${element.id})"><i class = "bi bi-trash"></i></button>

</div>
</div>
</div>

`

})

}

getAlldata();

function deleteCard(id) {
  axios.delete(`http://localhost:3000/favorit/${id}`);
  window.location.reload();
}