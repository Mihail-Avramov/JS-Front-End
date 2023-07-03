function solve(array) {
    sortedArray = [...array].sort((a, b) => a - b);
    const myArray = [];

    for (let index = 0; index < array.length; index++) {
        if (index % 2 === 0) {
            myArray.push(sortedArray.shift());
        } else {
            myArray.push(sortedArray.pop());
        }
    }

    return myArray;
}

console.log(solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56, 40]));
