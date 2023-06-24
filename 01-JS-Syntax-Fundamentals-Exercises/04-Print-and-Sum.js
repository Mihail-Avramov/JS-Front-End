function solve(startNum, endNum) {
    let sum = 0;
    const numbers = [];
    for (let index = startNum; index <= endNum; index++) {
        sum += index;
        numbers.push(index);
    }

    console.log(`${numbers.join(" ")}`);
    console.log(`Sum: ${sum}`);
}

solve(5, 10);
solve(0, 26);
solve(50, 60);
