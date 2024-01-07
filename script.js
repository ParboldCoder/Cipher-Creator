//I refactored the the script to look and feel cleaner to read


// Array of special characters to be included in password
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
var numericCharacters = Array.from({ length: 10 }, (_, i) => String(i));

// Array of lowercase characters to be included in password
var lowerCasedCharacters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

// Array of uppercase characters to be included in password
var upperCasedCharacters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

// Function to prompt user for password options
function getPasswordOptions() {
  var length = parseInt(prompt("Enter the length of your password (between 8 and 128 characters):"));

  if (isNaN(length) || length < 8 || length > 128) {
    alert("Please enter a valid number between 8 and 128.");
    return null;
  }

  var includeLowercase = confirm("Include lowercase characters?");
  var includeUppercase = confirm("Include uppercase characters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeSpecial = confirm("Include special characters?");

  if (!includeLowercase && !includeUppercase && !includeNumeric && !includeSpecial) {
    alert("At least one character type must be selected.");
    return null;
  }

  return {
    length: length,
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase,
    includeNumeric: includeNumeric,
    includeSpecial: includeSpecial
  };
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword(options) {
  if (!options) {
    var randomPassword = "";
    var possibleCharacters = lowerCasedCharacters.concat(upperCasedCharacters, numericCharacters, specialCharacters);

    for (var i = 0; i < 12; i++) {
        randomPassword += getRandom(possibleCharacters);
    }
    return randomPassword;
  }

  var possibleCharacters = [];
  var guaranteedCharacters = [];

  if (options.includeLowercase) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.includeUppercase) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  if (options.includeNumeric) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.includeSpecial) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  // Generate the password by selecting random characters from the possible characters
  var generatedPassword = "";
  for (var i = 0; i < options.length - guaranteedCharacters.length; i++) {
    generatedPassword += getRandom(possibleCharacters);
  }

  // Add the guaranteed characters to the password
  generatedPassword += guaranteedCharacters.join('');

  return generatedPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var options = getPasswordOptions();
  var password = generatePassword(options);
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);