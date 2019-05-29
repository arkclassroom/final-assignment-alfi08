const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")

if(!cookieValue){
    $(".container").html("")
    window.location.href  = "/login"
}

$("#bag_menu").html(`
    <a href="/">home</a>
    <a href="/manage">manage</a>
    <a href="/profile">profile</a>
    `)

const base_url = "http://localhost:3000/items"

// for making table
const showItem = () => {

    let tbody = document.getElementById("kolom_data");
    tbody.innerHTML = "";

    fetch(base_url)
    .then(res => res.json())
    .then(items => {
        // console.log(items)
        items.map(item => {
            let row = tbody.insertRow(); // make row
            row.setAttribute("id", "data_" + item.id); //set attr
    
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            
            if(item.stock == 0){
                cell4.setAttribute("style","background:red")
            }else if(item.stock >= 10){
                cell4.setAttribute("style","background:green")
            }else{
                cell4.setAttribute("style","background:yellow")
            }
            

            cell1.innerHTML = item.productName;
            cell2.innerHTML = item.category;
            cell3.innerHTML = item.price;
            cell4.innerHTML = item.stock;
            cell5.innerHTML = item.createdAt;
            cell6.innerHTML = `
                <a href="#" > <i  id="edit"  data-id="${item.id}" class="fas fa-user-edit"></i></a> &nbsp;&nbsp;
                <a href="#" > <i id="hapus"  data-id=${item.id} class="fas fa-trash" style="color:black"></i> </a> 
            `;

    
        })
    })
}

// get input
const getInput = () => {
    const product = $("#product").val()
    const category = $("#category").val()
    const price = $("#price").val()
    const stock = $("#stock").val()

    return {
        productName : product,
        category : category,
        price : price,
        stock : stock,
        createdAt : "12/03/2019"
    }
}

const clearInput = () => {
    $("#product").val("")
    $("#category").val("")
    $("#price").val("")
    $("#stock").val("")
}

document.addEventListener("click", e =>{
    //add
    if(e.target.id == "tambah"){
        let input = getInput()

        fetch(base_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        .then(res => showItem())

        clearInput()
    }

    //delete
    if(e.target.id == "hapus"){
        const id = e.target.attributes[1].value

        fetch(`${base_url}/${id}`,{
            method:"DELETE"
        })
        .then(res => showItem())
        clearInput()

    }

    if(e.target.id == "edit"){
        const id = e.target.attributes[1].value

        fetch(`${base_url}/${id}`)
        .then(res => res.json())
        .then(items => {
             $("#id").val(items.id)
             $("#product").val(items.productName)
             $("#category").val(items.category)
             $("#price").val(items.price)
             $("#stock").val(items.stock)
        })

        const ubah = document.getElementById('tambah');
        ubah.setAttribute('id','ubah')
    }

    if(e.target.id == "ubah"){
        const id = $("#id").val()
        let input = getInput()
        
        fetch(`${base_url}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        .then(res => showItem())
        clearInput()

    }
})

showItem()
