'use strict'



function onInit(){
    renderBooks()
}


function renderBooks(renderBy){
    if(!loadFromStorage('books')){
        console.log('in:', 'in')
        var books = getBooksList()
    }else{
        var books = (renderBy)? loadFromStorage('searchBooks') :  loadFromStorage('books')
    }
    const strHTMLs = books.map(book => `

    <tr>
    <td class="text-center"> ${book.id}</td>

    <td class="text-center"> ${book.name}</td>

    <td class="text-center"> ${book.price}</td>

    <td class="text-center"> ${book.imgUrl}</td>

    <td><button onclick="onUpdateBook('${book.id}')" class="btn btn-outline-warning update" value="update"  data-trans="update-book"> ${getTrans('update-book')}</button></td>
    <td><button onclick="onReadBook('${book.id}')" class="btn btn-outline-secondary read" value="read" data-trans="read-book">${getTrans('read-book')}</button></td>
    <td><button onclick="onRemoveBook('${book.id}')" class="btn btn btn-outline-danger delete" value="delete" data-trans="delete-book">${getTrans('delete-book')}</button></td>

    </tr>
    ` )


    document.querySelector('tbody').innerHTML = strHTMLs.join('')

}

function onRemoveBook(bookId){
    removeBook(bookId)
    renderBooks()
}



function onAddBook(){
    const nameNewBook = prompt('Name the book')
    const priceNewBook = +prompt('price')

    addBook(nameNewBook, priceNewBook)
    renderBooks()
}


function onUpdateBook(bookId){
    const priceChange = +prompt('change price')
    console.log(':', priceChange)
    getPriceChange(bookId,priceChange)
    renderBooks()

}


function onReadBook(bookId){
    const DetailsModal = getDetailsModal(bookId)
    addDetailsModal(DetailsModal)

    openModal(bookId)
    console.log(':',bookId )
}

function openModal(bookId){
    const books = loadFromStorage('books')
    const bookToRateIdx =  books.findIndex(book => book.id === bookId)


    const elModal = document.querySelector('.book-modal')
    elModal.classList.remove('display-none')
    renderBookRate(bookToRateIdx)
}

function addDetailsModal(book){
    const elModal = document.querySelector('.book-modal')
    const strHTML = `
    <h3>${book.name}</h3>
    <h4>${book.price}</h4>
    <h5>${book.imgUrl}</h5>
    <div class="rate" data-trans="rate-book">
    <button onclick="onRateBook(this.value,'${book.id}')" value=-1 >-</button>
    <span class="rate-text">0</span>
    <button onclick="onRateBook(this.value,'${book.id}')" value=1 >+</button>

    </div>

    `
    elModal.innerHTML = strHTML

}


function onRateBook(value,bookId){
    const rateNumber = getBookRate(value,bookId)
    console.log(':',rateNumber )
    renderBookRate(rateNumber)
}

function renderBookRate(bookIdx){
    const books = loadFromStorage('books')
    const bookToRate =  books[bookIdx]
    console.log('bookToRate:', bookToRate)

    const elRate = document.querySelector('.rate-text')
    elRate.innerText = bookToRate.rate
}



function onSetFilter(filterValue){
    getFilterBooks(filterValue)
    renderBooks()

    console.log(':', filterValue)

}


function onSearchBox(ev){
    ev.preventDefault()

    const elSearch = document.querySelector('input[name="search-book"]')
    const txt = elSearch.value

    getBookBySearch(txt)

    
    // console.log('txt', txt)
    elSearch.value = ''
    
    renderBooks(true)

    
    var queryStringParams = `?search=${txt}`
    var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}




function onSetLang(lang) {
    setLang(lang)

    // done: if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    doTrans()
    renderBooks()
}