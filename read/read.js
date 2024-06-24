document.addEventListener('DOMContentLoaded', () => {
  let booksData = JSON.parse(localStorage.getItem('books')) 

  let urlParams = new URLSearchParams(window.location.search);
  let bookId = parseInt(urlParams.get('id'), 10);
  console.log(`bookId: ${bookId}`);
  console.log(`books:`, booksData);

  if (!isNaN(bookId) && bookId!== undefined) {
    let book = booksData.find((book) => book.id === String(bookId));
    console.log(`book:`, book);

    if (book) {
      document.querySelector('.read_container').innerHTML = `
        <div class="read container2">
          <div class="read-purchase_left">
            <h3 class="read-purchase_author">${book.author}</h3>
            <img class="read-purchase_img" src="${book.image}" alt="">
            <div class="read-purchase_btns">
              <button class="read-purchase_button">
                <a class="read-purchase_link" id="read-pdf">Читать</a>
              </button>
              <button class="read-purchase_button" id="back-button">
                <a class="read-purchase_link" href="/my_books/index.html">Назад</a>
              </button>
            </div>
          </div>
          <div class="read-purchase_main">
            <h2 class="read-purchase_name">${book.name}</h2>
            <div class="read-purchase_descr">
              <p class="read-purchase_descr_p">${book.description}</p>
            </div>
          </div>
        </div>
      `;
      document.getElementById('read-pdf').addEventListener('click', () => {
        window.location.href = book.pdf;
      });

      document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = '/my_books/index.html';
      });
    } else {
      document.querySelector('.read_container').innerHTML = "Книга не найдена";
    }
  } else {
    document.querySelector('.read_container').innerHTML = "Нет идентификатора книги";
  }
});