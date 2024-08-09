const emailRes = document.getElementById('textInput');
const passRes = document.getElementById('textInput2');
const loginButton = document.getElementById('loginSubmit');

function login() {

    const eValue = emailRes.value;
    const pValue = passRes.value;

    if (eValue.trim() !== "" && pValue.trim() !== "") {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: eValue,
                pass: pValue
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server Response:', data);
            if (data.success && data.message === 'Login Successful') {
                console.log('Success:', data);
                emailRes.value = "";
                passRes.value = "";
                alert('Login Successful');
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 100);              
            } else {
                alert('Invalid email or password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred');
        });
    } else {
        alert('Fill out all fields');
    }
}

loginButton.addEventListener('click', login);