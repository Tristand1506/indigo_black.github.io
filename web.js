class HorzisontalCarousel{

    el = null;
    items = [];
    activeItemIndex = 0;
    navLeft = null;
    navRight = null;

    constructor(el){
        this.el = el;
        this.items = el.getElementsByClassName("carousel-container");
        this.navLeft = el.getElementsByClassName("left")[0];
        this.navRight = el.getElementsByClassName("right")[0];

        this.init();
        console.log(this);
    }

    init() {
        this.navRight.addEventListener("onClick", this.next());
        this.navLeft.addEventListener("onClick", this.prev());
        this.activeItemIndex = 0;
        this.items[this.activeItemIndex].classList.toggle("active-item")
        for (let i = this.activeItemIndex+1; i < this.items.length; i++) {
            this.items[i].classList.toggle("inactive-right");   
        }
        this.navLeft.style.display = "none";
        this.navRight.style.display = "flex";
    }

    next(){
        this.items[this.activeItemIndex].classList.toggle("inactive-left");
        this.items[this.activeItemIndex].classList.toggle("active-item");
        this.activeItemIndex = this.activeItemIndex + 1;
        this.items[this.activeItemIndex].classList.toggle("active-item");
        this.items[this.activeItemIndex].classList.toggle("inactive-right");
        if(this.activeItemIndex >= this.items.length-1){
            this.navRight.style.display = "none";
        }
        else{
            this.navLeft.style.display = "flex";
            this.navRight.style.display = "flex";
        }
        console.log("Next Clicked, Index is now: " + this.activeItemIndex)
    }
    prev(){
        console.log(this)
        this.items[this.activeItemIndex].classList.toggle("inactive-right");
        this.items[this.activeItemIndex].classList.toggle("active-item");
        this.activeItemIndex = this.activeItemIndex - 1;
        this.items[this.activeItemIndex].classList.toggle("active-item");
        this.items[this.activeItemIndex].classList.toggle("inactive-left");
    
        if(this.activeItemIndex <= 0){
            this.navLeft.style.display = "none";
        }
        else{
            this.navLeft.style.display = "flex";
            this.navRight.style.display = "flex";
        }
        console.log("Prev Clicked, Index is now: " + this.activeItemIndex)
    }

}

function next(carousel){
    carousel.next();
}
function prev(carousel){
    carousel.prev();
}
    const demos = document.getElementById("demos");

demoCarousel = new HorzisontalCarousel(demos);