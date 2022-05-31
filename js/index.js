var elList = findElement('.js-todos-list')

var elInput = findElement('.js-input')
var localData = localStorage.getItem('todos')
var todos = localData ? JSON.parse(localData) : []





function createTodo(todo) {

   var elLi = createTag('li')
   var elChecboxInput = createTag('input')
   var elText = createTag('p')
   var elDiv = createTag('div')
   var elEditBtn = createTag('button')
   elEditBtn.dataset.id = todo.id
   var elDeleteBtn = createTag('button')
   elDeleteBtn.dataset.id = todo.id


   elDeleteBtn.addEventListener('click', handleDeleteTodo)


   elLi.className = 'd-flex align-items-center py-2 px-3 border-bottom'
   elChecboxInput.type = 'checkbox'
   elChecboxInput.className = 'form-check-input mt-0'
   elText.className = 'p-0 m-0 ms-2 '
   elDiv.className = 'ms-auto'
   elEditBtn.className = 'btn  btn-success edit'
   elDeleteBtn.className = 'btn btn-danger delete'

   elText.textContent = todo.title
   elDeleteBtn.textContent = 'Delete'
   elEditBtn.textContent = 'Edit'


   elDiv.appendChild(elEditBtn)
   elDiv.appendChild(elDeleteBtn)
   elLi.appendChild(elChecboxInput)
   elLi.appendChild(elText)
   elLi.appendChild(elDiv)
   elList.appendChild(elLi)
}

function renderElements(array) {
   elList.innerHTML = null
   for (var i = 0; i < array.length; i++) {
      createTodo(array[i])
   }

}


function handleAddTodo(evt) {
   if (evt.keyCode === 13) {
      var newTodo = {
         id: uuid.v4(),
         title: elInput.value,
         isComplated: false
      }
      todos.push(newTodo)
      localStorage.setItem('todos', JSON.stringify(todos))

      renderElements(todos)
      elInput.value = null
      console.log(todos)
   }
}

let handleDeleteTodo = (evt) => {
   let filtredArr = []
   for (let i = 0; i < todos.length; i++) {
      if (todos[i].id !== evt.target.dataset.id) {
         filtredArr.push(todos[i]);
      }
   }
   todos = filtredArr
   localStorage.setItem('todos', JSON.stringify(filtredArr))
   renderElements(filtredArr)
}

let handleEditTodo = (evt) => {
   let foundTodoIndex = todos.findIndex((element) => element.id === evt.target.dataset.id)

   let editText = prompt("O'zgartiring", todos[foundTodoIndex].title)
   todos[foundTodoIndex].title = editText
   renderElements(todos)
   console.log(todos[foundTodoIndex].title)
   console.log(editText);
}

elInput.addEventListener('keyup', handleAddTodo)
elList.addEventListener('click', (evt) => {
   if (evt.target.matches('.delete')) return handleAddTodo(evt)

   if (evt.target.matches('.edit')) return handleEditTodo(evt)
})

renderElements(todos)