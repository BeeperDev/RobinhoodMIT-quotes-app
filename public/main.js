const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {         // trigger a PUT request
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Prince John',
            quote: '"I have a MOLE?"'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)            //reloads page after button is clicked
    })
})

deleteButton.addEventListener('click', _ => {     //trigger a DELETE request
    fetch('/quotes', {                      //'/quotes' is a route for the app.delete
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Prince John'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'No Prince John quote to delete'
        } else {
            window.location.reload(true)                     //reloads page after button is clicked
        }
    })
})