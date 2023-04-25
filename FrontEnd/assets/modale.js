const sectionmodale = document.querySelector('.modal');
const buttonModification = document.querySelectorAll('.btn_modification')
const pageContent = document.querySelector('body');
const crossCloseModale = document.querySelector('.close_modale');
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
    sectionmodale.style.display = null;
    sectionmodale.removeAttribute('aria-hidden');
    sectionmodale.setAttribute('aria-modal', 'true');
    pageContent.style.background = 'rgba(0, 0, 0, 0.3)';
    modal = sectionmodale;
}

// Fermeture de la modale
const closeModale = function () {
    if (modal === null) return;
    sectionmodale.style.display = 'none';
    sectionmodale.setAttribute('aria-hidden', 'true');
    sectionmodale.removeAttribute('aria-modal');
    pageContent.style.background = null;
    modal = null;
}

// Bouton d'affichage de la modale
buttonModification.forEach(b => {
    b.addEventListener('click', openModale)
});

// Bouton de fermeture de la modale
crossCloseModale.addEventListener('click', closeModale);