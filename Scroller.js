/**
 * 
 */

const ScrollRightHandler = (id) => {
  const testElem = document.getElementById(id)
  if (testElem) {
    testElem.addEventListener('click', (e) => {
      testElem.scroll(0, testElem.clientWidth)
    })
  }
  testElem.addEventListener('scroll', (e) => {
    testElem.scroll(0, testElem.clientWidth)
  })
}

const scrollHandler = (e) => {
  const scrollPos = e.currentTarget.scrollLeft
  console.log({scrollPos})
}


class HorisontalScroller{

    activeItemIndex = 0;

    constructor(id){
        this.id = id; 
        this.el = document.getElementById(id);
        this.list = this.el.querySelector(".horisontal-scroller")
        this.items = Array.from(this.list.getElementsByClassName("scroll-container"));
        this. navElements = this.creatNav();
        this.isTextAdjusted = false;
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

    update(){
      this.items.forEach(item => {
        console.log(item);
        this.observer.unobserve(item);
      });
      this.items = Array.from(this.list.getElementsByClassName("scroll-container"));
      this.injectElementIDs();
      this.el.removeChild(this.navElements);
      this.navElements = this.creatNav();
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
        return scrollNav;
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
      navRight.style.display = "flex";
    }
    else if(index >= navSize-1){
      navRight.style.display = "none";
      navLeft.style.display = "flex";
    }
    else{
      console.log("Display both navs")
      navRight.style.display = "flex";
      navLeft.style.display = "flex";
    }
  }

  function adjustText(event,horisontalScroller){

    if(event.matches && !horisontalScroller.isTextAdjusted){
      console.log("Desktop sizing detected, Adjusting Text");
      const textElement = horisontalScroller.items[0]; 
      console.log(textElement);
      horisontalScroller.list.removeChild(textElement);
      textElement.setAttribute("id", "");
      textElement.classList.toggle("adjusted");
      console.log(textElement);
      horisontalScroller.el.insertBefore(textElement,horisontalScroller.list);
      horisontalScroller.update();
      horisontalScroller.isTextAdjusted = true;
    }
    else if(horisontalScroller.isTextAdjusted) {
      const textElement = horisontalScroller.el.getElementsByClassName("scroll-container")[0];
      console.log(textElement);
      horisontalScroller.el.removeChild(textElement);
      textElement.classList.toggle("adjusted");
      console.log(textElement);
      horisontalScroller.list.insertBefore(textElement,horisontalScroller.items[0]);
      horisontalScroller.update();
      horisontalScroller.isTextAdjusted = false;
    }
  }

const desktopCheck = window.matchMedia("screen and (min-width: 60rem) and (min-width: 60rem) and (min-aspect-ratio: 1/1)");



demos = new HorisontalScroller("demos");
threeD = new HorisontalScroller("3d");
illustration = new HorisontalScroller("illustration");

adjustText(desktopCheck,demos);
adjustText(desktopCheck,threeD);
adjustText(desktopCheck,illustration);

desktopCheck.addEventListener("change", function(){
  adjustText(desktopCheck,demos);
  adjustText(desktopCheck,threeD);
  adjustText(desktopCheck,illustration);
});


