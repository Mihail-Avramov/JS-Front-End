function solve(num, ...commands) {
    let sum = Number(num);

    let commandOperation = {
        chop: (sum) => sum / 2,
        dice: (sum) => Math.sqrt(sum),
        spice: (sum) => sum + 1,
        bake: (sum) => sum * 3,
        fillet: (sum) => sum * 0.8,
    };

    for (const command of commands) {
        sum = commandOperation[command](sum);
        console.log(sum);
    }
}

solve("32", "chop", "chop", "chop", "chop", "chop");
solve("9", "dice", "spice", "chop", "bake", "fillet");
