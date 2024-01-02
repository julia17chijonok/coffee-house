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


// SWITCH TABS

const tabItems = document.querySelectorAll('.offer__tab-item');
let windowWidth = window.innerWidth;
      

let currentCategory = 'coffee';
let tabBlockItem = document.querySelectorAll('.menu-coffee__item');
let arr = Array.from(tabBlockItem);

tabItems.forEach((item) => {
    item.addEventListener('click', () => {
        let currentTab = item;
        tabItems.forEach(item => {
            item.classList.remove('active');
        });
        currentCategory = item.getAttribute('category');
        currentTab.classList.add('active');
        tabBlockItem = document.querySelectorAll('.menu-coffee__item');
        tabBlockItem.forEach(tab => {
            tab.remove();
        });
        makePesponse();
        hideTabs();
        modalWindowClick();

        if (tabBlockItem.length > 4) {
            refreshBtn.classList.remove('invisible');
        } else {
            refreshBtn.classList.add('invisible');
        }     
    });
});

// CREATING CARDS

const tabContentWrapper = document.querySelector('.menu-coffee__wrapper');

class MenuCard {
    constructor(id, src, name, descr, price, category) {
        this.id = id;
        this.src = src;
        this.name = name;
        this.descr = descr;
        this.price = price;
        this.category = category;
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('menu-coffee__item');
        element.id = `${this.id}`;
        element.innerHTML = `
        <div class="menu-coffee__item-img">
            <img src="${this.src}" alt="coffee">
        </div>
        <div class="menu-coffee__item-content">
            <span class="menu-coffee__item-name">${this.name}</span>
            <p class="menu-coffee__item-description">${this.descr}</p>
            <span class="menu-coffee__item-price">$${this.price}</span>
        </div>`;
        tabContentWrapper.append(element);
    }
}

// let request = fetch('./products.json');
// let data = request.then(response => response.json()).then();

// let filteredProducts = data.filter(product => product.category === `${currentCategory}`);

// console.log(data);

// request.then(response => response.json()).then(json => console.log(json));

function makePesponse() {
    fetch('./products.json')
    .then((response) => {
        // console.log(response.json());
        return response.json();
    })
    .then((data) => {
        function createCard() {
            filteredProducts = data.filter(product => product.category === `${currentCategory}`);
            for(let i = 0; i < filteredProducts.length; i++){
                new MenuCard(
                    data.indexOf(filteredProducts[i]), filteredProducts[i].src, filteredProducts[i].name , filteredProducts[i].description,
                    filteredProducts[i].price, filteredProducts[i].category
                
                ).render();
            }
            hideTabs();
            arr = Array.from(tabBlockItem);
            
        }
        
        createCard();
    });
}

makePesponse();

function hideTabs(){
    tabBlockItem = document.querySelectorAll('.menu-coffee__item');
    arr = Array.from(tabBlockItem);
    console.log(arr);
    arr.forEach(tab => {
        if ((arr.indexOf(tab) > 3) && windowWidth < 769){
            console.log('more than 3');
            tab.classList.add('menu-coffee__item-invisible');
            refreshBtn.classList.remove('invisible');
        }
    });
}

// REFRESH

const refreshBtn = document.querySelector('.menu-coffee__refresh');

refreshBtn.addEventListener('click', () => {
    tabBlockItem = document.querySelectorAll('.menu-coffee__item');
    arr = Array.from(tabBlockItem);

    arr.forEach(tab => {
        if (arr.indexOf(tab) > 3){
            tab.classList.remove('menu-coffee__item-invisible');
        }
    });
    refreshBtn.classList.add('invisible');
});