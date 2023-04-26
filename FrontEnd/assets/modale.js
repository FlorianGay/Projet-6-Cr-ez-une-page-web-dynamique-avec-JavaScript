const sectionModale = document.querySelector('.modal');
const buttonModification = document.querySelectorAll('.btn_modification')
const pageContent = document.querySelector('body');
const crossCloseModale = document.querySelectorAll('.close_modale');
const buttonAddPicture = document.querySelector('.add_picture');
const buttonReturnModale = document.querySelector('.return');
const sectionModale2 = document.querySelector('.modal_2');

let modal = null

// Ajout des photos des projets dans la modale
async function genererPictureGallery () {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();
        console.log(works);
        works.map((work) => {
            const modaleGallery = document.querySelector('.modale_gallery');
            const modaleFigureGallery = document.createElement('figure');
            modaleFigureGallery.dataset.id = work.category.id;
            modaleFigureGallery.innerHTML = `<img src=${work.imageUrl} alt=${work.title}>
            <div class="move_delete"><i class="fa-solid fa-up-down-left-right"></i><i class="fa-solid fa-trash-can"></i></div>
            <figcaption> éditer </figcaption>`
            modaleGallery.appendChild(modaleFigureGallery);
        });
    } catch (error) {
        console.log('erreur serveur')
    }
}
genererPictureGallery ();

// Ouverture de la modale
const openModale = function () {
    sectionModale.style.display = null;
    sectionModale.removeAttribute('aria-hidden');
    sectionModale.setAttribute('aria-modal', 'true');
    pageContent.style.background = 'rgba(0, 0, 0, 0.3)';
    modal = sectionModale;
}

// Fermeture de la modale
const closeModale = function () {
    if (modal === null) return;
    sectionModale.style.display = 'none';
    sectionModale.setAttribute('aria-hidden', 'true');
    sectionModale.removeAttribute('aria-modal');
    sectionModale2.style.display = 'none';
    sectionModale2.setAttribute('aria-hidden', 'true');
    sectionModale2.removeAttribute('aria-modal');
    pageContent.style.background = null;
    modal = null;
}

// Bouton d'affichage de la modale
buttonModification.forEach(b => {
    b.addEventListener('click', openModale)
});

// Bouton de fermeture de la modale
crossCloseModale.forEach(b => {
    b.addEventListener('click', closeModale);
});

// Fermeture via touche escape
window.addEventListener('keydown', function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModale(event)
    }
})

// Ouverture de la modale d'ajout de photo
const openModale2 = function () {
    sectionModale2.style.display = null;
    sectionModale2.removeAttribute('aria-hidden');
    sectionModale2.setAttribute('aria-modal', 'true'); 
    sectionModale.style.display = 'none';
    sectionModale.setAttribute('aria-hidden', 'true');
    sectionModale.removeAttribute('aria-modal');
}

// Bouton d'ouverture de la modale d'ajout de photo
buttonAddPicture.addEventListener('click', openModale2);

// Retour à la 1ère modale
const returnModale1 = function () {
    sectionModale2.style.display = 'none';
    sectionModale2.setAttribute('aria-hidden', 'true');
    sectionModale2.removeAttribute('aria-modal');
    sectionModale.style.display = null;
    sectionModale.removeAttribute('aria-hidden');
    sectionModale.setAttribute('aria-modal', 'true');
}

// Bouton de retour à la 1ère modale
buttonReturnModale.addEventListener('click', returnModale1);
