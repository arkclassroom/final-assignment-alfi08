const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")

if(cookieValue){
    fetch("http://localhost:3000/users/"+cookieValue)
    .then(res => res.json())
    .then(data => {
        document.getElementById("pesan").innerHTML = `Hai ${data.email}, Selamat Datang!`

        const el = document.getElementById("log")
        el.innerHTML ="logout"
        el.setAttribute("href","#")
        el.addEventListener("click", () => {
            document.cookie = "username = ; expires=Thu, 01 Jan 1970 00:00:00 GMT"
            window.location.href = "/login"
    })
})}else{
    window.location.href = "/login"
}