let query = document.getElementById("query")
let Numquery = document.getElementById("Num")
let result = document.getElementById("result")
let btn = document.getElementById("btn")
let Addbtn = document.getElementById("add")


async function fetch_results(){
    var q = query.value
    var data = await fetch("/search?q=" + q)
    var res = await data.json()
    console.log(res)
    result.innerHTML = ""
    for(var i=0; i<Object.keys(res).length; i++){
        result.innerHTML += "<li>" + res[i]["name"] + ", " + res[i]["no"] + "</li>"
    }
}

async function add_name(){
    var name = query.value
    var number = Numquery.value
    var out = await fetch("/add?name=" + name + "&number=" + number)
    console.log(out)
}
Addbtn.onclick = add_name
btn.onclick = fetch_results
query.onkeyup = fetch_results
