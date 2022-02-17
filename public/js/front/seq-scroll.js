const reader = document.querySelector('.reader');
const sliderContain = document.querySelector('#images-slideshow');
const slider = document.querySelector('#images-slideshow figure');

//global scroll
window.addEventListener('wheel', (e) => {
  let scrollHead = reader.scrollTop += e.deltaY;
  if (scrollHead > reader.scrollTopMax) {
    //reader.setAttribute("hidden", "true");
    sliderContain.setAttribute("style", "left: 0vh;");
  }
});
//horizontal scroll effects
window.addEventListener('wheel', (e) => {
  //let scrollLeft = sliderContain.scrollLeft;
  //let sliderWidth = slider.getBoundingClientRect().width;
  //let sliderContainWidth = sliderContain.getBoundingClientRect().width;
  //let scrollPercent = ((scrollLeft / (sliderWidth - sliderContainWidth)) * 100).toFixed(2);
  // console.log(scrollPercent + "%")
  let scrollHead = sliderContain.scrollLeft += e.deltaY*3;
  if (scrollHead < 0) {
    reader.removeAttribute("hidden");
    sliderContain.setAttribute("style", "left: 100vw;");
  }
});