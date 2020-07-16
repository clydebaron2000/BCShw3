// Assignment Code
//"Global variables"
var LOWER = "qwertyuioplkjhgfdsazxcvbnm";
var UPPER = "QWERTYUIOPLKKJHGFDSAZXCVBNM";
var SPECIAL = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var NUM = "1234567890";

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}

function generatePassword() {
    var len = 0;
    // choose length block
    while (isNaN(len) || len < 8 || len > 128)
        len = parseInt(prompt("Choose a length of your password (8-128 characters)."));

    //specifications block
    var lowerB, upperB, numB, specB = false; // 'B' stands for boolean
    while (!lowerB && !upperB && !numB && !specB) { //as long as none were chosen
        lowerB = confirm("Do you want lowercase characters in your password?");
        upperB = confirm("Do you want uppercase characters in your password?");
        numB = confirm("Do you want numeric characters in your password?");
        specB = confirm("Do you want special characters in your password?");
        //if none were chosen, tell them
        if (!lowerB && !upperB && !numB && !specB)
            alert("You must choose at least one of the following for your password: lowercase, uppercase, numeric, special.");
    }

    //set chooser block
    var choices = [];
    if (lowerB) choices.push(0);
    if (upperB) choices.push(1);
    if (numB) choices.push(2);
    if (specB) choices.push(3);

    //code generating block
    var out = "";
    do {
        out = "";
        for (i = 0; i < len; i++) { //for each character in the password
            var append = '';
            switch (choices[Math.floor(Math.random() * choices.length)]) { //choose from the options the user specified
                case 0:
                    append = LOWER[Math.floor(Math.random() * LOWER.length)]; //add a random character from the choice specified
                    break;
                case 1:
                    append = UPPER[Math.floor(Math.random() * UPPER.length)];
                    break;
                case 2:
                    append = SPECIAL[Math.floor(Math.random() * SPECIAL.length)];
                    break;
                case 3:
                    append = NUM[Math.floor(Math.random() * NUM.length)];
                    break;
            }
            out = out.concat(append); //append to output
        }
    } while (passIsValid(len, out, lowerB, upperB, numB, specB));
    return out;
}

function passIsValid(length, password, lowerB, upperB, numB, specB) {
    if (password.length !== length) return false;
    //if we get here, password.length===length
    var l, u, n, s = 0;
    for (i = 0; i < length; i++) {
        if (lowerB)
            if (LOWER.includes(password[i]))
                l++;
        if (upperB)
            if (UPPER.includes(password[i]))
                u++;
        if (numB)
            if (NUM.includes(password[i]))
                n++;
        if (specB)
            if (SPECIAL.includes(password[i]))
                s++;
    }
    //loop checker
    if (l + u + n + s !== length) return false;
    //at least one of each checker
    if (l * u * n * s === 0) return false;
    //if all pass, then return true!
    return true;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);