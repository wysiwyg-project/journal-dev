
window.onload = function() {

    const body = document.querySelector("body");
    // toggleMenu();
    toggleGrid(body);


};


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

