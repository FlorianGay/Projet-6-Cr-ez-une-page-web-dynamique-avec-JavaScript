// stockage du token d'identification
let tokenId = window.localStorage.getItem('tokenId');
if (tokenId === null) {
    const valeurToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4';
    window.localStorage.setItem('tokenId', valeurToken)
}
console.log(tokenId);

// Compte et mdp de connexion
let admin = {
    email : 'sophie.bluel@test.tld',
    password: 'S0phie'
}
console.log(admin);
const loginButton = document.getElementById('login-submit');

// Envoie sur l'API
async function fetchLogin() {
    await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: mail,
            password : password,
        }),
    })
    .then ((response) => response.json())
}

// Bouton de validation du login
 loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    if (mail === admin.email && password === admin.password) {
        alert('Vous êtes bien connecté(e)');
        //window.location.href='./index.html';
    } else {
        alert('Identifiant out mot de passe incorrect')
    }
});



