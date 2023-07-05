function solve([user, ...passwords]) {
    const userPass = user.split("").reverse().join("");

    for (let index = 0; index < passwords.length; index++) {
        if (userPass === passwords[index]) {
            console.log(`User ${user} logged in.`);
            return;
        } else if (index < 3) {
            console.log("Incorrect password. Try again.");
        } else {
            console.log(`User ${user} blocked!`);
            return;
        }
    }
}

solve(["Acer", "login", "go", "let me in", "recA", "sdjhsd"]);
