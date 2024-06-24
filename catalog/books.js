document.addEventListener('DOMContentLoaded', () => {
  // массив книг
  let booksData = JSON.parse(localStorage.getItem('books'))
  localStorage.setItem('books', JSON.stringify(booksData))

  // функция для генерации HTML-элементов для каждой книги
  function generateBookHTML(book) {
    return `
      <li class="catalog2_li">
        <a href="${`https://nikplay452.github.io/Book-Collection.github.io/purchase/index.html?id=${book.id}`}" target="_blank">
          <img class="catalog2_img" src="${book.image}" alt="">
          <div class="catalog2_li_descr">
            <p class="catalog2_author">${book.author}</p>
            <p class="catalog2_name">${book.name}</p>
          </div>
        </a>
      </li>
    `;
  }

  // функция для заполнения списка книг
  function fillBookList(filter) {
    let bookList = document.querySelector(".big_catalog2");
    bookList.innerHTML = "";
    booksData.filter(filter).slice(0, 15).forEach((book) => {
      bookList.innerHTML += generateBookHTML(book);
    });
  }

  // обработчик события для кнопок языка
  document.querySelectorAll('.left_button').forEach((button) => {
    button.addEventListener('click', (event) => {
      let lang = event.target.textContent.trim();
      let filter;
      if (lang === 'Английский') {
        filter = (book) => book.id > 30;
        document.querySelectorAll('.left_button img').forEach((img) => {
          if (img.src.includes('left_flag_filled')) {
            img.src = 'https://nikplay452.github.io/Book-Collection.github.io/img/left_flag.png';
          } else {
            img.src = 'https://nikplay452.github.io/Book-Collection.github.io/img/left_flag_filled.png';
          }
        });
      } else if (lang === 'Русский') {
        filter = (book) => book.id < 30;
        document.querySelectorAll('.left_button img').forEach((img) => {
          if (img.src.includes('left_flag')) {
            img.src = 'https://nikplay452.github.io/Book-Collection.github.io/img/left_flag_filled.png';
          } else {
            img.src = 'https://nikplay452.github.io/Book-Collection.github.io/img/left_flag.png';
          }
        });
      }
      fillBookList(filter);
    });
  });

  // вызываем функцию для заполнения списка книг
  fillBookList((book) => true);
  console.log(booksData)
  localStorage.setItem('books', JSON.stringify(booksData))
});