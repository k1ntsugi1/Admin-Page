# test-task
👋 Данный проект реализован в рамках аттестационного задания.

[**Versel**](https://test-task-obpwgghqe-k1ntsugi1.vercel.app) - деплой проекта

[**Мой Telegram**](https://t.me/bmasalimov) 

## ТЗ: 

Используя API https://jsonplaceholder.typicode.com/guide/, необходимо сделать админскую панель для просмотра сущностей в этом API. Обязательный минимальный стек - React, react-router v6, redux, axios (библиотеки любые, redux-toolkit, redux-act, нативно…)

### Сущностей несколько:
  1.	Посты, к ним идут комментарии
  2.	Альбомы, к ним идут фотографии
  3.	Todos
  
### Необходимо сделать панель, где будет три вкладки:

  1.	Просмотр постов, с комментариями. Необходимо сделать древовидную структуру просмотра (как на любом форуме, пикабу, реддит и тд)
  2.	Просмотр альбомов, каждый альбом - это слайдер, слайды - фотки прикрепленные к альбому
  3.	Todos, там всего два состояния, сделать доску с двумя статусами (по completed) реализовать drug n drop по переносу с одной колонки в другую

### Дополнительно:
  - использовал typescript
  - настроил webpack (не использовал create-react-app 🗿)
  - реализовал создание/удаление/обновление постов (и комментариев к ним), альбомов (и фотографий к ним), задач
  - создание сущности на урле /create, редактирование на /edit

### В ходе выполнения задания:
  - не реализовал древовидную структуру, так как API не предоставляет данных для этого
  - dnd реализовал с помощью библиотеки react-dnd-beautiful

### Итоговый стек:
  - webpack
  - typescript
  - React
  - react-router-dom v6
  - Redux/@toolkit
  - bootstrap/react-bootstrap
  - formik
  - scss
  - axios


tasks: 
  - HOT of webpack doesnt work (decrease version of webpack)
  - Добавить обработчик ошибок для тасок
  - ~~добавить перенавигацию полсе создания новго поста~~
  - исправить ошибки модалки
  - ~~создавать ли стейт юзеров?~~
  - загрузка данных о постах альбомах при ссылка альбома поста -> альбомы посты , а то там по одному из них (((((
  - редактирование фото + его удаление
  - ~~редактирование/создание комментария~~
