function returnOddAndEvenSum(num) {
    const digitsArray = num
        .toString()
        .split("")
        .map(Number);

    const sumEvenDigits = digitsArray.reduce((acc, cur) => cur % 2 === 0 ? acc + cur : acc, 0);
    const sumOddDigits = digitsArray.reduce((acc, cur) => cur % 2 !== 0 ? acc + cur : acc, 0);

    console.log(`Odd sum = ${sumOddDigits}, Even sum = ${sumEvenDigits}`);
}

returnOddAndEvenSum(1000435);
