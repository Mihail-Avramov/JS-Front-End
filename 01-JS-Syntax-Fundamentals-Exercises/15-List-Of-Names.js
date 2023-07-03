function solve(array) {
    sortedArray = [...array].sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
    );

    for (let index = 0; index < sortedArray.length; index++) {
        console.log(`${index + 1}.${sortedArray[index]}`);
    }
}

solve(["John", "Bob", "Christina", "Ema"]);
