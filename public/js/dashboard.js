const { response } = require("express");

document.addEventListener('DOMContentLoaded', () => {
    const newButton = document.getElementById('newBlog');
    const formBox = document.getElementById('formBox');
    const overlay = document.getElementById('overlay');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const newSubmit = document.getElementById('newSubmit');
    const updateButton = document.querySelectorAll('.updateButton');
    const deleteButton = document.querySelectorAll('.deleteButton');

    let userName = '';

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
            const tValue = titleInput.value;
            const cValue = contentInput.value;

            if(tValue.trim() !== '' && cValue.trim() !== '') {
                fetch('/api/updateBlog', {
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
                if (data.message === 'Blog Updated') {
                    console.log('Success', data);
                    alert('Blog Updated');
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
    
        overlay.addEventListener('click', () => {
            formBox.classList.add('hidden');
            overlay.classList.add('hidden');
        });
    
        newSubmit.addEventListener('click', () => {
            // console.log('Submit button clicked');
            if (userName) {
                handleSubmit();
            } else {
                console.error('User not found');
            }
        });

        updateButton.forEach(button => {
            button.addEventListener('click', () => {
                // alert('Update Button Clicked');
                const isHidden = formBox.classList.contains('hidden');
                formBox.classList.toggle('hidden', !isHidden);
                overlay.classList.toggle('hidden', !isHidden);
            });
        });

        deleteButton.forEach(button => {
            button.addEventListener('click', () => {
                confirm('Delete Post?');
            });
        });
    });
});