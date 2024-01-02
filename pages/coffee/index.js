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
let arr;

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

let dataProducts;

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
            arr = Array.from(tabBlockItem);
            hideTabs(); 
            productsData = data;
            return productsData;
        }
        
        createCard();
        modalWindowClick();
        console.log(arr[0]);
    });
}

console.log(dataProducts);

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


// MODAL WINDOW

const modalWindow = document.querySelector('.modal-window__bg'),
      modalDilog = document.querySelector('.modal-window__inner'),
      modalCloseBtn = document.querySelector('.modal-window__close');

let startPrice = 0;      

function renderModalWindow(name, descr, price, src, addictives, sizes) {
    let nameTab = document.querySelector('.modal-window__name'),
        descrTab = document.querySelector('.modal-window__descr'),
        priceTab = document.querySelector('.modal-window__price'),
        imgTab = document.querySelector('.modal-window__img'),
        addictivesTab = document.querySelectorAll('.modal-window-addictive'),
        sizesTab = document.querySelectorAll('.modal-window__size');
    nameTab.textContent = `${name}`;
    descrTab.textContent = `${descr}`;
    priceTab.textContent = `$${price}`;
    imgTab.src = `${src}`;
    for(let i = 0; i < addictivesTab.length; i++){
        addictivesTab[i].textContent = `${addictives[i].name}`;
    }
    for(let i = 0; i < sizesTab.length; i++){
        sizesTab[i].textContent = `${sizes[i].size}`;
    }
};


function modalWindowClick() {
    let arr = Array.from(tabBlockItem);
    arr.forEach(tab => {
        tab.addEventListener('click', () => {
            deletePriceAddictives();
            modalWindow.classList.add('active');
            body.classList.add('no-scroll');
            let id = tab.id;
            startPrice = productsData[id].price;
            renderModalWindow(productsData[id].name, 
                productsData[id].description, 
                productsData[id].price, 
                productsData[id].src, 
                productsData[id].additives,
                Object.values(productsData[id].sizes));    
            console.log(startPrice);
            console.log(productsData[id].name);
        });
    });
}

modalCloseBtn.addEventListener('click', () => {
    modalWindow.classList.remove('active');
    body.classList.remove('no-scroll');
});

modalWindow.addEventListener('click', (e) => {
    if (e.target == modalWindow) {
        modalWindow.classList.remove('active');
        body.classList.remove('no-scroll');
    }
});


// MODAL WINDOW CALCULATE

let priceSize = 0;
let priceAdd = 0;

const sizeBtns = document.querySelectorAll('.modal-window__sizes-btn'),
      addBtns = document.querySelectorAll('.modal-window__add-btn');

sizeBtns.forEach(sizeBtn => {
    sizeBtn.addEventListener('click', () => {
        sizeBtns.forEach(sizeBtn => {
            sizeBtn.classList.remove('active');
        });
        sizeBtn.classList.add('active');
        priceSize = 0;
        priceSize += +(sizeBtn.getAttribute('price'));
        let priceTab = document.querySelector('.modal-window__price');
        priceTab.textContent = `$${priceSize + priceAdd + (+startPrice)}`;
    });
});


addBtns.forEach(addBtn => {
    addBtn.addEventListener('click', () => {
        if (addBtn.classList.contains('active')) {
            addBtn.classList.remove('active');
            priceAdd -= 0.5;
        } else {
            addBtn.classList.add('active');
            priceAdd += 0.5;
        }
        let priceTab = document.querySelector('.modal-window__price');
        priceTab.textContent = `$${priceSize + priceAdd + (+startPrice)}`;
    });
});

function deletePriceAddictives() {
    addBtns.forEach(addBtn => {
        addBtn.classList.remove('active');
    });

    sizeBtns.forEach(sizeBtn => {
        sizeBtn.classList.remove('active');
        sizeBtns[0].classList.add('active');
    });
}