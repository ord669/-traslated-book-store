'use strict'

var gCurrLang = 'en'



var gTrans = {
    title: {
        en: 'Welcome to my book shop',
        he: 'ברוכים הבאים לחנות שלי'
    },
    'search-btn': {
        en: 'Search Button',
        he: 'כפתור חיפוש',
    },
    'filter-max': {
        en: 'maxPrice',
        he: 'סינון מקסימום',
    },
    'filter-min': {
        en: 'maxMin',
        he: 'סינון מינימום',
    },
    'book-id': {
        en: 'Book Id',
        he: 'זהות הספר',
    },
    'book-name': {
        en: 'Name',
        he: 'שם',
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר',
    },
    'book-img': {
        en: 'Imag',
        he: 'תמונה',
    },
    'book-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'add-new-book': {
        en: 'Add New Book',
        he: 'הוספת ספר חדש',
    },
    'update-book': {
        en: 'Update',
        he: 'עידכון ',
    },
    'read-book': {
        en: 'Read',
        he: 'קרא ',
    },
    'delete-book': {
        en: 'Delete',
        he: 'מחיקה ',
    },
    'rate-book': {
        en: 'Rate',
        he: 'דרג ',
    }
}





var gBooks = [
    {
        id:makeId(length = 6),
        name: 'harry poter',
        price: 120,
        imgUrl:'.jpg',
        rate:0

        
    },
    {
        id: makeId(length = 6),
        name: 'harry gold',
        price: 100,
        imgUrl:'.jpg',
        rate:0
    },
    {
        id: makeId(length = 6),
        name: 'oren ',
        price: 80,
        imgUrl:'.jpg',
        rate:0
    },
    {
        id: makeId(length = 6),
        name: 'batel Poter',
        price: 30,
        imgUrl:'.jpg',
        rate:0
    }
]



function getBooksList(){
    saveToStorage('books', gBooks)
    return gBooks
}



function removeBook(bookId){
    const books = loadFromStorage('books')
    const bookToRemove =  books.findIndex(book => book.id === bookId)

    books.splice(bookToRemove,1)
    saveToStorage('books', books)

    return books
}

function addBook(name,price){
    const books = loadFromStorage('books')
    console.log('books:', books)
    books.unshift({
        id:makeId(length = 6),
        name,
        price,
        imgUrl:'.jpg'
    })
    saveToStorage('books', books)
    return books
}

function getPriceChange(bookId,priceChange){
    const books = loadFromStorage('books')
    const bookToChangeIdx =  books.findIndex(book => book.id === bookId)
    books[bookToChangeIdx].price = priceChange
     saveToStorage('books', books)

}


function getDetailsModal(bookId){
    const books = loadFromStorage('books')
    const bookToModal =  books.find(book => book.id === bookId)
    return bookToModal
}


function getBookRate(value,bookId){
    const strToNum = +value
    const books = loadFromStorage('books')
    const bookToRateIdx =  books.findIndex(book => book.id === bookId)

    if(books[bookToRateIdx].rate === 0 && strToNum === -1) return
    if(books[bookToRateIdx].rate === 10 && strToNum === 1) return

    books[bookToRateIdx].rate += strToNum
    saveToStorage('books', books)
    return bookToRateIdx
}



function getFilterBooks(filterValue){
    const books = loadFromStorage('books')
    switch (filterValue) {
        case 'min':
            books.sort((a, b) => {
                return a.price - b.price
            })
            saveToStorage('books', books)

            var queryStringParams = `?filter=min`
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
            window.history.pushState({ path: newUrl }, '', newUrl)
            break;
        case 'max':
            books.sort((a, b) => {
                return  b.price - a.price
            })
            saveToStorage('books', books)

            var queryStringParams = `?filter=max`
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
            window.history.pushState({ path: newUrl }, '', newUrl)
            break;
    }
}



function getBookBySearch(txt){
    const books = loadFromStorage('books')
    console.log('txt:', txt)
    const bookToSearch =  books.filter(book => book.name.toLowerCase().includes(txt.toLowerCase()) )
    saveToStorage('searchBooks', bookToSearch)
}





function setLang(lang) {
    gCurrLang = lang
}





function doTrans() {
    // done: 
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        // done: support placeholder    
        if (el.placeholder) el.placeholder = translation
    })
}




function getTrans(transKey) {
    // done: if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // done: get from gTrans
    var translation = key[gCurrLang]

    // done: If translation not found - use english
    if (!translation) translation = key.en

    return translation
}