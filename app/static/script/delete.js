// const deleteButton = document.getElementById('deleteButton')

// deleteButton.addEventListener("clicl", (e)=>{
//     e.preventDefault()
//     fetch('/delete-note',{
//         method: 'POST',
//         body: JSON.stringify({ id_task : taskId})
//     }).then((_res) => {
//         window.location.href = "/home"
//     })

// })

function deleteNote(taskId) {
    fetch("/home/delete-note", {
        method: "POST",
        body: JSON.stringify({ taskId: taskId})
    }).then((_res) => {
        window.location.href ="/home"
    })

}