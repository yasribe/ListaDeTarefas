/* seleção de elementos */
const tarefasForm = document.querySelector("#tarefas-form");
const tarefasInput = document.querySelector("#tarefas-input");
const tarefasList = document.querySelector("#tarefas-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#pesquisa-input");
const eraseBtn = document.querySelector("#del-pesquisa");


let oldInputValue;

// Funções
    const saveTarefa = (text, done = 0, save = 1) => {
    const tarefa = document.createElement('div');
    tarefa.classList.add('tarefas');

    const tarefaTitulo = document.createElement('h3');
    tarefaTitulo.innerText = text;
    tarefa.appendChild(tarefaTitulo);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-tarefa')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    tarefa.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-tarefa');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    tarefa.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-tarefa')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    tarefa.appendChild(deleteBtn);

    tarefasList.appendChild(tarefa);
    tarefasInput.value = '';
    tarefasInput.focus();

    // Utilizando dados da localStorage
  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoLocalStorage({ text, done: 0 });
  }
  tarefasList.appendChild(todo);

  Input.value = "";
};

const toggleForms = () => {
    editForm.classList.toggle('hide')
    tarefasForm.classList.toggle('hide')
    tarefasList.classList.toggle('hide')
}

const updateTarefas = (text) => {
    const todos = document.querySelectorAll('.tarefas')

    todos.forEach((tarefas) => {
        
            let todoTitle = tarefas.querySelector("h3");

            if (todoTitle.innerText === oldInputValue) {
                todoTitle.innerText = text;
                // Utilizando dados da localStorage
                updateTodoLocalStorage(oldInputValue, text);
            }
        });
};

const getSearchedTodos = (pesquisa) => {
    const todos = document.querySelectorAll(".tarefas");
  
    todos.forEach((tarefas) => {
      const todoTitle = tarefas.querySelector("h3").innerText.toLowerCase();
  
      tarefas.style.display = "flex";
  
      console.log(todoTitle);
  
      if (!todoTitle.includes(pesquisa)) {
        tarefas.style.display = "none";
      }
    });
  };
// Eventos
tarefasForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const inputValue = tarefasInput.value

    if(inputValue){
        saveTarefa(inputValue)
    }
})

document.addEventListener('click', (e)=>{
    const targetEl = e.target
    const parentEl = targetEl.closest('div');
    let tarefasTitulo;

    if(parentEl && parentEl.querySelector('h3')){
        tarefasTitulo = parentEl.querySelector('h3').innerText || "";
    }

    if(targetEl.classList.contains('finish-tarefa')){
        parentEl.classList.toggle('prontas')

        updateTodoStatusLocalStorage(tarefasTitulo);
    }


    if(targetEl.classList.contains('remove-tarefa')){
        parentEl.remove();

         // Utilizando dados da localStorage
        removeTodoLocalStorage(tarefasTitulo);
    }
    
    if(targetEl.classList.contains('edit-tarefa')){
        toggleForms()

        editInput.value = tarefasTitulo
        oldInputValue = tarefasTitulo
    }
});

cancelEditBtn.addEventListener('click',(e) =>{
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTarefas(editInputValue);
    }
    toggleForms();
});

    searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;
  
    getSearchedTodos(search);
  });
  
  eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    searchInput.value = "";
  
    searchInput.dispatchEvent(new Event("keyup"));
  });
  
  // Local Storage
  const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
  
    return todos;
  };
  
  const loadTodos = () => {
    const todos = getTodosLocalStorage();
  
    todos.forEach((todo) => {
      saveTodo(todo.text, todo.done, 0);
    });
  };
  
  const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();
  
    todos.push(todo);
  
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoText ? (todo.done = !todo.done) : null
    );
  
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoOldText ? (todo.text = todoNewText) : null
    );
  
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  loadTodos();