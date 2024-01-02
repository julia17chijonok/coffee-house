const burgerBtn = document.querySelector('.header__burger-btn'),
      nav = document.querySelector('.header__burger-menu'),
      navLink = document.querySelectorAll('.header__link');

burgerBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

navLink.forEach ((item) => {
    item.addEventListener('click', () => {
        nav.classList.remove('active');
        burgerBtn.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});


window.addEventListener(`resize`, event => {
    let windowWidth = window.innerWidth;
    if (windowWidth > 769) {
        nav.classList.remove('active');
    }
}, false);


// SLIDER

const arrowPrev = document.querySelector('#arrow-prev'),
    arrowNext = document.querySelector('#arrow-next'),
    carouselInner = document.querySelector('.favorites-coffee__carousel-inner'),
    sliderControl = document.querySelectorAll('.favorites-coffee__control-fill'),
    body = document.querySelector('body'),
    favoritesField = document.querySelector('.favorites-coffee');

let slideIndex = 1;
let offset = 0;

function removeDotActive(){
    sliderControl.forEach((control) => {
        control.classList.remove('control-active');
    });
}

function slideChangeActive(){
    removeDotActive();
    sliderControl[(+slideIndex) - 1].classList.add('control-active');
    width = 0;
}

function changeSlideNext() {
    if (slideIndex < 3) {
        offset += 348;
        slideIndex += 1;
        carouselInner.style.transform = `translateX(-${offset}px)`;
    } else {
        slideIndex = 1;
        offset = 0;
        carouselInner.style.transform = `translateX(-${offset}px)`;
    }
    slideChangeActive();
}

function changeSlidePrev() {
    if (slideIndex > 1) {
        offset -= 348;
        slideIndex -= 1;
        carouselInner.style.transform = `translateX(-${offset}px)`;
    } else {
        slideIndex = 3;
        offset = 696;
        carouselInner.style.transform = `translateX(-${offset}px)`;
    }
    slideChangeActive();
}

arrowNext.addEventListener('click', () => {
    changeSlideNext();
});

arrowPrev.addEventListener('click', () => {
    changeSlidePrev();
});

setInterval(changeSlideNext, 5000);