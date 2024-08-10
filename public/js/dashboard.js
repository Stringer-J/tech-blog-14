document.addEventListener('DOMContentLoaded', () => {
    const newButton = document.getElementById('newBlog');
    const formBox = document.getElementById('formBox');
    const overlay = document.getElementById('overlay');

    newButton.addEventListener('click', () => {
        const isHidden = formBox.classList.contains('hidden');
        formBox.classList.toggle('hidden', !isHidden);
        overlay.classList.toggle('hidden', !isHidden);
    });

    overlay.addEventListener('click', () => {
        formBox.classList.add('hidden');
        overlay.classList.add('hidden');
    });
});