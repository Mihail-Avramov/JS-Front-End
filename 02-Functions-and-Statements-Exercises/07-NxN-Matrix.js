function solve(number) {
    for (let index = 0; index < number; index++) {
        console.log(`${number} `.repeat(number).trimEnd());        
    }
}

solve(7);