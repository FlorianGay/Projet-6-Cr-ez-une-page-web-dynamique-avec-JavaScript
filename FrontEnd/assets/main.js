let works = [];
let categories = [];
const gallery = document.querySelector('.gallery');
const filters = document.querySelector('.filters');

async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        const listCategories = await response.json();
        categories = listCategories;

        listCategories.map((category) => {
            const filter = document.createElement('li');
            filter.className = 'filter';
            filter.dataset.id = category.id;
            filter.textContent = category.name;
            filters.appendChild(filter);
        })
    } catch (error) {
        console.log(error);
    }
}

async function fetchWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const listWorks = await response.json();
        works = listWorks;
        displayWorks(works)
    } catch (error) {
        console.log(error);
    }
}

async function worksFilteredByCategory() {
    const filterItems = document.querySelectorAll('.filters li');
    filterItems.forEach((item) => item.addEventListener('click', () => {
        let worksFiltered = [];
        gallery.innerHTML = '';
        // Uniquement si on clique sur un filtre autre que "TOUS"
        worksFiltered = works.filter(work => work.category.id == item.dataset.id);
        displayWorks(worksFiltered)
    }))
}


addEventListener("DOMContentLoaded", async (event) => {
    await fetchCategories()
    await fetchWorks();
    await worksFilteredByCategory();
});


function displayWorks(works) {
    works.map((work) => {
        const workItem = document.createElement('figure');
        workItem.dataset.id = work.category.id;
        workItem.innerHTML = `<img src=${work.imageUrl} alt=${work.title}
            <figcaption>${work.title}</figcaption>`
        gallery.appendChild(workItem);
    })
}


