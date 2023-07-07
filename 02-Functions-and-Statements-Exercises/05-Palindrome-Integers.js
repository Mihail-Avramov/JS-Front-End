function checkIfNumberArePalindromes(numbers) {
    numbers.forEach(number => console.log(number === Number(number.toString().split("").reverse().join(""))));
}

checkIfNumberArePalindromes([123, 323, 421, 121]);
