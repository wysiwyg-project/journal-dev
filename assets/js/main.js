
window.onload = function() {

    const body = document.querySelector("body");
    // toggleMenu();
    toggleGrid(body);

    toggleColors(body);

    // draggable(body);


};


function toggleColors(body){
    let buttons = document.querySelectorAll("#buttons-color button");
    buttons.forEach(function (button, index) {
        button.addEventListener('click', function() {
            let color = button.getAttribute('data-color');
            console.log(color);
            body.style.setProperty('--yellow-bg', color);
        });
    
    });
}

function toggleGrid(body){
    const gridToggleButton = document.getElementById('grid-switcher');
   // Vérifier si "show-grid" est déjà stocké dans localStorage
   if (localStorage.getItem('showGrid') === 'true') {
    body.classList.add('show-grid');
}

gridToggleButton.addEventListener('click', function () {
    // Basculer la classe "show-grid" sur le body
    body.classList.toggle('show-grid');

    // Enregistrer l'état de "show-grid" dans localStorage
    if (body.classList.contains('show-grid')) {
        localStorage.setItem('showGrid', 'true');
    } else {
        localStorage.setItem('showGrid', 'false');
    }
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

