const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")

if(cookieValue){
    window.location.href  = "/profile"
}

document.getElementById("login").addEventListener("click", e => {
    const username = $("#username").val()
    const password = $("#password").val()

    fetch("http://localhost:3000/users/"+username)
    .then(res => res.json())
    .then(data => {
        if(data.password == password){
            document.cookie = `username = ${data.email}`
            window.location.href = "/profile"
        }else{
            alert("username atau password salah")
        }
    })

})