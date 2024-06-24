document.addEventListener('DOMContentLoaded', () => {
  let registrForm = document.querySelector('.form');

  // Create two local storages
  let userDataStorage = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];
  let currentUserDataStorage = localStorage.getItem('currentUserData') ? JSON.parse(localStorage.getItem('currentUserData')) : [];

  registrForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let phoneInput = document.querySelector('.form_phone');
    let passwordInput = document.querySelector('.form_password');

    let phoneNumber = phoneInput.value;
    let password = passwordInput.value;

    // Check if phone number length is 10 digits
    if (phoneNumber.length !== 10) {
      alert('Номер телефона должен состоять из 10 цифр!');
      return;
    }

    // Check for existing user in local storage
    let existingUser = userDataStorage.find((user) => user.number === phoneNumber);
    if (existingUser) {
      alert('Такой номер телефона уже зарегистрирован!');
      return;
    }

    let user = {
      number: phoneNumber,
      password: password
    };

    // Add user to local storage
    userDataStorage.push(user);
    localStorage.setItem('userData', JSON.stringify(userDataStorage));

    // Add current user to local storage
    currentUserDataStorage.push(user);
    localStorage.setItem('currentUserData', JSON.stringify(currentUserDataStorage));

    // Clear form fields
    phoneInput.value = '';
    passwordInput.value = '';

    // Redirect to profile page
    window.location.href = '/profile/index.html';
  });
});