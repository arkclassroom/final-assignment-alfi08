// $("#login").on("click", e =>{
//     const username = $("#username").val()
//     const password = $("#password").val()

//     const data = JSON.stringify({email : username})
    
//     fetch("http://localhost:3000/users",{
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body: data

//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })

// })

document.getElementById("login").addEventListener("click", e => {
    const username = $("#username").val()
    const password = $("#password").val()
    
    const data = JSON.stringify({email : username})

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