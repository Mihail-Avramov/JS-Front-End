function factorialDivision(number1, number2) {
    function getFactorial(number) {
        if (number === 1) {
            return number;
        }

        return number * getFactorial(number - 1);
    }

    console.log((getFactorial(number1) / getFactorial(number2)).toFixed(2));
}

factorialDivision(6, 2);
