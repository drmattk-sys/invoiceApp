const btnShow = document.getElementById('btnShow');
const btnHide = document.getElementById("btnHide");
const details = document.getElementById("detail");

details.style.display= "none";
btnHide.style.display="none";

btnShow.addEventListener("click",()=>{
  btnShow.style.display="none";
  btnHide.style.display="block";
  details.style.display= "block"; 
})


btnHide.addEventListener("click",()=>{
  btnHide.style.display="none";
  btnShow.style.display="block";
  details.style.display= "none"; 
})



