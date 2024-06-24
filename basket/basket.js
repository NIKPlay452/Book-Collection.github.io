window.addEventListener('DOMContentLoaded', () => {
  let buybook = JSON.parse(localStorage.getItem('buybook')) || [];
  let mybooks = JSON.parse(localStorage.getItem('mybooks')) || [];

  let basketContainer = document.querySelector('.basket_container');
  let basketList = document.querySelector('.basket_list');
  let basketTotalNum = document.querySelector('.basket_total_num_p');
  let basketButton = document.querySelector('.basket_button');

  // функция для обновления общей цены корзины
  function updateTotalPrice() {
    let totalPrice = buybook.reduce((acc, book) => acc + parseInt(book.cost, 10), 0);
    basketTotalNum.textContent = totalPrice === 0? '0 р' : `${totalPrice} р`;
  }

  // функция для добавления книги в корзину
  function addBookToBasket(book) {
    let basketLi = document.createElement('li');
    basketLi.className = 'basket_li';

    let bookImg = document.createElement('img');
    bookImg.className = 'basket_img';
    bookImg.src = book.image; // используем данные из библиотеки для подставления картинки
    bookImg.alt = '';

    let bookDescr = document.createElement('div');
    bookDescr.className = 'basket_li_descr';

    let bookAuthor = document.createElement('p');
    bookAuthor.className = 'basket_author';
    bookAuthor.textContent = book.author;

    let bookName = document.createElement('p');
    bookName.className = 'basket_name';
    bookName.textContent = book.name;

    let bookPrice = document.createElement('span');
    bookPrice.className = 'basket_price';
    bookPrice.textContent = `${book.cost} р`;

    let deleteButton = document.createElement('button');
    deleteButton.className = 'basket_delete_button';
    deleteButton.dataset.bookId = book.id; // set bookId to dataset

    let deleteImg = document.createElement('img');
    deleteImg.className = 'basket_delete_img';
    deleteImg.src = '/img/delete_icon.png';
    deleteImg.alt = '';

    deleteButton.appendChild(deleteImg);

    bookDescr.appendChild(bookAuthor);
    bookDescr.appendChild(bookName);
    bookDescr.appendChild(bookPrice);

    basketLi.appendChild(bookImg);
    basketLi.appendChild(bookDescr);
    basketLi.appendChild(deleteButton);

    basketList.appendChild(basketLi);
    updateTotalPrice(); 
  }

  // добавить книги в корзину
  buybook.forEach((book) => {
    addBookToBasket(book);
  });

  updateTotalPrice();
  

  // добавить обработчик событий для кнопок удаления
  basketList.addEventListener('click', (e) => {
    
    let target = e.target;
    let button = target.closest('.basket_delete_button');
    if (button) {
      let bookId = button.dataset.bookId;
      buybook.forEach((book) => console.log(`ID книги: ${book.id}`));
      let index = buybook.findIndex((book) => book.id === bookId);
      if (index!== -1) {
        let confirmDelete = confirm(`Вы хотите удалить книгу "${buybook[index].name}"?`);
        if (confirmDelete) {
          buybook.splice(index, 1);
          console.log(`Массив buybook после удаления: ${JSON.stringify(buybook)}`);
          button.parentNode.remove();
          updateTotalPrice();
          
          localStorage.setItem('buybook', JSON.stringify(buybook));
        }
      }
    }
  });

  // добавить обработчик событий для кнопки оплаты
  basketButton.addEventListener('click', () => {
    if (buybook.length === 0) {
      alert('Ваша корзина пуста!');
      return;
    }

    // Диалог с распознаванием банковских реквизитов пользователя
    let cardNumber = prompt('Введите номер вашей банковской карты:');
    let expirationDate = prompt('Введите дату окончания срока действия вашей банковской карты (MM/YY):');
    let cvv = prompt('Введите код CVV вашей банковской карты:');
    if (cardNumber && expirationDate && cvv) {
      // Проверка номера карты
      if (!/^\d{16}$/.test(cardNumber)) {
        alert('Зачем вы пытаетесь нас обмануть? Номер карты должен состоять из 16 цифр.');
        return;
      }

      // Проверка даты окончания срока действия
      let expirationDateParts = expirationDate.split('/');
      if (expirationDateParts.length!== 2) {
        alert('Зачем вы пытаетесь нас обмануть? Дата окончания срока действия должна быть в формате MM/YY.');
        return;
      }
      let month = parseInt(expirationDateParts[0], 10);
      let year = parseInt(expirationDateParts[1], 10);

      // Проверка месяца
      if (month < 1 || month > 12) {
        alert('Зачем вы пытаетесь нас обмануть? Месяц должен быть от 1 до 12.');
        return;
      }

      // Проверка кода CVV
      if (!/^\d{3}$/.test(cvv)) {
        alert('Зачем вы пытаетесь нас обмануть? Код CVV должен состоять из 3 цифр.');
        return;
      }

      // Если пользователь ввел все реквизиты корректно, перенаправить на страницу "Мои книги"
      mybooks = mybooks.concat(buybook); // добавить книги из корзины в массив mybooks
      localStorage.setItem('mybooks', JSON.stringify(mybooks)); // сохранить массив mybooks в локальном хранилище
      alert('Оплата прошла успешно, ожидайте...'); // отобразить сообщение об успешной оплате
      console.log(mybooks)

      // Удалить все элементы li из корзины
      while (basketList.firstChild) {
        basketList.removeChild(basketList.firstChild);
      }

      // Очистить массив buybook
      buybook = [];
      localStorage.setItem('buybook', JSON.stringify(buybook));

      setTimeout(() => {
        window.location.href = '/my_books/index.html'; // перенаправить на страницу "Мои книги" через 2 секунды
      }, 2000);
    };
  })
})