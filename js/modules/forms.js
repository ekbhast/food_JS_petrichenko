function forms(){
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
}

module.exports = forms;