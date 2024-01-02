const burgerBtn = document.querySelector('.header__burger-btn'),
      nav = document.querySelector('.header__burger-menu'),
      body = document.querySelector('body'),
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