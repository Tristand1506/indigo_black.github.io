class HorisontalScroller{

    activeItemIndex = 0;

    constructor(id){
        this.id = id; 
        this.el = document.getElementById(id);
        this.items = Array.from(this.el.getElementsByClassName("scroll-container"));
        this.creatNav();
        this.init();
    }
    
    init(){
        this.injectElementIDs();
        this.observer = new IntersectionObserver(onIntersectionObserved, {
            root: document.getElementById(this.id).getElementsByClassName(".horisontal-scroller")[0],
            threshold:0.6,
        });
        console.log(this);
        this.items.forEach(item => {
            console.log(item);
            this.observer.observe(item);
        });
    }
    
    injectElementIDs(){
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].setAttribute('id', this.id + "--" +i);
      }
    }

    creatNav(){
        const scrollNav = document.createElement("div");
        scrollNav.classList.toggle("scroll-nav")
        scrollNav.setAttribute('id', this.id + "-scroll-nav");

        const navLeft = document.createElement("a");
        navLeft.classList.toggle("left");
          const buttonLeft = document.createElement("button");
          buttonLeft.classList.toggle("scroll-button");
          buttonLeft.innerHTML = `<i class="bi bi-caret-left-fill"></i>`;
        navLeft.appendChild(buttonLeft);
        const navRight = document.createElement("a");
        navRight.classList.toggle("right");
          const buttonRight = document.createElement("button");
          buttonRight.classList.toggle("scroll-button");
          buttonRight.innerHTML = `<i class="bi bi-caret-right-fill"></i>`;
        navRight.appendChild(buttonRight);

        scrollNav.appendChild(navLeft);
        scrollNav.appendChild(navRight);

        const indicators = document.createElement("ul");
        indicators.classList.toggle("indicator-list");
        indicators.setAttribute('id', this.id + "-indicators");
        for (let i = 0; i < this.items.length; i++) {
            const node = document.createElement("li");
            node.classList.toggle("indicator");
            indicators.appendChild(node);
        }
        scrollNav.appendChild(indicators);

        this.el.appendChild(scrollNav);
    }

    next(){
      console.log("Going next");
      this.activeItemIndex = this.activeItemIndex + 1;
      this.navLeft.setAttribute('href', "#"+this.id + "-" + (this.activeItemIndex - 1));
      this.navRight.setAttribute('href', "#"+this.id + "-" + (this.activeItemIndex + 1));
      if(this.activeItemIndex >= this.items.length-1){
        this.navRight.style.display = "none";
      }
      else{
        this.navLeft.style.display = "block";
        this.navRight.style.display = "block";
      }
    }

    prev(){
      console.log("Going prev");
      this.activeItemIndex = this.activeItemIndex - 1;
      this.navLeft.setAttribute('href', "#"+this.id + "-" + (this.activeItemIndex - 1));
      this.navRight.setAttribute('href', "#"+this.id + "-" + (this.activeItemIndex + 1));
      if(this.activeItemIndex <= 0){
        this.navLeft.style.display = "none";
      }
      else{
        this.navLeft.style.display = "block";
        this.navRight.style.display = "block";
      }
    }
}

function onIntersectionObserved(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        const id = entry.target.id.split("--")[0];
        const intersectingIndex = Number(entry.target.id.split("--")[1]);

        console.log("Observing Item: "+ intersectingIndex + " " + id);

        const navElements = document.getElementById(id+"-scroll-nav");
        console.log(navElements);
        const indicators = Array.from(navElements.getElementsByClassName("indicator"));
        
        activateIndicator(intersectingIndex,indicators);
        updateButtons(navElements,intersectingIndex,indicators.length, id);
      }
    });
  }
  function activateIndicator(index,indicators) {
    console.log(indicators)
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });
  }
  function updateButtons(buttons, index, navSize,  sectionID){
    const navLeft = buttons.getElementsByClassName("left")[0];
    const navRight = buttons.getElementsByClassName("right")[0];
    navLeft.setAttribute('href', "#"+ sectionID + "--" + (index - 1));
    navRight.setAttribute('href', "#"+ sectionID + "--" + (index + 1));

    console.log(navSize);

    if(index <= 0){
      navLeft.style.display = "none";
    }
    else if(index >= navSize-1){
      navRight.style.display = "none";
    }
    else{
      console.log("Display both navs")
      navRight.style.display = "block";
      navLeft.style.display = "block";
    }
  }




demos = new HorisontalScroller("demos");
threeD = new HorisontalScroller("3d");
illustration = new HorisontalScroller("illustration");


