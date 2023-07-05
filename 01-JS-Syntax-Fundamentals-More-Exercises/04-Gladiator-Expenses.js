function solve(lostFightsCount, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    const expenses =
        Math.floor(lostFightsCount / 2) * helmetPrice +
        Math.floor(lostFightsCount / 3) * swordPrice +
        Math.floor(lostFightsCount / 6) * shieldPrice +
        Math.floor(lostFightsCount / 12) * armorPrice;
    console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`);
}

solve(7, 2, 3, 4, 5);
solve(23, 12.5, 21.5, 40, 200);
