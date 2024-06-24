document.addEventListener('DOMContentLoaded', () => {
  let currentUserDataStorage = localStorage.getItem('currentUserData')? JSON.parse(localStorage.getItem('currentUserData')) : [];
  let userDataStorage = localStorage.getItem('userData')? JSON.parse(localStorage.getItem('userData')) : [];
  let allusersStorage = localStorage.getItem('allusers')? JSON.parse(localStorage.getItem('allusers')) : [];
  let resetPwForm = document.querySelector('.reset_pw_form');
  let newPasswordInput = document.querySelector('#new_password');
  let verifyPasswordInput = document.querySelector('#verify_password');
  let resetPwButton = document.querySelector('.reset_pw_button');
  let phoneNumberElement = document.querySelector('.reset_pw_number');

  phoneNumberElement.textContent =  `${currentUserDataStorage[0].number}`;

  console.log(currentUserDataStorage);

  // Move the event listener code inside the DOMContentLoaded block
  resetPwButton.addEventListener('click', (e) => {
    e.preventDefault();

    let phoneNumber = currentUserDataStorage[0].number;
    let oldPassword = currentUserDataStorage[0].password;
    let newPassword = newPasswordInput.value;
    let verifyPassword = verifyPasswordInput.value;

    if (newPassword!== verifyPassword) {
      alert('Новый пароль и подтверждение пароля не совпадают!');
      return;
    }

    if (newPassword === oldPassword) {
      alert('Новый пароль не может быть таким же, как старый пароль!');
      return;
    }

    let userDataIndex = userDataStorage.findIndex((user) => user.number === phoneNumber);
    let allusersIndex = allusersStorage.findIndex((user) => user.number === phoneNumber);

    if (userDataIndex!== -1) {
      userDataStorage[userDataIndex].password = newPassword;
      localStorage.setItem('userData', JSON.stringify(userDataStorage));
    }

    if (allusersIndex!== -1) {
      allusersStorage[allusersIndex].password = newPassword;
      localStorage.setItem('allusers', JSON.stringify(allusersStorage));
    }

    // Update currentUserDataStorage with the new password
    currentUserDataStorage[0].password = newPassword;
    localStorage.setItem('currentUserData', JSON.stringify(currentUserDataStorage));

    alert('Пароль успешно изменен!');
    newPasswordInput.value = '';
    verifyPasswordInput.value = '';
    console.log(currentUserDataStorage);
  });
});