let input = document.querySelector("input");
let btn = document.querySelector("button");
let form = document.querySelector("form");
let todos = document.querySelector(".todos");

form.addEventListener('click',(e)=>{
    e.preventDefault();
    let val = input.value.trim();
    if(val){
        addTodoElement({
            text:val,
        });
        saveToDoList()
    }
    input.value = '';
})

function addTodoElement(todo){

    let li = document.createElement("li");
    li.innerHTML = `
        <span>${todo.text}</span>
        <i class="fas fa-trash-alt"></i>
    `
    if(todos.status==="completed"){
        li.setAttribute('class',"completed");
    }

    li.addEventListener('click',function(){
        this.classList.toggle("completed");
        saveToDoList(); 
    })

    li.querySelector('i').addEventListener('click',function(){
        this.parentElement.remove();
        saveToDoList();
    })


    todos.appendChild(li);
}

function saveToDoList(){
    let todoList = document.querySelectorAll("li");
    let todoStorage = [];
    todoList.forEach(function(item){
        let text = item.querySelector('span').innerText;
        let status = item.getAttribute('class');
        console.log(status);
        todoStorage.push({
            text,
            status
        })
    })

    localStorage.setItem('todolist',JSON.stringify(todoStorage));
}

function init(){
    let data = JSON.parse(localStorage.getItem('todolist'))
    data.forEach(function(item){
        addTodoElement(item);
    })
}

init();