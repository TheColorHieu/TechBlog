//here we are adding logic to the comment 
async function commentFormHandler(event){
    event.preventDefault();

    const comment_text = document.querySelector('input[name="comment-text"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];
    //here we are adding a conditional statement to check if the comment_text is not empty
    if(comment_text){
        const response = await fetch('/api/comments',{
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {'Content-Type': 'application/json'}
        });
        //here we are adding a conditional statement to check if the response is ok
        if(response.ok){
            document.location.reload();
        }else{
            alert(response.statusText);
            document.querySelector('#comment-form').style.display = 'block';
        }
    }
}
document.querySelector('.comment-form').addEventListener('submit',commentFormHandler);