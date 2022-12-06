'use strict'



function onInit(){
    renderBooks()
}


function renderBooks(renderBy){

    const books =  getBooks()
    const strHTMLs = books.map(book => `

    <tr>
    <td> ${book.id}</td>

    <td> ${book.name}</td>

    <td> ${book.price}</td>

    <td> ${book.imgUrl}</td>

    <td><button onclick="onUpdateBook('${book.id}')" class="btn update" value="update">Update</button></td>
    <td><button onclick="onReadBook('${book.id}')" class="btn read" value="read">Read</button></td>
    <td><button onclick="onRemoveBook('${book.id}')" class="btn delete" value="delete">Delete</button></td>

    </tr>
    ` )


    document.querySelector('tbody').innerHTML = strHTMLs.join('')

}



function onRemoveBook(bookId){
    console.log('bookId:', bookId)
    getRemoveBook(bookId)
    renderBooks()

}



function onAddBook(){
    const name = prompt('name the book')
    const price = +prompt('whats the price?')
    addBook(name, price)
    renderBooks()
}


function onReadBook(bookId){
    console.log('bookId:', bookId)

}