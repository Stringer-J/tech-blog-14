const emailRes = document.getElementById("textInput");
const passRes = document.getElementById("textInput2");
const signupButton = document.getElementById("signSubmit");

function collect() {

    const eValue = emailRes.value;
    const pValue = passRes.value;

    if (eValue.trim() !== "" && pValue.trim() !== "") {
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name: eValue, pass: pValue}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User created') {
                console.log('Success:', data);
                emailRes.value = "";
                passRes.value = "";
                alert('Sign Up Successful');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 100);
            } else {
                console.error('Signup failed:', data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert("Fill out all fields");
    }
}

signupButton.addEventListener('click', collect);