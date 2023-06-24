function solve(fruitType, weight, price) {
    console.log(`I need $${(price * weight / 1000).toFixed(2)} to buy ${(weight / 1000).toFixed(2)} kilograms ${fruitType}.`);
}

solve("apple", 1563, 2.35);