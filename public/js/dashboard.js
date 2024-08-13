document.addEventListener('DOMContentLoaded', () => {
    const newButton = document.getElementById('newBlog');
    const formBox = document.getElementById('formBox');
    const overlay = document.getElementById('overlay');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const newSubmit = document.getElementById('newSubmit');
    const updateButton = document.querySelectorAll('.updateButton');
    const formBox2 = document.getElementById('formBox2');
    const overlay2 = document.getElementById('overlay2');
    const titleInput2 = document.getElementById('title2');
    const contentInput2 = document.getElementById('content2');
    const newSubmit2 = document.getElementById('newSubmit2');
    const deleteButton = document.querySelectorAll('.deleteButton');

    let userName = '';
    let currentBlog = null;

    function handleSubmit() {
            console.log('handle submit called');

            const tValue = titleInput.value;
            const cValue = contentInput.value;

            console.log('Submitting with userName:', userName);
    
            if (tValue.trim() !== "" && cValue.trim() !== "") {
                fetch('/api/postBlog', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: tValue,
                        posted: userName,
                        content: cValue
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Response:', data);
                    if (data.message === 'Blog Created') {
                        console.log('Success', data);
                        alert('Blog Created');
                        setTimeout(() => {
                            titleInput.value = '';
                            contentInput.value = '';
                            formBox.classList.add('hidden');
                            overlay.classList.add('hidden');
                        }, 100);
                    } else {
                        console.error('Blog Creation failed:', data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
            } else {
                alert('Please fill out all fields');
            }
    }

    function handleUpdate() {

            const uTitle = titleInput2.value;
            const uContent = contentInput2.value;

            if(uTitle.trim() !== '' && uContent.trim() !== '') {
                if(currentBlog === null) {
                    console.error('No blog ID');
                    alert('No Blog ID');
                    return;
                }

                fetch(`/api/updateBlog/${currentBlog}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: uTitle,
                        content: uContent
                    }),
                })
                .then(response => response.json())
                .then(data => {
                console.log('Response:', data);
                if (data.message === 'Blog Updated') {
                    console.log('Success', data);
                    alert('Blog Updated');
                    setTimeout(() => {
                        titleInput2.value = '';
                        contentInput2.value = '';
                        formBox2.classList.add('hidden');
                        overlay2.classList.add('hidden');
                        location.reload(true);
                    }, 100);
                } else {
                    console.error('Blog Update failed:', data.message);
                }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
            } else {
                alert('Please fill out all fields');
            }
    }
    

    function fetchUser() {
        return fetch('/api/getUser')
        .then(response => {
            if (!response.ok) {
                throw new Error('Response failed:' + response.status);
            }           
            return response.json();
        })
        .then(data => {
            console.log(data);
            userName = data.user_name;
            console.log('this worked');
        })
        .catch(error => {
            console.error('Error getting user:', error);
        });
    }

    fetchUser().then(() => {
        newButton.addEventListener('click', () => {
            const isHidden = formBox.classList.contains('hidden');
            formBox.classList.toggle('hidden', !isHidden);
            overlay.classList.toggle('hidden', !isHidden);
        });

        updateButton.forEach(button => {
            button.addEventListener('click', function() {
                // alert('Update Button Clicked');
                const blogPost = this.closest('.blog-post');
                const content = blogPost.querySelector('p').textContent;
                const blogId = this.getAttribute('data-id');

                currentBlog = this.getAttribute('data-id');

                console.log('Blog ID:', blogId);
                console.log('Blog Content:', content);

                const isHidden = formBox2.classList.contains('hidden');
                formBox2.classList.toggle('hidden', !isHidden);
                overlay2.classList.toggle('hidden', !isHidden);
            });
        });
    
        overlay.addEventListener('click', () => {
            formBox.classList.add('hidden');
            overlay.classList.add('hidden');
        });

        overlay2.addEventListener('click', () => {
            formBox2.classList.add('hidden');
            overlay2.classList.add('hidden');
        });
    
        newSubmit.addEventListener('click', () => {
            // console.log('Submit button clicked');
            if (userName) {
                handleSubmit();
            } else {
                console.error('User not found');
            }
        });

        newSubmit2.addEventListener('click', (event) => {
            event.preventDefault();
            if (currentBlog) {
                handleUpdate();
            } else {
                console.error('Blog not found');
            }
        });

        deleteButton.forEach(button => {
            button.addEventListener('click', () => {
                confirm('Delete Post?');
            });
        });
    });
});