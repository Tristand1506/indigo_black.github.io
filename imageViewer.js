var modal = document.getElementById("modal");

var closeSpan = document.getElementsByClassName("close")[0];

closeSpan.onclick = function(){
    modal.style.display = "none";
}

var images = document.getElementsByClassName("showcase-image");
var modalImg = document.getElementById("modal-img");
for (let i = 0; i < images.length; i++) {
    images[i].onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.alt = this.alt;
    }
}