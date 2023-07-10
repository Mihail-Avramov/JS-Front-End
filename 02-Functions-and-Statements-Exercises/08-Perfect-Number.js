function solve(number) {
    let numberIsPerfect = true;
    let divisorsSum = 0;

    if (number > 0) {
        for (let index = 1; index < number; index++) {
            if (number % index === 0) {
                divisorsSum += index;
            }
        }
        if (divisorsSum !== number) {
            numberIsPerfect = false;
        }
    } else {
        numberIsPerfect = false;
    }

    if (numberIsPerfect) {
        console.log("We have a perfect number!");
    } else {
        console.log("It's not so perfect.");
    }
}

solve(1236498);
