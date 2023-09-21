// Add Project

let addProject = document.getElementById('add-project')

addProject.addEventListener("submit", function(e) {
    
    e.preventDefault();
    let projectName = document.getElementById('project_name').value
    
    let xhr = new XMLHttpRequest()
    let url = "http://127.0.0.1:5000/api/projects"

    if (projectName == ""){
        alert('Name of project must be filled')
    }

    let new_project = JSON.stringify({
        project_name : projectName
    })
        
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );

    xhr.onreadystatechange = function(){

        if (this.status == 200){
            console.log(this.status)
            //close the modal after adding data
            let ModalProject = bootstrap.Modal.getInstance("#ModalProject");
            ModalProject.hide();
    
            //reset form
            addProject.reset();
            //refresh page
            location.reload()
            
        }else{
            alert("Kosong")
            localStorage.removeItem("access_token")
            window.location.href = "../login"
        }
    };
    xhr.send(new_project)
})


// function show projects
function allProject(){
        
        let xhr = new XMLHttpRequest()
        let url = "http://127.0.0.1:5000/api/projects"
    
        xhr.open("GET", url, true)
        xhr.setRequestHeader(
            "Authorization",
            `Bearer ${localStorage.getItem("access_token")}`
        );
        xhr.onreadystatechange = function(){
            if(this.readyState== 4 && this.status == 200){

                let getData = JSON.parse(this.response)
                
                getData["data"].forEach((project) =>{
                    let projectMenu = document.getElementById("project_menu")

                    let listProject = document.createElement("option")
                    listProject.setAttribute("id", project.id_project)
                    listProject.value = project.id_project
                    listProject.innerHTML = project.id_project + " - " + project.project_name
                    

                    projectMenu.appendChild(listProject)

                    
                    

                    projectMenu.appendChild(listProject)
                    
                    let chooseProject = document.getElementById("choose_project")
                    let optionProject = document.createElement("option")
                    optionProject.setAttribute("id",project.id_project)
                    optionProject.innerHTML = project.project_name
                    optionProject.value = project.id_project

                    chooseProject.appendChild(optionProject)
                    
                    
                }) 
            } 
        }
        xhr.send()
}


function checkStatus(id) {
    let xhr = new XMLHttpRequest()
    let url = "http://127.0.0.1:5000/api/views/" + id

    xhr.open("GET", url, true);
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            console.log(response.data.status)
            //update status tasks
            updateStatus(id, response.data.status)
        }
    };
    return xhr.send();
}



// edit task section
function editTask(id_task, newTitle, new_task){
    
    let xhr = new XMLHttpRequest()
    let url = "http://127.0.0.1:5000/api/views/" + id_task

    let edit_task = JSON.stringify({
        title_task : newTitle,
        desc_task: new_task

    })
    console.log(edit_task)
    xhr.open("PUT", url, true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );
    xhr.onreadystatechange = function() {
        if(this.status == 200){

            console.log("Berhasil")
        }
        else{
            console.log("You Failed")
        }
    }
    xhr.send(edit_task)
}


// Add Task

let addForm = document.getElementById('add-form')

addForm.addEventListener("submit", function(e) {

    e.preventDefault();
    
    let titleTodo = document.getElementById('title_task').value
    let descTodo = document.getElementById('desc_task').value
    let projectTodo = document.getElementById('choose_project').value

    console.log(projectTodo)
    
    let xhr = new XMLHttpRequest()
    let url = "http://127.0.0.1:5000/api/views"

    if (titleTodo == ""){
        alert('Title of Task must be filled')
    }

    if (descTodo == ""){
        alert('Desc of Todo must be filled')
    }

    let new_task = JSON.stringify({
        title_task:titleTodo,
        desc_task: descTodo,
        project_id: projectTodo
    })
        

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );

    xhr.onreadystatechange = function(){
        if (this.status == 200) {
            //close the modal after adding data
            let ModalAdd = bootstrap.Modal.getInstance("#ModalAdd");
            ModalAdd.hide();

            //reset form
            addForm.reset();
            //refresh page
            location.reload();
        }
        else{
            localStorage.removeItem("access_token")
            window.location.href = "../login"
        }
    };
    xhr.send(new_task)
})


// MENAMPILKAN TASKS
let taskList = document.getElementById("task-list")
let taskDone = document.getElementById("task-done")


