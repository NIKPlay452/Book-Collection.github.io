document.addEventListener('DOMContentLoaded', () => {
    let profileLink = document.querySelector('.left_link');
    profileLink.addEventListener('click', (e) => {
      let currentUserDataStorage = localStorage.getItem('currentUserData');
      if (!currentUserDataStorage) {
        e.preventDefault();
        window.location.href = 'https://nikplay452.github.io/Book-Collection.github.io/registration/index.html';
      }
      console.log(currentUserDataStorage);
    });
  });