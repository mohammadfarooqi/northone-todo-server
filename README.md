# northone-todo-server

This is a Todo API that has features such as adding categories, adding todos, associating todos with categories and sending 5 min reminders before a task is due.

To run app:
- see .envsample and setup .env file in root of folder
- `npm install`
- `npm start` or in dev mode use `npm run dev-start`

Routes:
- Todo Routes:
  `GET: '/todo'`        - all todos
  `GET '/todo/:id'`     - single todo
  `POST '/todo'`        - create todo
  `PUT '/todo/:id'`     - update a todo
  `DELETE '/todo/:id'`  - delete todo

- Category Routes:
  `GET: '/category'`            - all categories
  `GET: '/category/todos'`      - all categories with associated todos  
  `GET: '/category/:id'`        - single category
  `GET: '/category/:id/todos'`  - single category with associated todos
  `POST: '/category'`           - create category
  `PUT: '/category/:id'`        - update a category
  `DELETE: '/category/:id'`     - delete category