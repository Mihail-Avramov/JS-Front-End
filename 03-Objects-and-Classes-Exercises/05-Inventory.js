function solve(heroes) {
    heroes
        .map((hero) => {
            const [heroName, heroLevel, itemsList] = hero.split(" / ");
            return { name: heroName, level: Number(heroLevel), items: itemsList.split(", ") };
        })
        .sort((a, b) => (a.level > b.level ? 1 : b.level > a.level ? -1 : 0))
        .forEach((hero) => {
            console.log(`Hero: ${hero.name}`);
            console.log(`level => ${hero.level}`);
            console.log(`items => ${hero.items.join(", ")}`);
        });
}

solve(["Isacc / 25 / Apple, GravityGun", "Derek / 12 / BarrelVest, DestructionSword", "Hes / 1 / Desolator, Sentinel, Antara"]);
