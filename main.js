const url = 'http://openlibrary.org/search.json?q=';
// const imageUrl = 'https://covers.openlibrary.org/b/id/-M.jpg';

const searchIput = document.getElementById('searchInput');
const searchBtn = document.getElementById('basic-addon2');
const booksContainer = document.getElementById('booksContainer');
const spinner = document.getElementById('spinner');

searchBtn.addEventListener('click', async () => {
    const searchTerm = searchIput.value.trim();
    searchIput.value = '';
    console.log(searchTerm);

   try {
       spinner.classList.remove('d-none');
       const response = await fetch(`${url}${searchTerm}`)
       const data = await response.json();
       console.log(data);
       renderBooks(data);
   } catch (error) {
       console.log(error);
   }
});


const renderBooks = ({ numFound, start, docs:books }) => {
    spinner.classList.add('d-none');
    booksContainer.classList.remove('d-none');
    booksContainer.textContent = '';

    showResultCount(books.length, numFound);

    books.forEach(({ title, cover_i }) => {
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('col-md-4','col-lg-3');
        const imageUrl = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : 'images/noimage.png'
        bookContainer.innerHTML = `

        <div class="card" style="height: 45rem;">
            <img src="${imageUrl}" class="card-img-top img-fluid" alt="Book Cover" style="height: 20rem;"> 
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
    
    `
        booksContainer.appendChild(bookContainer);
    })
}


const showResultCount = (showCount, totalResult) => {
    const div = document.createElement('div');
    div.classList.add('row', 'justify-content-cener', 'my-4');
    div.innerHTML = `
    
    <div class="col-md-6">
     <p class="text-light">Showing ${showCount} of ${totalResult} books</p>  
    </div>

    `;
    booksContainer.appendChild(div);
    
}

