function solve(array, step) {
    const myArray = [];
    for (let index = 0; index < array.length; index += step) {
        myArray.push(array[index]);
    }
    return myArray;
}

console.log(solve(["5", "20", "31", "4", "20"], 2));
console.log(solve(["dsa", "asd", "test", "tset"], 2));
console.log(solve(["1", "2", "3", "4", "5"], 6));
