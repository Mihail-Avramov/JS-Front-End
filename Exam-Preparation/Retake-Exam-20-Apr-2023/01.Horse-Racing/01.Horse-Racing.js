function solve(input) {
    const horsesRanking = input.shift().split("|");
    let commandInput = "";
    while ((commandInput = input.shift()) !== "Finish") {
        const [command, firstHorese, secondHorse] = commandInput.split(" ");
        const firstHoreseIndex = horsesRanking.indexOf(firstHorese);
        switch (command) {
            case "Retake":
                let overtakingHoreseIndex = horsesRanking.indexOf(firstHorese);
                let overtakenHoreseIndex = horsesRanking.indexOf(secondHorse);
                if (overtakingHoreseIndex < overtakenHoreseIndex) {
                    [
                        horsesRanking[overtakingHoreseIndex],
                        horsesRanking[overtakenHoreseIndex],
                    ] = [
                        horsesRanking[overtakenHoreseIndex],
                        horsesRanking[overtakingHoreseIndex],
                    ];
                    console.log(`${firstHorese} retakes ${secondHorse}.`);
                }
                break;
            case "Trouble":
                if (firstHoreseIndex > 0) {
                    [
                        horsesRanking[firstHoreseIndex],
                        horsesRanking[firstHoreseIndex - 1],
                    ] = [
                        horsesRanking[firstHoreseIndex - 1],
                        horsesRanking[firstHoreseIndex],
                    ];
                    console.log(
                        `Trouble for ${firstHorese} - drops one position.`
                    );
                }
                break;
            case "Rage":
                let toPositionIndex = null;
                if (firstHoreseIndex < horsesRanking.length - 2) {
                    toPositionIndex = firstHoreseIndex + 2;
                } else if (firstHoreseIndex < horsesRanking.length - 1) {
                    toPositionIndex = firstHoreseIndex + 1;
                } else {
                    toPositionIndex = firstHoreseIndex;
                }

                horsesRanking.splice(firstHoreseIndex, 1);
                horsesRanking.splice(toPositionIndex, 0, firstHorese);

                console.log(`${firstHorese} rages 2 positions ahead.`);
                break;
            case "Miracle":
                const horseName = horsesRanking.shift();
                horsesRanking.push(horseName);
                console.log(`What a miracle - ${horseName} becomes first.`);
                break;
        }
    }
    console.log(horsesRanking.join("->"));
    console.log(`The winner is: ${horsesRanking.pop()}`);
}

solve([
    "Onyx|Domino|Sugar|Fiona",
    "Trouble Onyx",
    "Retake Onyx Sugar",
    "Rage Domino",
    "Miracle",
    "Finish",
]);
