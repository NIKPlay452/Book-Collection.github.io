document.addEventListener('DOMContentLoaded', () => {
    let uploadForm = document.querySelector('.upload_form');
    let uploadList = document.querySelector('.upload_list');
    let storage = window.localStorage;
  
    // Загрузка существующих файлов из локального хранилища
    let storedFiles = storage.getItem('files');
    if (storedFiles) {
      let filesArray = JSON.parse(storedFiles);
      for (let i = 0; i < filesArray.length; i++) {
        let file = filesArray[i];
        let li = document.createElement('li');
        li.className = 'upload_li';
        let img = document.createElement('img');
        img.className = 'upload_img';
        img.src = './img/upload_book-img.png';
        img.alt = '';
        let div = document.createElement('div');
        div.className = 'upload_li_descr';
        let p = document.createElement('p');
        p.className = 'upload_p';
        p.textContent = file.name;
        div.appendChild(p);
        li.appendChild(img);
        li.appendChild(div);
        uploadList.appendChild(li);
  
        // добавление слушателя событий к整个 элементу li
        li.addEventListener('click', () => {
          let blob = new Blob([file.data], { type: file.type });
          let url = URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          a.click();
        });
      }
    }
  
    uploadForm.addEventListener('change', (e) => {
      let input = e.target; // получение элемента input, который вызвал событие
      let files = input.files;
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.type!== 'application/pdf') { // если файл не в формате PDF
          alert(`Ошибка: файл ${file.name} не является файлом в формате PDF`);
          continue; // пропустить к следующей итерации
        }
        let reader = new FileReader();
        reader.onload = () => {
          let fileData = reader.result;
          let storedFiles = storage.getItem('files');
          if (storedFiles) {
            let filesArray = JSON.parse(storedFiles);
            filesArray.push({ name: file.name, data: fileData, type: file.type });
            storage.setItem('files', JSON.stringify(filesArray));
          } else {
            storage.setItem('files', JSON.stringify([{ name: file.name, data: fileData, type: file.type }]));
          }
  
          let li = document.createElement('li');
          li.className = 'upload_li';
          let img = document.createElement('img');
          img.className = 'upload_img';
          img.src = './img/upload_book-img.png';
          img.alt = '';
          let div = document.createElement('div');
          div.className = 'upload_li_descr';
          let p = document.createElement('p');
          p.className = 'upload_p';
          p.textContent = file.name;
          div.appendChild(p);
          li.appendChild(img);
          li.appendChild(div);
          uploadList.appendChild(li);
  
          // добавление слушателя событий к整个 элементу li
          li.addEventListener('click', () => {
            let blob = new Blob([fileData], { type: file.type });
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
          });
        };
        reader.readAsArrayBuffer(file);
      }
    });
  })