function solve(number) {

    function printLine(number) {
        console.log(`${number} `.repeat(number).trimEnd());  
    }

    for (let index = 0; index < number; index++) {
        printLine(number);     
    }
}

solve(7);