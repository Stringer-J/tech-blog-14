const emailRes = document.getElementById("textInput");
const passRes = document.getElementById("textInput2");
const signupButton = document.getElementById("signSubmit");

function collect() {
    const signupArray = [];

    const eValue = emailRes.value;
    const pValue = passRes.value;

    if (eValue.trim() !== "" && pValue.trim() !== "") {
        signupArray.push({user_name: eValue, pass: pValue});

        emailRes.value = "";
        passRes.value = "";

        console.log(signupArray);
    } else {
        alert("Fill out all fields");
    }
}

signupButton.addEventListener('click', collect);