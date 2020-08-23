const todoForm = document.querySelector(".todoForm");

const todoInput = document.querySelector(".add-input");

const todoItems = document.querySelector(".todoItem");

let todos = [];


todoForm.addEventListener('submit',(event)=>
{
    event.preventDefault();
    addTodo(todoInput.value);
});

const addTodo=(item)=>
{
    if(item !== '')
    {
        const todo={
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
       addToLocalStorage(todos);

        todoInput.value='';
    }
}

const renderTodos=(todos)=>
{
    todoItems.innerHTML = '';

    todos.forEach((item)=>
    {
        const checked = item.completed ? 'checked': null;

        const li= document.createElement('li');
        li.setAttribute('class','item');
        li.setAttribute('data-key',item.id);

        if(item.completed === true)
        {
            li.classList.add('checked');
        }

        li.innerHTML =  `<input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
      `;
      todoItems.append(li);
    });
}

const addToLocalStorage=(todos)=>
{
    localStorage.setItem('todos',JSON.stringify(todos));
    renderTodos(todos);
}

const getFromLocalStorage=()=>
{
    const reference = localStorage.getItem('todos');

    if(reference)
    {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }

}
const toggle=(id)=>
{
    todos.forEach((item)=>
    {
        if(item.id == id)
        {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}
const deleteTodo=(id)=>
{
    todos = todos.filter((item)=>
    {
        return item.id != id;
    });
    addToLocalStorage(todos);
};
getFromLocalStorage();

todoItems.addEventListener('click',(event)=>
{
    if(event.target.type === 'checkbox')
    {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if(event.target.classList.contains('delete-button'))
    {
        deleteTodo(event.target.parentElement.getAttribute('data-key'))
    }
});