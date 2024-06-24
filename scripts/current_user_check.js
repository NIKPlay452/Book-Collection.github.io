document.addEventListener('DOMContentLoaded', () => {
    let profileLink = document.querySelector('.left_link');
    profileLink.addEventListener('click', (e) => {
      let currentUserDataStorage = localStorage.getItem('currentUserData');
      if (!currentUserDataStorage) {
        e.preventDefault();
        window.location.href = '/registration/index.html';
      }
      console.log(currentUserDataStorage);
    });
  });