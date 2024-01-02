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