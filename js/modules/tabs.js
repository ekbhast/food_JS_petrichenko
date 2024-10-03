function tabs() {
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
}

module.exports = tabs;