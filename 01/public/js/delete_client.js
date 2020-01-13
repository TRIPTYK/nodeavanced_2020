function deleteClient (e) {
    console.log(e.dataset.id)
    let id = e.dataset.id;
    fetch(`http://localhost:8010/clients/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    }).then((response) => {
        window.location.replace("http://localhost:8010/clients");
    })
}