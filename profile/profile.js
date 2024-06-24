document.addEventListener('DOMContentLoaded', () => {
  
  let currentUserDataStorage = localStorage.getItem('currentUserData');
  
  if (currentUserDataStorage) {
    let currentUserData = JSON.parse(currentUserDataStorage);
    let profileNumberElement = document.querySelector('.profile_number');
    profileNumberElement.textContent = currentUserData[0].number;
  } else {
    console.log('No data in local storage');
  }

  let logoutButton = document.querySelector('.profile_link.out');
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUserData');
    console.log('User data removed from local storage');
  });

  let myBooksButton = document.querySelector('.profile_link[href="/my_books/index.html"]');
  myBooksButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentUserDataStorage) {
      let previousUserData = JSON.parse(currentUserDataStorage);
      localStorage.setItem('previousUserData', JSON.stringify(previousUserData));
      console.log('previousUserData stored in local storage');
    } else {
      console.log('No data in local storage to store as previousUserData');
    }
    window.location.href = '/my_books/index.html';
  });
  console.log(currentUserDataStorage)
});