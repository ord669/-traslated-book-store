'use strict'



function onInit(){
    renderBooks()
}


function renderBooks(renderBy,viewRender){
    if(!loadFromStorage('books')){
        console.log('in:', 'in')
        var books = getBooksList()
    }else{
        var books = (renderBy)? loadFromStorage('searchBooks') :  loadFromStorage('books')
    }
    
    var strHTMLs = books.map(book => `

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



    renderCards()
    function renderCards() {
        var strHtmls = books.map(book => `
            <article class="car-preview">
                <button onclick="onRemoveBook('${book.id}')" class="btn-remove" value="delete" data-trans="delete-book">X</button>
                <h5>${book.name}</h5>
                <td><button onclick="onReadBook('${book.id}')" class="btn btn-outline-secondary read" value="read" data-trans="read-book">${getTrans('read-book')}</button></td>
                <td><button onclick="onUpdateBook('${book.id}')" class="btn btn-outline-warning update" value="update"  data-trans="update-book"> ${getTrans('update-book')}</button></td>
                <img onerror="this.src='img/fiat.png'" src="img/Harry_Potter_character_poster.jpg" >

            </article> 
            `
        )
        document.querySelector('.books-card-container').innerHTML = strHtmls.join('')
    }
    




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
    <div class="modal-container">
    <h3>${book.name}</h3>
    <h4>${book.price}</h4>
    <h5>${book.imgUrl}</h5>
    <div class="rate" data-trans="rate-book">
    <button onclick="onRateBook(this.value,'${book.id}')" value=-1 >-</button>
    <span class="rate-text">0</span>
    <button onclick="onRateBook(this.value,'${book.id}')" value=1 >+</button>
    
    </div>
    <button onclick="onCloseModal(this.value,'${book.id}')" >close</button>
    
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



function onCloseModal(){
    const elModal = document.querySelector('.book-modal')
    elModal.classList.add('display-none')
    renderBookRate(bookToRateIdx)
}


function onTogleView(viewFilterBy){
    const elTable = document.querySelector('.table-view')
    const elCards = document.querySelector('.books-card-container')
    if(viewFilterBy === 'cards'){
        elCards.hidden = false
        elTable.hidden = true
    }else{
        elCards.hidden = true
        elTable.hidden = false 
    }
    
    // console.log(':',elTable )

    // elTable.hidden = !elTable.hidden 

   
    // elCards.hidden = !elCards.hidden 

    // // elTable.hidden = true
    // // $elTable.hide()
}