document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('.form2');
  let phoneInput = document.querySelector('#phone');
  let passwordInput = document.querySelector('#password');
  let button = document.querySelector('#button');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    let phoneNumber = phoneInput.value;
    let password = passwordInput.value;

    let userDataStorage = JSON.parse(localStorage.getItem('userDataStorage')) || [];

    if (userDataStorage.length === 0) {
      alert('Нет пользователей');
      return;
    }

    let currentUserDataStorage = []; // Определите currentUserDataStorage здесь

    for (let i = 0; i < userDataStorage.length; i++) {
      if (userDataStorage[i].number === phoneNumber && userDataStorage[i].password === password) {
        // пользователь найден, авторизуем его
        currentUserDataStorage.push(userDataStorage[i]); // Добавьте объект текущего пользователя в массив
        localStorage.setItem('currentUserData', JSON.stringify(currentUserDataStorage));
        window.location.href = '/profile/index.html'; // перейти на страницу профиля
        return;
      }
    }

    // пользователь не найден, выводим ошибку
    alert('Неверный номер или пароль');
  });
});