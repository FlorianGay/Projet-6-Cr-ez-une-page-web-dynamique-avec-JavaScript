fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
    },
    body : JSON.stringify({
        email: email.value,
        password: password.value,
    }),
})
    .then((response) => response.json())