window.onload = function(){
    allProject()
    
    if (
        (localStorage.getItem("access_token") &&
            localStorage.getItem("access_token")) == null
    ) {
        window.location.href = "http://127.0.0.1:5000/login"; //
    }


    let xhr = new XMLHttpRequest()
    let url = "http://127.0.0.1:5000/api/views/"


    xhr.open("GET", url, true);
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
        
    );
    
    let projectList = document.getElementById("project_menu")
    
    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            
            let getData = JSON.parse(this.response)
            
            getData["data"].forEach( (task) =>{

                let getTodo = document.createElement("div")
                getTodo.classList.add("todo-list")
                
                //penampung nilai judul
                let todoJudul = document.createElement("input")
                todoJudul.classList.add("judul")
                todoJudul.type = "text"
                todoJudul.setAttribute("readonly","readonly")
                todoJudul.value = task.title_task
                todoJudul.setAttribute("id", task.id_task)
                todoJudul.setAttribute("data-title",task.title_task)
                
                
                //penampung nilai keterangan
                
                let todoKet = document.createElement("textarea")
                todoKet.classList.add("desc")
                todoKet.type = "text"
                todoKet.setAttribute("readonly","readonly")
                todoKet.value = task.desc_task
                // todoKet.appendChild(document.createTextNode(task.desc_task))
                todoKet.setAttribute("data-desc",task.desc_task)

                //penampung nilai project

                let todoProj = document.createElement("label")
                todoProj.setAttribute("readonly","readonly")
                todoProj.value = task.project_id
                // todoProj.appendChild(document.createTextNode(task.project_id))

                
                getTodo.setAttribute("id",task.id_task)
                //end of value user script
                
                // console.log(data[0].task.title)
            
                //Button
                const button = document.createElement("div")
                button.classList.add('action')
                
                //Button-edit
                const editButton = document.createElement('button')
                editButton.setAttribute('class','btn btn-primary')
                editButton.innerText = "Edit"
                
                //Button-delete
                const deleteButton = document.createElement('button')
                deleteButton.setAttribute('class','btn btn-primary')
                deleteButton.setAttribute("data-id",task.id_task)
                // deleteButton.setAttribute('onClick','deleteTask')
                deleteButton.innerText = "Delete"
                
                //Button-done
                const doneButton = document.createElement('button')
                doneButton.setAttribute('class','btn btn-primary')
                doneButton.setAttribute("data-id",task.id_task)
                doneButton.setAttribute("data-title",task.title)
                doneButton.setAttribute("data-desc",task.desc)
                doneButton.setAttribute("data-status", task.status_task)
                doneButton.innerHTML = "Done"
                
                button.append(editButton, deleteButton, doneButton)
                //end of button scripts
                
                // penampung todo done
                const todoDone = document.createElement('div')
                todoDone.classList.add('todo-list')
                todoDone.setAttribute("id",task.id_task)
                
                const filterButton = document.getElementById("filter_button")
                filterButton.addEventListener("click", ()=>{

                    if(projectList.value == task.project_id){
                        
                        if(task.status_task == true){
                            
                            todoDone.append(todoJudul, todoKet, todoProj, deleteButton)
                            taskDone.replaceChild(todoDone, taskDone.firstChild)
                            taskList.replaceChild(getTodo, taskList.firstChild)
                            
                        }else{
                            getTodo.appendChild(todoJudul)
                            getTodo.appendChild(todoKet)
                            getTodo.appendChild(todoProj)
                            getTodo.appendChild(button)
                            taskList.replaceChild(getTodo, taskList.firstChild)
                            taskDone.replaceChild(todoDone, taskDone.firstChild)
                        }
                    }
                })


                doneButton.addEventListener('click', ()=>{
                    updateStatus(task.id_task, task.status)
                })

                deleteButton.addEventListener('click', ()=> {
                    deleteTask(task.id_task)
                })

                editButton.addEventListener('click', ()=>{
                    if (editButton.innerText == 'Edit'){
                        todoJudul.removeAttribute("readonly")
                        todoKet.removeAttribute("readonly")
                        todoKet.focus()
                        editButton.innerText = "Save"
                        
                    }else{
                        const newTitle = todoJudul.value
                        const newDesc = todoKet.value
                        
                        editTask(task.id_task, newTitle, newDesc)
                        todoJudul.setAttribute("readonly","readonly")
                        todoKet.setAttribute("readonly", "readonly")
                        editButton.innerText = "Edit"
                    }   
                })
            })
        }
    }; 
    xhr.send();
}


//fungsi untuk update status task
function updateStatus(id_task, status) {
    let xhr = new XMLHttpRequest()
    let url = "http://127.0.0.1:5000/api/views/status/" + id_task

    let statusData = JSON.stringify({
        status: !status
    })
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)

            location.reload()
        }
    };
    return xhr.send(statusData);
}

function deleteTask(taskId){
    if (localStorage != null){
        fetch('../api/views/delete-note',{
            method: 'POST',
            body: JSON.stringify({taskId : taskId})
        }).then((_res) => {
            location.reload()
        })
    }else{
        window.location.href("../login")
    }
}

// logout section
const logout = document.getElementById("logoutButton")
logout.addEventListener("click", function (e) {
    e.preventDefault()
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/auth/logout";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`);
    xhr.onreadystatechange = function () {

        localStorage.removeItem("access_token")
        window.location.href = "../login"

        
    };
    xhr.send();
    
    //remove token from locasStorage
})

//FUNGSI UNTUK MEREFRESH TOKEN
function refreshToken(){
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/auth/refresh";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            localStorage.setItem("access_token", response.access_token)
        }else{
            localStorage.removeItem('access_token')
            window.location.href= "../login"
        }
    };
    xhr.send();
}
// run refresh token every 15 minutes
setInterval(refreshToken, 900000)
//fugnsi untuk jam
let p = document.getElementById("jam");

function myTime() {
    let jam = new Date();
    p.innerHTML = jam.toLocaleTimeString([], {
        hour12: false,
    });
}
setInterval(myTime, 1000);
