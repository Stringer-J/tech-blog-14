document.addEventListener('DOMContentLoaded', () => {
const commentButton = document.querySelectorAll('.commentButton');
const formBox3 = document.getElementById('formBox3');
const overlay3 = document.getElementById('overlay3');
const commenterInput = document.getElementById('commenter');
const commentInput = document.getElementById('comment');
const comSubmit = document.getElementById('comSubmit');

let currentBlog = null;

function handleComment() {
    const c1 = commenterInput.value;
    const c2 = commentInput.value;

    if(c1.trim() !== '' && c2.trim() !== '') {
        if(currentBlog === null) {
            console.error('No blog ID');
            alert('No Blog ID');
            return;
        }

    fetch(`/api/addComment/${currentBlog}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commenter: c1,
            comment: c2
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Comment Added') {
            console.log('Success', data);
            alert('Comment Added');
            setTimeout(() => {
                commenterInput.value = '';
                commentInput.value = '';
                formBox3.classList.add('hidden');
                overlay3.classList.add('hidden');
                location.reload(true);
            }, 100);
        } else {
            console.error('Add Comment failed:', data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    } else {
        alert('Please fill out all fields');
    }
}

commentButton.forEach(button => {
    button.addEventListener('click', function() {
        const blogPost = this.closest('.blog-post');
        const content = blogPost.querySelector('p').textContent;
        const blogId = this.getAttribute('data-id');

        console.log('Blog ID:', blogId);
        console.log('Current Blog Content:', content);

        currentBlog = this.getAttribute('data-id');

        const isHidden = formBox3.classList.contains('hidden');
        formBox3.classList.toggle('hidden', !isHidden);
        overlay3.classList.toggle('hidden', !isHidden);
    });
});

comSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentBlog) {
        handleComment();
    } else {
        console.error('Blog not found');
    }
});

overlay3.addEventListener('click', () => {
    formBox3.classList.add('hidden');
    overlay3.classList.add('hidden');
});

});