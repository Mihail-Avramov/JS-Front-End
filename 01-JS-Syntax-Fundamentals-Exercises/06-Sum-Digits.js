function solve1(value) {
    let sum = 0;

    while (value) {
        sum += value % 10;
        value = Math.floor(value / 10);
    }
    console.log(sum);
}

function solve2(value) {
    sum = value
        .toString()
        .split("")
        .map(Number)
        .reduce((a, b) => {
            return a + b;
        }, 0);

    console.log(sum);
}

function solve3(value) {
    let sum = 0;
    let valueString = value.toString();
    let valueArr = valueString.split("");
    for (let index = 0; index < valueArr.length; index++) {
        sum += Number(valueArr[index]);
    }

    console.log(sum);
}

function solve4(value) {
    let sum = 0;
    let valueString = value.toString();
    for (let index = 0; index < valueString.length; index++) {
        sum += Number(valueString[index]);
    }

    console.log(sum);
}

solve1(1234567);
solve2(1234567);
solve3(1234567);
solve4(1234567);
