let form = document.getElementById('editForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let sendJson = {
        firstname: this.firstname.value,
        lastname: this.lastname.value
    }
    let id = this.id.value;
    fetch(`http://localhost:8010/clients/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(sendJson)
    }).then((response) => {
        console.log("hello")
        window.location.replace("http://localhost:8010/clients");
    })
})