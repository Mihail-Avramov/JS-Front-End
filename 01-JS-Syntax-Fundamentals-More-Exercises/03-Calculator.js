function solve(num1, operator, num2) {
    let calculator = {
        "+": (a, b) => (a + b).toFixed(2),
        "-": (a, b) => (a - b).toFixed(2),
        "*": (a, b) => (a * b).toFixed(2),
        "/": (a, b) => {
            if (b === 0) {
                return "Error: Division by 0";
            }
            return (a / b).toFixed(2);
        },
    };

    console.log(calculator[operator](num1, num2));
}

solve(5, "+", 10);
solve(5, "-", 10);
solve(-5, "+", 10);
solve(5, "*", 10);
solve(5, "/", 9);
solve(0, "/", 10);
solve(5, "/", 0);
