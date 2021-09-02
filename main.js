const url = 'http://openlibrary.org/search.json?q=';
// const imageUrl = 'https://covers.openlibrary.org/b/id/-M.jpg';

const searchIput = document.getElementById('searchInput');
const searchBtn = document.getElementById('basic-addon2');
const booksContainer = document.getElementById('booksContainer');
const spinner = document.getElementById('spinner');
const alert = document.getElementById('alert');
const warning = document.getElementById('warning');
const warningDiv = document.getElementById('warningDiv');
const serverError = document.getElementById('serverError');


searchBtn.addEventListener('click', async () => {
    const searchTerm = searchIput.value.trim();
    searchIput.value = '';
    alert.classList.add('d-none');
    warning.classList.add('d-none');
    serverError.classList.add('d-none');


    if(searchTerm.length === 0){
        alert.classList.remove('d-none');
        warning.classList.add('d-none');

        booksContainer.textContent = '';

        return;
    }

   try {
       spinner.classList.remove('d-none');
       booksContainer.textContent = '';

       const response = await fetch(`${url}${searchTerm}`)
       const data = await response.json();
       console.log(data);
       if(data.numFound === 0 || data.docs.length === 0){
            warning.classList.remove('d-none');
            warningDiv.innerHTML = `No data matched with the keyword <span class="text-decoration-line-through">${searchTerm}</span>`;
            spinner.classList.add('d-none');

       }else {
        renderBooks(data);
       }
   } catch (error) {
    serverError.classList.remove('d-none');
    spinner.classList.add('d-none');

   }
});


const renderBooks = ({ numFound, start, docs:books }) => {
    spinner.classList.add('d-none');
    booksContainer.classList.remove('d-none');
    // booksContainer.textContent = '';

    showResultCount(books.length, numFound);

    books.forEach(({ title, cover_i, author_name, first_publish_year, publisher }) => {
        console.log(publisher);
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('col-md-4','col-lg-3');
        const imageUrl = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : 'images/noimage.png'
        bookContainer.innerHTML = `

        <div class="card border rounded text-center shadow-lg" style="height: 38rem;" id="card">
            <img src="${imageUrl}" class="card-img-top img-fluid" alt="Book Cover" style="height: 20rem;"> 
            
                <h5 class="card-title text-color py-4 fw-bolder">Title: ${title ? title : 'No Title Found For This Book'}</h5>
           
            
                <div class="text-start px-2">
                    <p class="text-light "><span class="fw-bold text-color">Author: </span> ${author_name ? author_name : 'No Author Name Found'}</p>
                    <p class="text-light "><span class="fw-bold text-color">First Published: </span> ${first_publish_year ? first_publish_year : 'No Publish Year Found'}</p>
                    <p class="text-light "><span class="fw-bold text-color">Publisher: </span> ${publisher ? publisher.slice(0, 2) : 'No Publiser Found'}</p>
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
     <p class="text-light fw-bold">Showing ${showCount} of ${totalResult} books</p>  
    </div>

    `;
    booksContainer.appendChild(div);
    
}

