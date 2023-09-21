// login
const loginButton = document.getElementById('login')
const loginForm = document.getElementById('form-login')

window.onload = function(){
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault()
        
        if(localStorage.getItem != null){
            localStorage.removeItem("access_token")
        }
        
        let xhr = new XMLHttpRequest();
        let url = "http://127.0.0.1:5000/api/auth/login";

        let loginUsername = document.getElementById('loginUsername').value
        let loginPassword = document.getElementById('loginPassword').value
        
        console.log(loginUsername)

        
        let data = JSON.stringify({
            username: loginUsername,
            password: loginPassword
          });
          

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('refresh_token')}`);
        xhr.onreadystatechange = function() {
            if(this.status ==200){
                let data = JSON.parse(this.response)
                console.log(JSON.stringify(data))
                localStorage.setItem("access_token", data.access_token)
                window.location.href = 'http://127.0.0.1:5000/'
            }else{
                if (this.readyState == 2){
                    alert("Username or password is incorrect")
                    location.reload()
                }
            }
        }; xhr.send(data);
    })
    
}