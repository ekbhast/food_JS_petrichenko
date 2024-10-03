function modal() {
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
}
module.exports = modal;