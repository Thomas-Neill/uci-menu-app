async function getPeer() {
    
}



async function verify(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username',document.getElementById('si_username').value)
    formData.append('password',document.getElementById('si_password').value)

    // "Cross-Origin Resource Sharing (CORS)"
    await fetch("http://localhost:5000/verify", {
        method: 'POST',
        body: formData 
    }).then(response => response.text())
    .then(data => {
        if (data === "200") {
            alert("success");
            document.getElementById('si_username').value = "";
            document.getElementById('si_password').value = "";

        } else {
            alert("try again")
        }
    });
}

async function signup(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username',document.getElementById('su_username').value)
    formData.append('password',document.getElementById('su_password').value)

    // "Cross-Origin Resource Sharing (CORS)"
    await fetch("http://localhost:5000/signup", {
        method: 'POST',
        body: formData
    }).then(response => response.text())
    .then(data => {
        if (data === "200") {
            document.getElementById('su_username').value = "";
            document.getElementById('su_password').value = "";

            alert("success");
        } else {
            alert("try again")
        }
    });
}