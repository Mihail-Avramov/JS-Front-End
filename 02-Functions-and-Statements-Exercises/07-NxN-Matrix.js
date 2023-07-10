function solve(number) {
    function printLine(number) {
        console.log(`${number} `.repeat(number).trimEnd());
    }

    for (let index = 0; index < number; index++) {
        printLine(number);
    }
}

function matrix(number) {
    new Array(number).fill(new Array(number).fill(number)).forEach((row) => console.log(row.join(" ")));
}

//solve(7);

matrix(7);
