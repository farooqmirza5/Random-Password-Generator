const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "1234567890";
const symbolSet = "~!@#$%^&*_+/";

// selectors
const passBox = document.getElementById("pass-box");
const totalChar = document.getElementById("total-char");
const upperInput = document.getElementById("upper-case");
const lowerInput = document.getElementById("lower-case");
const numberInput = document.getElementById("numbers");
const symbolInput = document.getElementById("symbols");
const strengthDisplay = document.getElementById("password-strength"); // Added strength display element

const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)];
}

// Function to check password strength
function checkPasswordStrength(password) {
    const criteria = [
        { regex: /[A-Z]/, weight: 2 },       // Uppercase letters
        { regex: /[a-z]/, weight: 2 },       // Lowercase letters
        { regex: /\d/, weight: 2 },          // Numbers
        { regex: /[!@#$%^&*()_+]/, weight: 3 } // Special characters
    ];

    let strength = 0;
    for (const criterion of criteria) {
        if (criterion.regex.test(password)) {
            strength += criterion.weight;
        }
    }

    // Additional strength for longer passwords
    if (password.length >= 12) {
        strength += 3;
    }

    return strength;
}

// Function to update the strength display
function updateStrengthDisplay(strength) {
    if (strength >= 10) {
        strengthDisplay.innerText = "Strong";
        strengthDisplay.style.color = "green";
    } else if (strength >= 5) {
        strengthDisplay.innerText = "Moderate";
        strengthDisplay.style.color = "orange";
    } else {
        strengthDisplay.innerText = "Weak";
        strengthDisplay.style.color = "red";
    }
}

const generatePassword = (password = "") => {
    if (upperInput.checked) {
        password += getRandomData(upperSet);
    }
    if (lowerInput.checked) {
        password += getRandomData(lowerSet);
    }
    if (numberInput.checked) {
        password += getRandomData(numberSet);
    }
    if (symbolInput.checked) {
        password += getRandomData(symbolSet);
    }
    if (password.length < totalChar.value) {
        return generatePassword(password);
    }

    passBox.innerText = truncateString(password, totalChar.value);

    // Update password strength display
    const strength = checkPasswordStrength(password);
    updateStrengthDisplay(strength);
}

generatePassword();

document.getElementById("btn").addEventListener("click", function() {
    generatePassword();
});

function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
    } else {
        return str;
    }
}
