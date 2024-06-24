// Получаем хранилище userData
let userDataStorage = localStorage.getItem('userData')? JSON.parse(localStorage.getItem('userData')) : [];

// Получаем хранилище allusers
let allusersStorage = localStorage.getItem('allusers')? JSON.parse(localStorage.getItem('allusers')) : [];

// Копируем данные из userData в allusers
userDataStorage.forEach((user) => {
  // Проверяем, если пользователь еще не существует в allusers
  if (!allusersStorage.find((u) => u.number === user.number)) {
    allusersStorage.push(user);
  }
});

// Заменяем данные в userData данными из allusers
localStorage.setItem('userData', JSON.stringify(allusersStorage));

// Обновляем хранилище allusers
localStorage.setItem('allusers', JSON.stringify(allusersStorage));
console.log(allusersStorage)
console.log(userDataStorage)
localStorage.setItem('userDataStorage', JSON.stringify(allusersStorage));