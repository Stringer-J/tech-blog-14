const newButton = document.getElementById('newBlog');
const formBox = document.getElementById('formBox');

newButton.addEventListener('click', () => {
    // alert('Click Worked');
    if (formBox.classList.contains('hidden')) {
        formBox.classList.remove('hidden');
    } else {
        formBox.classList.add('hidden');
    }
});