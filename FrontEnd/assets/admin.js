// Récupération du token stocké
let tokenId = window.localStorage.getItem('tokenId');
console.log(tokenId);

const editionBar = document.querySelector('.edition_bar');
const profilePicture = document.querySelector('#introduction figure');
const sectionPortfolio = document.querySelector('#portfolio h2');
const categoryFilter = document.querySelector('.filters');
const adminLogin = document.querySelector('.login')
const sectionArticle = document.querySelector('.presentation');


// Si la valeur du token est bonne
if (tokenId) {
    console.log('le token est bon, vous pouvez admin');
    genererAdminElement();
}

function genererAdminElement () {
    // Création de la barre d'édition
    editionBar.style.display = 'block'
    const editionMod = document.createElement('div');
    editionMod.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition 
                            <button class="btn_change">publier les changements</button>`
    editionBar.appendChild(editionMod);

    // Ajout des icônes modifier
    const profilePictureEdition = document.createElement('figcaption');
    profilePictureEdition.innerHTML = `<button class="btn_profile-picture"><i class="fa-regular fa-pen-to-square"></i> modifier</button>`
    profilePicture.appendChild(profilePictureEdition);

     const portfolioEdition = document.createElement('button');
     portfolioEdition.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`
     portfolioEdition.className = 'btn_modification';
     sectionPortfolio.appendChild(portfolioEdition);

     const articleEdition = document.createElement('button');
     articleEdition.className = 'btn_presentation'
     articleEdition.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
     sectionArticle.appendChild(articleEdition);

     // Disparition des filtres
     categoryFilter.style.display = 'none';

     // Remplacement de login par logout
    adminLogin.innerHTML = 'logout'
}

// Deconnexion via logout
adminLogin.addEventListener('click', function() {
    window.localStorage.removeItem('tokenId');
    window.location.href='./index.html';
});