
document.addEventListener("DOMContentLoaded", function() {

    const body = document.querySelector("body");
    // toggleMenu();


    toggleColors(body);
    toggleGrid(body);

    draggable(body);


});

function toggleGrid(body) {
    let toggleButton = body.querySelector('#grid-switcher');

    let savedGrid = localStorage.getItem('grid');
    if (savedGrid) {
        body.setAttribute('data-grid', savedGrid);
    }

    toggleButton.addEventListener('click', function () {
        let currentGridState = body.getAttribute('data-grid') === "true";
        
        let newGridState = !currentGridState;
        localStorage.setItem('grid', newGridState);
        body.setAttribute('data-grid', newGridState);
        
    });
}



function toggleColors(body){
    let buttons = body.querySelectorAll("#buttons-color button");
    let toggleButton = body.querySelector('#toggle-palette-checkbox');

    let savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        body.setAttribute('data-color', savedColor);
    }
    console.log(savedColor);

    buttons.forEach(function (button, index) {
        button.addEventListener('click', function() {
            let color = button.getAttribute('data-color');
            body.setAttribute('data-color', color);
            localStorage.setItem('selectedColor', color);
            toggleButton.checked = false;
        });
    
    });
}


function toggleMenu(){
    const menuToggleButton = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    
    menuToggleButton.addEventListener('click', function() {
        menu.classList.toggle('hidden'); 
        menu.classList.toggle('visible');
        
        menuToggleButton.classList.toggle('menu-active');
    });


    if (document.body.classList.contains('page-home')) {
        menu.classList.remove('hidden');
        menu.classList.add('visible');
        menuToggleButton.classList.add('menu-active');
    }
}



function draggable(body){
    console.log("draggable")


    let objects = body.querySelectorAll(".draggable");
    objects.forEach(function (object, index) {
        console.log(object);

        var initX, initY, firstX, firstY;


        object.addEventListener('mousedown', function(e) {

            e.preventDefault();
            initX = this.offsetLeft;
            initY = this.offsetTop;
            firstX = e.pageX;
            firstY = e.pageY;
        
            this.addEventListener('mousemove', dragIt, false);
        
            window.addEventListener('mouseup', function() {
                object.removeEventListener('mousemove', dragIt, false);
            }, false);
        
        }, false);

        object.addEventListener('touchstart', function(e) {

            e.preventDefault();
            initX = this.offsetLeft;
            initY = this.offsetTop;
            var touch = e.touches;
            firstX = touch[0].pageX;
            firstY = touch[0].pageY;
        
            this.addEventListener('touchmove', swipeIt, false);
        
            window.addEventListener('touchend', function(e) {
                e.preventDefault();
                object.removeEventListener('touchmove', swipeIt, false);
            }, false);
        
        }, false);
        
        function dragIt(e) {
            this.style.left = initX+e.pageX-firstX + 'px';
            this.style.top = initY+e.pageY-firstY + 'px';
        }
        
        function swipeIt(e) {
            var contact = e.touches;
            this.style.left = initX+contact[0].pageX-firstX + 'px';
            this.style.top = initY+contact[0].pageY-firstY + 'px';
        }


    });




}

