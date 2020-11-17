function deleteMatch() {
    let btn = document.getElementById('deleteBtn')
    let id = btn.getAttribute('data-id')

    axios.delete('/matches/delete/' + id)
        .then((res) => {
            console.log(res.data)
            alert('Match was deleted')
            window.location.href = '/matches'
        })

    .catch((err) => {

        console.log(err)
    })

}

var search_input = document.querySelector("#search_input");

search_input.addEventListener("keyup", function(e) {
    var span_items = document.querySelectorAll(".table_body ul li .homeTeam span");
    var search_item = e.target.value.toLowerCase();

    span_items.forEach(function(item) {
        if (item.textContent.toLowerCase().indexOf(search_item) != -1) {
            item.closest("li").style.display = "block"
        } else {
            item.closest("li").style.display = "none";
        }
    })
});