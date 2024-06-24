document.addEventListener('DOMContentLoaded', () => {
  let mybooks = JSON.parse(localStorage.getItem('mybooks')) || [];
  let bookStorage = {};

  // Создайте отдельное хранилище для книг
  mybooks.forEach((book) => {
    bookStorage[book.id] = book;
  });

  let myBooksList = document.querySelector('.my_books_list');
  let myBooksContainer = document.querySelector('.my_books_container');

  function addBookToMyBooks(bookId) {
    let book = bookStorage[bookId];
    if (!book) return;

    let myBooksLi = document.createElement('li');
    myBooksLi.className = 'basket_li';

    let bookLink = document.createElement('a');
    bookLink.href = `/read/index.html?id=${bookId}`;
    bookLink.target = '_blank';

    let bookImg = document.createElement('img');
    bookImg.className = 'basket_img';
    bookImg.src = book.image;
    bookImg.alt = '';

    let bookDescr = document.createElement('div');
    bookDescr.className = 'basket_li_descr';

    let bookAuthor = document.createElement('p');
    bookAuthor.className = 'basket_author';
    bookAuthor.textContent = book.author;

    let bookName = document.createElement('p');
    bookName.className = 'basket_name';
    bookName.textContent = book.name;

    bookDescr.appendChild(bookAuthor);
    bookDescr.appendChild(bookName);

    bookLink.appendChild(bookImg);
    bookLink.appendChild(bookDescr);

    myBooksLi.appendChild(bookLink);

    myBooksList.appendChild(myBooksLi);
  }

  if (Object.keys(bookStorage).length === 0) {
    let emptyMessage = document.createElement('p');
    emptyMessage.className = 'y_books_empty';
    emptyMessage.textContent = 'У вас нет доступных книг';
    myBooksList.appendChild(emptyMessage);
  } else {
    Object.keys(bookStorage).forEach((bookId) => {
      addBookToMyBooks(bookId);
    });
  }

  // Обновите стили на основе количества книг
  function updateMyBooksStyles() {
    if (Object.keys(bookStorage).length < 6) {
      myBooksContainer.style.height = '100vh';
    } else {
      myBooksContainer.style.height = '100%';
    }
  }

  updateMyBooksStyles();
});