document.addEventListener('DOMContentLoaded', () => {
  let books = JSON.parse(localStorage.getItem('books')) || [];
  console.log(books)
  let urlParams = new URLSearchParams(window.location.search);
  let bookId = urlParams.get('id');

  let book = books.find(book => book.id === bookId);

  if (book) {
    let myBooks = JSON.parse(localStorage.getItem('mybooks')) || [];

    if (myBooks.find(b => b.id === book.id)) {
      alert('Вы уже купили эту книгу, она у вас в библиотеке!');
      window.location.href = `https://nikplay452.github.io/Book-Collection.github.io/read/index.html?id=${bookId}`;
      return;
    }

    let purchaseHTML = `
    <section class="purchase_container">
        <div class="purchase container2">
        <div class="read-purchase_left">
          <h3 class="read-purchase_author">${book.author}</h3>
          <img class="read-purchase_img" src="${book.image}" alt="">
          <div class="purchase_price">
            <p class="purchase_price_p">${book.cost} р</p>
          </div>
          <div class="read-purchase_btns">
            <button class="read-purchase_button">
              <a class="read-purchase_link" href="" id="buy-button">Купить</a>
            </button>
            <button class="read-purchase_button">
              <img class="purchase_plus" src="img/plus_icon.png" alt="" id="add-to-library-button">
            </button>
            <button class="read-purchase_button">
              <a class="read-purchase_link" href="https://nikplay452.github.io/Book-Collection.github.io/basket/index.html">Назад</a>
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
    </section>
    `;

    document.body.innerHTML = purchaseHTML;

    document.getElementById('buy-button').addEventListener('click', (e) => {
      e.preventDefault();
      let buyBook = JSON.parse(localStorage.getItem('buybook')) || [];
      if (buyBook.find(b => b.id === book.id)) {
        alert('Ваша книга уже в корзине!');
      } else {
        buyBook.push(book);
        localStorage.setItem('buybook', JSON.stringify(buyBook));
        window.location.href = 'https://nikplay452.github.io/Book-Collection.github.io/basket/index.html';
      }
    });

    document.getElementById('add-to-library-button').addEventListener('click', (e) => {
      e.preventDefault();
      let buyBook = JSON.parse(localStorage.getItem('buybook')) || [];
      if (buyBook.find(b => b.id === book.id)) {
        alert('Ваша книга уже в корзине!');
      } else {
        buyBook.push(book);
        localStorage.setItem('buybook', JSON.stringify(buyBook));
        alert('Ваша книга добавлена в корзину!');
      }
    });
  } else {
    document.body.innerHTML = "Книга не найдена";
  }
})