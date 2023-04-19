/*let works = window.localStorage.getItem('works');
if (works === null) {
    //récupération des données
    const response = await fetch('http://localhost:5678/api/works');
    works = await response.json();
    //transformation des données en JSON
    const valeurWorks = JSON.stringify(works);
    //stockage dans le localStorage
    window.localStorage.setItem('works', valeurWorks);
} else {
    works = JSON.parse(works);
}*/

/*let works = [];

function getData() {
    fetch('http://localhost:5678/api/works')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            works = data;
        });
        
}

getData();

console.log(works);*/

fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((json) => console.log(json));


