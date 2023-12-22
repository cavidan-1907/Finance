
let nav=document.querySelector("nav")
window.addEventListener("scroll",()=>{
    if(window.scrollY>50){
        nav.style.backgroundColor="#10c98f"
    }
    else{   
  nav.style.backgroundColor="transparent"
    }
});
