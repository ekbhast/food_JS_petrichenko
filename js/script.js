'use strict';

// const { fetch } = require("undici-types");

window.addEventListener('DOMContentLoaded', () => {

// Tabs

    let tabs = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabsHeaderItem = document.querySelectorAll('.tabheader__item');

    function hideTabs() {
        tabs.forEach((item, i) =>{
            tabs[i].classList.add('hide');
            tabs[i].classList.remove('show', 'fade');            
            tabsHeaderItem[i].classList.remove('tabheader__item_active');
        });
    }

    function showTabs(i = 0) {
        tabs[i].classList.remove('hide');
        tabs[i].classList.add('show', 'fade');
        tabsHeaderItem[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) =>{
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            // console.log(target);
            tabs.forEach((item, i) => {
                if (tabsHeaderItem[i] == target) {
                    hideTabs();
                    showTabs(i);
                }
            })
        }
    });

    hideTabs ();
    showTabs();

    // Timer 

    const deadLine = '2024-09-30';

    function getRemainingTime(endtime) {
        const   t = Date.parse(endtime) - new Date(),
                days = Math.floor( (t / (1000 * 60 * 60 * 24))),
                hours = Math.floor( (t / (1000 * 60 * 60) % 24) ),
                minutes =  Math.floor( (t / (1000 * 60) % 60)),
                seconds =  Math.floor( (t / 1000) % 60); 
        
        return {
                'total' : t,
                'days' : days,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
        }
    }

    
    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setTimer (selector, endtime){
        const   timer = document.querySelector (selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateTimer, 1000);
        
        updateTimer();

        function  updateTimer() {
                const t = getRemainingTime(endtime);
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
            }
        }

    }

    setTimer('.timer', deadLine);

    // Modal

    const   showModalBtns = document.querySelectorAll('[data-modal]'),
            // closeModalBtn = document.querySelector('[data-close]'),
            modal = document.querySelector('.modal'),
            modalTimerId = setTimeout(showModal, 50000);

    function showModal (){
        modal.classList.add('show');
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
        window.removeEventListener('scroll', showModalScrollEnd);
    }
    
    function closeModal (){
        modal.classList.toggle('show');
        document.body.style.overflow = '';

    }

    function showModalScrollEnd (){
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalScrollEnd);
        }
    }

    showModalBtns.forEach((element) => {
        element.addEventListener('click', showModal);
    })
    
    // closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) =>{
        if (e.code ==='Escape' && modal.classList.contains('show')){
            closeModal();
        }
    })

    window.addEventListener('scroll',showModalScrollEnd);


    //class for cards

    class MenuCard {
        constructor (imgSrc, alt, subtitle, descr, price, parent, ...classes) {
            this.imgSrc = imgSrc;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parent);
        }

        render () {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `            
                <img src=${this.imgSrc} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

        this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
          throw  new Error(`Clould no fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));
    
    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document. createElement('div');
    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //     document.querySelector('.menu .container').append(element);
    //     });
    // }

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    //Forms

    const form = document.querySelectorAll('form');

    const requestMessage = {
        loading: 'img/form/spinner.svg',
        success: 'Запрос успешно отправлен',
        failure: 'Что-то пошло не так...'
    };

    form.forEach((item) => {
        bindPostData(item);
    }); 

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
        }, 
        body: data
        });

        return await res.json();
    };



    function bindPostData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            const statusMessage = document.createElement('img');         
            statusMessage.src = requestMessage.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; 
            form.insertAdjacentElement('afterend', statusMessage);

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(requestMessage.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(requestMessage.failure);
            })
            .finally(() => {
                form.reset();
            });
        });
    }

    //moal status request
    function showThanksModal(message) {
        const  prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
           <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>    
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // slider 
    let slideIndex = 1;
    let offset = 0;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }

    slidesField.style.width = 100 * slides.length + `%`;   
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all'
    
    slidesWrapper.style.overflow = 'hidden';
    
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const   indicators = document.createElement('ol'),
            dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10){
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10){
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = deleteNotDigits(width) * (slideTo - 1);

                slidesField.style.transform = `translateX(-${offset}px)`;

                if (slides.length < 10){
                    current.textContent = `0${slideIndex}`
                } else {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = 1;
                
            });
        });

        //Calc

    const   result = document.querySelector('.calculating__result span');
    let     sex,
            height,
            weight,
            age,
            ratio;
    
    function calcTotal(){
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent ='____';
            return;
        }

        if (sex == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.2 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }     
        console.log(sex, height, weight, age, ratio);   
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`);

            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });
        });     
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
        
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });        
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');









        
    });
    


    // showSlides(slideIndex);

    

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';
        
    //     if (slides.length < 10) {
    //         current.textContent =  `0${slideIndex}`;
    //     } else {
    //         current.textContent =  slideIndex;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function(){
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function(){
    //     plusSlides(1);
    // });
        
    

