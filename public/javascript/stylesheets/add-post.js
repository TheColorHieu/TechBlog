//here we are adding the logic for adding the post 
async function addPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
    //here we are adding a conditional statement to check if the title and content are not empty
    const response = await fetch('/api/posts',{
        method: 'post',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok){
        document.location.replace('/dashboard');
    }else{
        alert(response.statusText);
    }
};
document.querySelector('#add-post-form').addEventListener('submit',addPostHandler);