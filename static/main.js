let query = document.getElementById("query")
let Numquery = document.getElementById("Num")
let result = document.getElementById("result")
let btn = document.getElementById("btn")
let Addbtn = document.getElementById("add")

const copyContent = async (event) => {
  try {
    const phone = event.target.innerHTML;
    await navigator.clipboard.writeText(phone);

    // reset the color of all spans
    const spans = document.getElementsByTagName("span");
    for (let i = 0; i < spans.length; i++) {
      spans[i].style.color = "";
    }

    event.target.style.transition = "0.2s";
    event.target.style.color = "#89b4fa";
    event.target.select();
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const spans = document.getElementsByTagName("span");
for (let i = 0; i < spans.length; i++) {
  spans[i].addEventListener("click", copyContent);
}

async function fetch_results(){
    var q = query.value
    var data = await fetch("/search?q=" + q)
    var res = await data.json()
    result.innerHTML = ""
    for(var i=0; i<Object.keys(res).length; i++){
        result.innerHTML += '<li>'+ res[i]["name"] + ': <span onclick="copyContent(event)">' + res[i]["no"] + '</span></li>'
    }
}

async function add_name(){
    var name = query.value
    var number = Numquery.value
    var out = await fetch("/add?name=" + name + "&number=" + number)
    fetch_results()
}
Addbtn.onclick = add_name
btn.onclick = fetch_results
query.onkeyup = fetch_results
