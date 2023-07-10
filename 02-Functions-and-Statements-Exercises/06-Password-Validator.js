function validatePassword(password) {
    let passwordIsValid = true;

    if (password.length < 6 || password.length > 10) {
        console.log("Password must be between 6 and 10 characters");
        passwordIsValid = false;
    }

    if (!password.match("^[A-Za-z0-9]+$")) {
        console.log("Password must consist only of letters and digits");
        passwordIsValid = false;
    }

    const digitCount = password.match(/\d/g);

    if (!digitCount || digitCount.length < 2) {
        console.log("Password must have at least 2 digits");
        passwordIsValid = false;
    }

    if (passwordIsValid) {
        console.log("Password is valid");
    }
}

validatePassword("Pa$s$s");
