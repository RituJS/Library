let myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// GET BOOKS FROM LOCAL STORAGE
if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}


//write the logic to show how many books are read, how al books.many books are unread and tot
function showLibraryInfo() {
  const booksRead = document.querySelector('#books-read');
  const booksUnread = document.querySelector('#books-unread');
  const totalBooks = document.querySelector('#total-books');
  let readCounter = 0;
  let unreadCounter = 0;
  booksRead.textContent = 0;
  booksUnread.textContent = 0;
  
  for(var i=0; i<myLibrary.length; i++)
  {
    if (myLibrary[i].status===true){
      readCounter++;
      booksRead.textContent=readCounter;
    } else if (myLibrary[i].status===false)
    {
      unreadCounter++;
      booksUnread.textContent=unreadCounter;
    }
  }
      totalBooks.textContent=myLibrary.length;

}


function showBooksInLibrary() {

  // add code for  SAVE TO LOCAL STORAGE
  localStorage.setItem('books',JSON.stringify(myLibrary));
  showLibraryInfo();
  
  const booklist=document.getElementById("table-body");
  booklist.textContent="";
 
  for (let i=0; i < myLibrary.length; i += 1) {
   var bookDetail=document.createElement("tr");
   bookDetail.classList.add('book-info');
   booklist.appendChild(bookDetail);

    //add code for BOOK TITLE
    var bookName=document.createElement("td");
    bookName.textContent=myLibrary[i].title;
    bookDetail.appendChild(bookName);
    
    // add code for BOOK AUTHOR
    var Author=document.createElement("td");
    Author.textContent=myLibrary[i].author;
    bookDetail.appendChild(Author);
  
    // add code for BOOK PAGES
    var Pages=document.createElement("td");
    Pages.textContent=myLibrary[i].pages;
    bookDetail.appendChild(Pages);
    
    // add code for  BOOK STATUS BUTTON
    var bookStatus=document.createElement('td');
    var statusSymbol=document.createElement('i');
    if (myLibrary[i].status === false) {
      statusSymbol.classList.add('fas', 'fa-times');
    } else {
      statusSymbol.classList.add('fas', 'fa-check');
    }
    bookStatus.appendChild(statusSymbol);
    bookDetail.appendChild(bookStatus);
    
    // add code for BOOK REMOVAL BUTTON
    var bookDelete = document.createElement('td');
    var deleteSymbol = document.createElement('i');
    deleteSymbol.classList.add('fas', 'fa-trash-alt');
    bookDelete.appendChild(deleteSymbol);
    bookDetail.appendChild(bookDelete);
    
  }
}

//add book to library
function addBookToLibrary(title, author, pages, status) {
  var book = new Book(title, author, pages, status);
  myLibrary.push(book);
  showBooksInLibrary();
}


// FORM VALIDATION
function validateForm(event) {
  event.preventDefault();
  const form = document.querySelector('form');
  const titleInput = document.querySelector('#title');
  const titleErr = document.querySelector('.title');
  const nameInput = document.querySelector('#name');
  const nameErr = document.querySelector('.name');
  const numberInput = document.querySelector('#number');
  const numberErr = document.querySelector('.number');
  const checkbox = document.querySelector('input[name="checkbox"]');
  if (titleInput.value === '') {
    titleErr.style.display = 'block';
  } else {
    titleErr.style.display = 'none';
  }
  if (nameInput.value === '') {
    nameErr.style.display = 'block';
  } else {
    nameErr.style.display = 'none';
  }
  if (numberInput.value === '' || numberInput.value.match(/[^1-9]/) || numberInput.value <= 0) {
    numberErr.style.display = 'block';
  } else {
    numberErr.style.display = 'none';
  }
  if (titleInput.value !== '' && nameInput.value !== '' && numberInput.value !== '' && numberInput.value > 0) {
    if (checkbox.checked) {
      addBookToLibrary(titleInput.value, nameInput.value, numberInput.value, true);
    } else {
      addBookToLibrary(titleInput.value, nameInput.value, numberInput.value, false);
    }
    form.reset();
  }
}


// MODAL/POP-UP FOR BOOKS REMOVAL
function manipulateModal() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'block';
  modal.addEventListener('click', (event) => {
    const { target } = event;
    if (target.classList.contains('close')) {
      modal.style.display = 'none';
    } else if (target.classList.contains('confirm-removal')) {
      myLibrary = [];
      modal.style.display = 'none';
    }
  });
}

//create click listeners  document.addEventListener('click', {}) for the following id's: // 'add-book' // 'delete-all-btn' // 'fa-trash-alt' // 'fa-check'// 'fa-times'
function listenClicks() {
  document.addEventListener('click', (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === 'add-book') {
      validateForm(event);
    } else if (target.id === 'delete-all-btn') {
      manipulateModal();
    } else if (target.classList.contains('fa-trash-alt')) {
      myLibrary.splice(tr, 1);
    } else if (target.classList.contains('fa-check')) {
      target.classList.remove('fa-check');
      target.classList.add('fa-times');
      myLibrary[tr].status = false;
    } else if (target.classList.contains('fa-times')) {
      target.classList.remove('fa-times');
      target.classList.add('fa-check');
      myLibrary[tr].status = true;
    }
    showBooksInLibrary();
  });
}

showBooksInLibrary();
listenClicks();
