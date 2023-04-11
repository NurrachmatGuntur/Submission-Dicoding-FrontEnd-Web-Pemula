let form = document.forms["inputBook"];

const getBookLists = JSON.parse(localStorage.getItem("bookLists"))

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let check = document.querySelector('input[type="checkbox"]')

    let formData = {
        "title"     : form.title.value,
        "author"    : form.author.value,
        "year"      : form.year.value,
        "isComplete"  : check.checked
    }
    let bookLists = []

    if(getBookLists != null && getBookLists.length > 0){
        formData.id = getBookLists.length + 1
        bookLists = getBookLists
        bookLists.push(formData)
        console.log(bookLists);
        console.log('masuk if');
    } else{
        formData.id = 1
        bookLists.push(formData)
        console.log("@masuk else");
    }

    localStorage.removeItem('bookLists')
    localStorage.setItem("bookLists", JSON.stringify(bookLists));

    window.location.reload()
})

let bookListsComplete = document.querySelector("#completeBookshelfList")
let bookListsInComplete = document.querySelector("#incompleteBookshelfList")

const createBookList = function (titleVal, authorVal, yearVal, isCompleteVal, id){
    let book = document.createElement('div');
    book.classList.add('book_item');
    let title = document.createElement('div');
    title.classList.add('titleBook')
    let author = document.createElement('div');
    author.classList.add('authorBook')
    let year = document.createElement('div');
    year.classList.add('yearBook')
    let action = document.createElement('div')
    action.classList.add("action")

    let complete = document.createElement('button')
    if(isCompleteVal == true){
        complete.classList.add('isComplete')
        complete.setAttribute("id", id)
        complete.textContent ="Belum selesai dibaca"
    } else{
        complete.classList.add('notComplete')
        complete.setAttribute("id", id)
        complete.textContent ="Selesai dibaca"
    }

    complete.setAttribute("onClick", "btnAction(this.id)")
    let del = document.createElement('button')
    del.classList.add('delete')
    del.setAttribute("id", id)
    del.setAttribute("onClick", "delBtn(this.id)")
    del.textContent="Hapus"
    
    title.textContent = titleVal
    author.textContent = authorVal
    year.textContent = yearVal

    if(isCompleteVal == true){
        bookListsComplete.appendChild(book)
    } else{
        bookListsInComplete.appendChild(book)
    }

    book.appendChild(title)
    book.appendChild(author)
    book.appendChild(year)
    book.appendChild(action)
    action.appendChild(complete)
    action.appendChild(del)
}


const loadBookLists = function(){
    if(getBookLists != null){
        for(var i = 0; i<getBookLists.length; i++){
            let title = getBookLists[i].title
            let author = getBookLists[i].author
            let year = getBookLists[i].year
            let complete = getBookLists[i].isComplete
            let id = getBookLists[i].id
            createBookList(title, author, year, complete, id)
        }
    }
}

loadBookLists()

const btnAction = function(btnId){
    const bookLists = getBookLists

    const select = bookLists.filter((book)=>book.id == btnId)
    
    if(select[0].isComplete == true){
        select[0].isComplete = false
    } else{
        select[0].isComplete = true
    }

    const editBookLists = bookLists.filter((book)=>book.id != btnId)
    
    editBookLists.push(select[0])

    localStorage.removeItem('bookLists')
    localStorage.setItem("bookLists", JSON.stringify(editBookLists));

    window.location.reload()
}

const delBtn = function(btnId){
    const bookLists = getBookLists

    const editBookLists = bookLists.filter((book)=>book.id != btnId)

    localStorage.removeItem('bookLists')
    localStorage.setItem("bookLists", JSON.stringify(editBookLists));

    window.location.reload()
}