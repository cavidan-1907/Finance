
let nav = document.querySelector("nav")
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.backgroundColor = "#10c98f"
  }
  else {
    nav.style.backgroundColor = "transparent"
  }
});


let url = (`http://localhost:3000/data`);
let favurl = ('http://localhost:3000/favorit');
let filterArr = [];
let coppy = [];
let searchInp = document.querySelector("#search");
let loadBtn = document.querySelector(".load")
let page = 3;

let botom = document.querySelector(".botttom")
async function getAlldata() {
  let res = await axios.get(url);
  let data = await res.data;
  coppy = data;
  botom.innerHTML = '';
  filterArr = filterArr.length || searchInp.value ? filterArr : data;
  filterArr.slice(0, page).forEach(element => {

    botom.innerHTML += `
<div class="cardd">
<div class="img"> <img src=${element.image}> </div>
        
<div class="text"><span>${element.head}</span>
<h2>${element.name}</h2>
<p>${element.text}</p>
<div class="icon">
<a href="./details.html?id=${element.id}" class="details"><button><i class = "bi bi-info-circle"></i></button></a>
<button class="delete" onclick="deleteCard(${element.id})"><i class = "bi bi-trash"></i></button>
<button class="update" onclick="updateCard(${element.id})"><i class = "bi bi-arrow-clockwise"></i></button>
<button><i onclick="addFav(${element.id})" class="bi bi-heart"></i></button>
</div>
</div>
</div>

`

  })

}

getAlldata()
//load//
function morless() {
  if (page >= coppy.length) {
    loadBtn.innerHTML = "Less More"
  } else {
    loadBtn.innerHTML = "Load More"
  }
}

function show() {
  if (loadBtn.innerHTML == "Less More") {
    page = 3
  } else {
    page += 3
  }
}

loadBtn.addEventListener("click", () => {
  show()
  morless()
  getAlldata()
});


searchInp.addEventListener("input", (e) => {
  filterArr = coppy;
  filterArr = filterArr.filter((element) => {
    return element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  })
  getAlldata();
})

//delete//

function deleteCard(id) {
  axios.delete(`http://localhost:3000/data/${id}`);
  axios.delete(`http://localhost:3000/faovorit/${id}`);
  window.location.reload()
}
///adFav//

async function addFav(id) {
  if (event.target.classList.contains("bi-heart")) {
    event.target.classList.remove("bi-heart");
    event.target.classList.add("bi-heart-fill")

    axios.get(`http://localhost:3000/data/${id}`).then(res => {
      return res.data
    }).then(res => {
      axios.get(favurl).then(response => {
        let aydi = response.data.find(find => find.id === response.id);
        if (!aydi) {
          axios.post(favurl, res)
        } else {
          axios.delete(`http://localhost:3000/favorit/${id}`)
        }
      })
    })
  }
  else {
    event.preventDefault();
    event.target.classList.remove('bi-heart-fill');
    event.target.classList.add('bi-heart');
    axios.delete(`http://localhost:3000/favorit/${id}`)
  }
}

//uptade
let file = document.querySelector("#file");
let form = document.querySelector(".form");
let img2 = document.querySelector("#img2");
let desc1 = document.querySelector("#desc");
let desc2 = document.querySelector("#desc2");
let name1 = document.querySelector("#name");
let editB = document.querySelector(".editB");
let pen = document.querySelector(".bi-arrow-clockwise");
let closeB = document.querySelector(".bi-x");

file.addEventListener("change", () => {
  let src = file.files[0]
  let reader = new FileReader();
  reader.readAsDataURL(src);
  reader.onload = function (e) {
    img2.src = e.target.result
  }
})


closeB.addEventListener("click", () => {
  editB.style.display = "none";
})


function updateCard(id) {
  editB.style.display = "block"
  axios.get(`http://localhost:3000/data/${id}`).then(res => {
    name1.value = res.data.head;
    desc1.value = res.data.name;
    desc2.value = res.data.text;
    img2.src = res.data.image;
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    axios.get(`http://localhost:3000/data/${id}`).then(res => {
      name1.value = res.data.name;
      desc1.value = res.data.descrtiptions;
      img2.src = res.data.image;

    })
    let src2 = file.files[0];
    let reader2 = new FileReader();
    reader2.onload = (e) => {
      let obj = {
        image: e.target.result,
        name: name1.value,
        name: desc1.value,
        text: desc2.value

      }
      axios.patch(`http://localhost:3000/data/${id}`, obj).then(res = console.log(res.data))
    }
    reader2.readAsDataURL(src2)
  });
}

scrolBtn=document.querySelector(".scroll");

window.addEventListener("scroll",()=>{
  if (window.scrollY > 50) {
    scrolBtn.style.display = "block";
  } else {
    scrolBtn.style.display = "none";
  }
})




scrolBtn.addEventListener("click",()=>{
  window.scrollTo({
    top:0,
    behavior:"smooth"
  })

})