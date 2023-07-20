//here we are adding logic to delete the post
async function deletePostHandler(event){
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];
    const response = await fetch(`/api/posts/${id}`,{
        method: 'delete',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok){
        document.location.replace('/dashboard');
    }else{
        alert(response.statusText);
    }
}
document.querySelector('.delete-post-btn').addEventListener('click',deletePostHandler);