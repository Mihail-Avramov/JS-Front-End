function solve(count, type, day) {
    const prices = {
        Students: {
            Friday: 8.45,
            Saturday: 9.8,
            Sunday: 10.46,
        },
        Business: {
            Friday: 10.9,
            Saturday: 15.6,
            Sunday: 16,
        },
        Regular: {
            Friday: 15,
            Saturday: 20,
            Sunday: 22.5,
        },
    };

    const price = prices[type][day];

    let totalPrice = 0;

    if (type === "Students" && count >= 30) {
        totalPrice = price * count * 0.85;
    } else if (type === "Business" && count >= 100) {
        totalPrice = price * (count - 10);
    } else if (type === "Regular" && count >= 10 && count <= 20) {
        totalPrice = price * count * 0.95;
    } else {
        totalPrice = price * count;
    }

    console.log(`Total price: ${totalPrice.toFixed(2)}`);
}

solve(30, "Students", "Sunday");
solve(40, "Regular", "Saturday");
