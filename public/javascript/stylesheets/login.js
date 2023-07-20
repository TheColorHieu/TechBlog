const { doc } = require("prettier");

//here we are adding logic for the login 
async function loginFormHandler(event){
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    //here we are adding a conditional statement to check if the username and password are not empty
    if(username && password){
        const response = await fetch('/api/users/login',{
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        //here we are adding a conditional statement to check if the response is ok
        if(response.ok){
            document.location.replace('/dashboard');
        }else{
            alert(response.statusText);
        }
    }
}
document.querySelector('.login-form').addEventListener('submit',loginFormHandler);