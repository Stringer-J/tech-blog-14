const commentButton = document.querySelectorAll('.commentButton');
const formBox3 = document.getElementById('formBox3');
const overlay3 = document.getElementById('overlay3');
const commentInput = document.getElementById('comment');
const comSubmit = document.getElementById('comSubmit');

commentButton.forEach(button => {
    button.addEventListener('click', function() {
        const isHidden = formBox3.classList.contains('hidden');
        formBox3.classList.toggle('hidden', !isHidden);
        overlay3.classList.toggle('hidden', !isHidden);
    });
});

overlay3.addEventListener('click', () => {
    formBox3.classList.add('hidden');
    overlay3.classList.add('hidden');
});