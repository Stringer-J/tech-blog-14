const commentButton = document.querySelectorAll('.commentButton');

// function isLoggedInForComment (req, res, next) {
//     if (req.session.user) {
//         return next();
//     }
//     console.log('Comments Allowed');
// }

commentButton.forEach(button => {
    button.addEventListener('click', function() {
        // isLoggedInForComment();
        alert('button clicked my friend');
    });
});