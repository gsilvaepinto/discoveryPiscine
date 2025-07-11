const button = document.querySelector('button');
button.addEventListener('click', createTask);

function createTask(){
    const text = prompt('Enter task:');
    if (text && text.trim()){
        addTask(text.trim());
        save();
    }
}

function addTask(text){
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.textContent = text;
    div.onclick = () => {
        if (confirm('Remove this task?')){
            div.remove();
            save();
        }
    };

    const main_container = document.querySelector('#ft_list');
    main_container.insertBefore(div, main_container.firstChild);
}

function save(){
    const tasks = Array.from(document.querySelectorAll('.todo-item')).map(div => div.textContent);
    document.cookie = `tasks=${JSON.stringify(tasks)}`;
}

function load(){
    const match = document.cookie.match(/tasks=([^;]+)/);
    if (match){
        try {
            JSON.parse(match[1]).forEach(addTask);
        } catch (e){}
    }
}

load();