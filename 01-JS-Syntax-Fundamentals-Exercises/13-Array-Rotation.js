function solve(arr, count) {
    const myArr = [...arr]
    count = count % arr.length;

    for (let index = 0; index < count; index++) {
        myArr.push(myArr.shift());
    }

    console.log(myArr.join(" "));
}

solve([51, 47, 32, 61, 21], 2);
solve([32, 21, 61, 1], 4);
solve([2, 4, 15, 31], 5);
