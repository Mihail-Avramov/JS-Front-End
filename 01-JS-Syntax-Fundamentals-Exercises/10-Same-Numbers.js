function solve(number) {
    let string = number.toString();
    let isAllNumberSame = true;
    let sum = Number(string[0]);
    for (let index = 1; index < string.length; index++) {
        if (string[index] !== string[index - 1]) {
            isAllNumberSame = false;
        }
        sum += Number(string[index]);
    }

    console.log(isAllNumberSame);
    console.log(sum);
}

function solve2(number) {
    const digits = number.toString().split("").map(Number);
    const isAllNumberSame = new Set(digits).size === 1;
    const sum = digits.reduce((a, b) => a + b, 0);

    console.log(isAllNumberSame);
    console.log(sum);
}

solve2(2222222);
