// BURGER MENU SLIDE
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
    //toggle
    nav.classList.toggle('nav-active');
    //animations
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    });
  })
}
navSlide(); // don't forget to pack
// PORTRAIT OR LANDSCAPE
const imgOrient = () => {
  const img = document.querySelectorAll('.aspect-ratio');
  img.forEach( el => {
    const aspectRatio = el.naturalWidth/el.naturalHeight;
    el.parentElement.setAttribute("style", `aspect-ratio: ${aspectRatio};`);
    if (el.naturalHeight > el.naturalWidth) {
      el.classList.add("portrait");
    } else {
      el.classList.add("landscape");
    }
  });
}
imgOrient(); // don't forget to pack

