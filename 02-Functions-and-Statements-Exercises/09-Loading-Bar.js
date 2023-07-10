function solve(number) {
    if (number === 100) {
        console.log("100% Complete!");
    } else {
        console.log(`${number}% [${"%".repeat(number / 10)}${".".repeat(10 - number / 10)}]`);
        console.log("Still loading...");
    }
}

solve(100);
