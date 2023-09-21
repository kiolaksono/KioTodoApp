const addTaskButton = document.getElementById('NewTaskButton')
const taskList = document.getElementById('task-list')
const taskDone = document.getElementById('task-done')

const titleTodo = document.getElementById('title_task')
const descTodo = document.getElementById('desc_task')


addTaskButton.addEventListener("click", (e) =>{

    e.preventDefault();
    const xhr = new XMLHttpRequest()
    const url = "http://127.0.0.1:5000/api/views"


    //value user
    //penampung value user
    const getTodo = document.createElement("div")
    getTodo.classList.add("todo-list")
    


    //penampung nilai judul
    const todoJudul = document.createElement("input")
    todoJudul.classList.add("judul")
    todoJudul.type = "text"
    todoJudul.setAttribute("readonly","readonly")


    //penampung nilai keterangan

    const todoKet = document.createElement("textarea")
    todoKet.classList.add("desc")
    todoKet.type = "text"
    todoKet.setAttribute("readonly","readonly")

    //end of value user script


    //Button
    const button = document.createElement("div")
    button.classList.add('action')

    //Button-edit
    const editButton = document.createElement('button')
    editButton.setAttribute('class','btn btn-primary')
    editButton.setAttribute('onClick','deleteNote')
    editButton.innerText = "Edit"

    //Button-delete
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class','btn btn-primary')
    deleteButton.innerText = "Delete"

    //Button-done
    const doneButton = document.createElement('button')
    doneButton.setAttribute('class','btn btn-primary')
    doneButton.innerHTML = "Done"

    button.append(editButton, deleteButton, doneButton)
    //end of button scripts
    
    if(titleTodo.value != "" && descTodo.value != ""){
        console.log("Judul Task" + titleTodo.value)
        todoJudul.value = titleTodo.value
        todoKet.value = descTodo.value

        todoJudul.appendChild(document.createTextNode(titleTodo))
        todoKet.appendChild(document.createTextNode(descTodo))

        //passing data
        
        getTodo.appendChild(todoJudul)
        getTodo.appendChild(todoKet)
        getTodo.appendChild(button)
        getTodo.setAttribute("id", "todo-list")
        taskList.appendChild(getTodo)

        alert("Task Saved")
        

        editButton.addEventListener('click', ()=>{
            if (editButton.innerText == 'Edit'){
                todoJudul.removeAttribute("readonly")
                todoKet.removeAttribute("readonly")
                todoKet.focus()
                editButton.innerText = "Save"
            }else{
                todoJudul.setAttribute("readonly","readonly")
                todoKet.setAttribute("readonly", "readonly")
                editButton.innerText = "Edit"
            }   
            
        })
        
        deleteButton.addEventListener('click', ()=>{
            getTodo.parentNode.removeChild(getTodo)
        })

        doneButton.addEventListener('click', ()=>{
            if(doneButton.innerHTML == 'Done'){
                const todoDone = document.createElement('div')
                todoDone.classList.add('todo-list')
                getTodo.parentNode.removeChild(getTodo)
                todoDone.append(todoJudul, todoKet)
                taskDone.append(todoDone)
            }
        })
    }else{
        alert("Tidak boleh kosong")
        return true
    }

})



