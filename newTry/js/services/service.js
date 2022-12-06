'use strict'


// var gCurrBookId
var gFilterBy = { minRate: 0, maxPrice: 300, searchTxt: '' }

var gBooks = [
    {
        id: makeId(length = 6),
        name: 'harry poter',
        price: 120,
        imgUrl: '.jpg',
        rate: 0


    },
    {
        id: makeId(length = 6),
        name: 'harry gold',
        price: 100,
        imgUrl: '.jpg',
        rate: 0
    },
    {
        id: makeId(length = 6),
        name: 'oren ',
        price: 80,
        imgUrl: '.jpg',
        rate: 0
    },
    {
        id: makeId(length = 6),
        name: 'batel Poter',
        price: 30,
        imgUrl: '.jpg',
        rate: 0
    }
]

function createBook(name,price){
    return {
        id: makeId(length = 6),
        name,
        price,
        imgUrl: '.jpg',
        rate: 0
    }
}




function getBooks() {
    var books = gBooks.filter(
        (book) =>
            book.rate >= gFilterBy.minRate &&
            book.price < gFilterBy.maxPrice
        // &&
        // book.title.toLowerCase().includes(gFilterBy.searchTxt)
    )
    saveToStorage('books', books)
    return books
}





function getRemoveBook(bookId) {
    const books = loadFromStorage('books')
    const bookIdxRemove =  books.findIndex(book => book.id ===bookId)
    console.log('bookIdxRemove:',bookIdxRemove )
    gBooks.splice(bookIdxRemove,1)
    saveToStorage('books', gBooks)
}


function addBook(name,price){
    const books = loadFromStorage('books')
    const newBook = createBook(name,price)
    gBooks.unshift(newBook)
    saveToStorage('books', gBooks)


}
