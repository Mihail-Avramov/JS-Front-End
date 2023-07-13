function solve(input) {
    const parking = input.reduce((acc, curr) => {
        const [command, number] = curr.split(", ");
        if (command === "IN") {
            acc.add(number);
        } else if (command === "OUT") {
            acc.delete(number);
        }
        return acc;
    }, new Set());

    if (parking.size > 0) {
        Array.from(parking)
            .sort()
            .forEach((number) => console.log(number));
    } else {
        console.log("Parking Lot is Empty");
    }
}

function solve1(input) {
    const parking = new Set();

    input.forEach((element) => {
        const [command, number] = element.split(", ");
        if (command === "IN") {
            parking.add(number);
        } else if (command === "OUT") {
            parking.delete(number);
        }
    });

    if (parking.size > 0) {
        Array.from(parking)
            .sort()
            .forEach((number) => console.log(number));
    } else {
        console.log("Parking Lot is Empty");
    }
}

function solve2(input) {
    const parking = new Set();

    input.forEach((element) => {
        const [command, number] = element.split(", ");
        command === "IN" ? parking.add(number) : parking.delete(number);
    });

    if (parking.size > 0) {
        Array.from(parking)
            .sort()
            .forEach((number) => console.log(number));
    } else {
        console.log("Parking Lot is Empty");
    }
}

solve2(["IN, CA2844AA", "IN, CA1234TA", "OUT, CA2844AA", "IN, CA9999TT", "IN, CA2866HI", "OUT, CA1234TA", "IN, CA2844AA", "OUT, CA2866HI", "IN, CA9876HH", "IN, CA2822UU"]);
