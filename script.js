// Assignment Code
//"Global variables"
var LOWARR = "qwertyuioplkjhgfdsazxcvbnm";
var UPPARR = "QWERTYUIOPLKKJHGFDSAZXCVBNM";
var SPEARR = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var NUMARR = "1234567890";

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}
//generate a password
function generatePassword() {
    var pLength = 0;
    // choose length block
    while (isNaN(pLength) || pLength < 8 || pLength > 128)
        pLength = parseInt(prompt("Choose a length of your password (8-128 characters)."));

    //specifications block
    var lowB, uppB, numB, speB = false; // 'B' stands for boolean
    while (!lowB && !uppB && !numB && !speB) { //as long as none were chosen
        lowB = confirm("Do you want lowercase characters in your password?");
        uppB = confirm("Do you want uppercase characters in your password?");
        numB = confirm("Do you want numeric characters in your password?");
        speB = confirm("Do you want special characters in your password?");
        //if none were chosen, tell them
        if (!lowB && !uppB && !numB && !speB)
            alert("You must choose at least one of the following: lowercase, uppercase, numeric, special.");
    }

    //set chooser block
    var uChoices = [];
    if (lowB) uChoices.push(0); //lower
    if (uppB) uChoices.push(1); //upper
    if (numB) uChoices.push(2); //num
    if (speB) uChoices.push(3); //spec

    //code generating block
    var output;
    do { //while password is not valid, run at least once
        output = ""; //set output to a string of nothing
        for (i = 0; i < pLength; i++) { //for each character in the password
            var append = ''; //is only one character
            switch (uChoices[Math.floor(Math.random() * uChoices.length)]) { //random index from uChoices
                case 0: //lower
                    append = LOWARR[Math.floor(Math.random() * LOWARR.length)]; //random index of array
                    break;
                case 1: //upper
                    append = UPPARR[Math.floor(Math.random() * UPPARR.length)];
                    break;
                case 2: //num
                    append = SPEARR[Math.floor(Math.random() * SPEARR.length)];
                    break;
                case 3: //spec
                    append = NUMARR[Math.floor(Math.random() * NUMARR.length)];
                    break;
            }
            output += append; //append to output
        }
    } while (!passIsValid(pLength, output, lowB, uppB, numB, speB));

    return output;
}
//sub function of generatePassword
function passIsValid(length, password, lowB, uppB, numB, speB) {
    //type checking block
    if (isNaN(length) || typeof(password) !== "string" || typeof(lowB) !== "boolean" || typeof(uppB) !== "boolean" || typeof(numB) !== "boolean" || typeof(speB) !== "boolean")
        return false;
    //check length block
    if (password.length !== length) return false;
    //if we get here, password.length===length
    var l, u, n, s = 0;
    for (i = 0; i < length; i++) {
        if (lowB && LOWARR.includes(password[i])) l++;
        if (uppB && UPPARR.includes(password[i])) u++;
        if (numB && NUMARR.includes(password[i])) n++;
        if (speB && SPEARR.includes(password[i])) s++;
    }
    //at least one of each option!
    if (l * u * n * s === 0) return false;
    //if all pass, then return true!
    return true;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);