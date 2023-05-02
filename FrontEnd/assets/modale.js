const sectionModale = document.querySelector('.modal');
const buttonModification = document.querySelectorAll('.btn_modification')
const modalContent = document.querySelector('.bloc_modal');
const crossCloseModale = document.querySelectorAll('.close_modale');
const buttonAddPicture = document.querySelector('.add_picture');
const buttonReturnModale = document.querySelector('.return');
const sectionModale2 = document.querySelector('.modal_2');

let modal = null

async function genererGallery () {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();
        works.map((work) => {
            const sectionGallery = document.querySelector('.gallery');
            const figureGallery = document.createElement('figure');
            figureGallery.dataset.id = work.category.id;
            figureGallery.innerHTML = `<img src=${work.imageUrl} alt=${work.title}
            <figcaption>${work.title}</figcaption>`
            sectionGallery.appendChild(figureGallery);
        });
    } catch (error) {
        console.log('erreur serveur')
    }
}

// Ajout des photos des projets dans la modale
async function genererPictureGallery () {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();
        works.map((work) => {
            const modaleGallery = document.querySelector('.modale_gallery');
            const modaleFigureGallery = document.createElement('figure');
            modaleFigureGallery.className = 'project_img'
            modaleFigureGallery.id = work.id;
            modaleFigureGallery.innerHTML = `<img src=${work.imageUrl} alt=${work.title}>
            <div class="move_delete">
                <button class="btn_move"><i class="fa-solid fa-up-down-left-right"></i></button>
                <button class="btn_delete"><i class="fa-solid fa-trash-can"></i></button>
            </div>
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
    modalContent.style.display = 'block'
    modalContent.style.background = 'rgba(0, 0, 0, 0.3)';
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
    modalContent.style.display = 'none'
    modalContent.style.background = 'rgba(0, 0, 0)';
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

// Fermeture de la modale via clic en dehors de la modale
window.onclick = (event) => {
    if (event.target == modalContent) 
        modalContent.style.display = 'none';
}

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



// Preview image ajouter
const addFileInput = document.getElementById('picture');
const addFileContainer = document.querySelector('.add_file_input');
const filePreviewContainer = document.querySelector('.file_preview');
const filePreview = document.querySelector('.preview');

addFileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        addFileContainer.style.display = 'none';
        filePreviewContainer.style.display = 'block';
        reader.addEventListener('load', function () {
            filePreview.setAttribute('src', this.result);
        });
        reader.readAsDataURL(file);
    } else {
        addFileContainer.style.display = null;
        filePreviewContainer.style.display = null;
        filePreview.setAttribute('src', '');
    }
});

// Changelent du bouton validation


// Ajout d'un nouveau projet
const addProjectForm = document.querySelector('.add_project')

async function fetchPostWork () {
    const formData = new FormData();
    formData.append('image', document.getElementById('picture').files[0]);
    formData.append('title', document.getElementById('title').value);
    formData.append('category', document.getElementById('category_select').value);
    

    await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            //Accept:'application/json',
            //'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${window.localStorage.getItem('tokenId')}`,
        },
        body: formData,
    })
        .then ((response) => {
            console.log(response);
            if (response.status === '401') {
                alert ('Erreur serveur');
                return false;
            }
            return response.json();
        })
        .then ((data) => {
            console.log(data)
        })
}

// Validation d'ajout d'un projet
addProjectForm.addEventListener('submit', async (event) => {
    const modaleGallery = document.querySelector('.modale_gallery');
    modaleGallery.innerHTML = '';
    const projectGallery = document.querySelector('.gallery');
    projectGallery.innerHTML='';
    event.preventDefault();
    await fetchPostWork();
    await genererPictureGallery();
    await genererGallery ();
});

// Suppression d'un projet
async function fetchDeleteWork () {
    await fetch(`http://localhost:5678/api/works/`, {
        method: 'DELETE',
        headers: {
            Accept: '*/*',
            'Authorization': `Bearer ${window.localStorage.getItem('tokenId')}`,
        }
    })
}

// Bouton de suppresion d'un projet




