async function signupFormHandler(event) {
    event.preventDefault();
    //here we are getting the values from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    
    if(username && password){
        const response = await fetch('/api/users',{
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        //here we are adding a conditional statement to check if the response is ok
        if(response.ok){
            console.log('Signup success');
        loginFormHandler()
            document.location.replace('/login');
        }else{
            const errorMessage = await response.json();
            alert(response.statusText);
        }
    }
}
document.querySelector('#signup-form').addEventListener('submit',signupFormHandler);
