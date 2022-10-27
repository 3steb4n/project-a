let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("trending-anime");
  if (slideIndex > slides.length) {slideIndex = 1}    
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
}

function genres() {
  document.getElementById("multiselect-container").classList.toggle("show");
}

function years() {
  document.getElementById("multiselect-container2").classList.toggle("show");
}