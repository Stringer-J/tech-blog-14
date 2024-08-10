document.addEventListener('DOMContentLoaded', () => {
    const newButton = document.getElementById('newBlog');
    const formBox = document.getElementById('formBox');
    const overlay = document.getElementById('overlay');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const newSubmit = document.getElementById('newSubmit');

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
        const tValue = titleInput.value;
        const cValue = contentInput.value;
        const user_name = sessionStorage.getItem('user_name');

        if (tValue.trim() !== "" && cValue.trim() !== "") {
            fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: tValue,
                    posted: user_name,
                    content: cValue
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Blog created') {
                    console.log('Success', data);
                    alert('Blog Created');
                    setTimeout(() => {

                    }, 100);
                } else {
                    console.error('Blog Creation failed:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        }
    })

});