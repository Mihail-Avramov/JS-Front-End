function solve(input) {
    let n = Number(input.shift());
    let racers = {};

    input.splice(0, n).reduce((acc, line) => {
        let [rider, fuelCapacity, position] = line.split("|");
        fuelCapacity = Number(fuelCapacity);
        position = Number(position);
        acc[rider] = { fuelCapacity, position };
        return acc;
    }, racers);

    let line;
    while ((line = input.shift()) !== "Finish") {
        let [command, rider, ...params] = line.split(" - ");

        switch (command) {
            case "StopForFuel":
                let [minFuel, changedPosition] = params;
                minFuel = Number(minFuel);
                changedPosition = Number(changedPosition);
                if (racers[rider].fuelCapacity < minFuel) {
                    console.log(`${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`);
                    racers[rider].position = changedPosition;
                } else {
                    console.log(`${rider} does not need to stop for fuel!`);
                }
                break;
            case "Overtaking":
                let [rider2] = params;
                if (racers[rider].position < racers[rider2].position) {
                    console.log(`${rider} overtook ${rider2}!`);
                    [racers[rider].position, racers[rider2].position] = [racers[rider2].position, racers[rider].position];
                }
                break;
            case "EngineFail":
                let [lapsLeft] = params;
                lapsLeft = Number(lapsLeft);
                console.log(`${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
                delete racers[rider];
                break;
        }
    }
    Object.entries(racers).forEach(([rider, { fuelCapacity, position }]) => {
        console.log(`${rider}`);
        console.log(`  Final position: ${position}`);
    });
}

solve([
    "4",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|3",
    "Jorge Lorenzo|80|4",
    "Johann Zarco|80|2",
    "StopForFuel - Johann Zarco - 90 - 5",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish",
]);

// The first line of the input should contain an integer 'n' - the number of riders participating in the race. The next 'n' lines should provide the details of each rider, including their fuel capacity and current position in the race. Each rider's details should be separated by a pipe (|) and follow this format:
// "{rider}|{fuel capacity}|{position}"
// Note: A rider's fuel capacity can have a maximum value of 100%.
// After adding the riders, you can start the race. You will receive different commands, each on a new line and separated by " - ", until the "Finish" command is given.
//  The actions the riders can perform during the race are as follows:
// "StopForFuel – {rider} – {minimum fuel} – {changed position}"
// •	If the rider has less than minimum fuel, he needs to a make pit stop. Print this message:
// o	"{rider} stopped to refuel but lost his position, now he is {changed position}."
// •	If the rider has enough fuel print:
// o	"{rider} does not need to stop for fuel!"
// "Overtaking – {rider 1} – {rider 2}"
// •	If rider 1 is positioned to the left of rider 2, it means that rider 1 is ahead of rider 2 in the race, swap the position of the two riders. Then, print the following:
// "{rider 1} overtook {rider 2}!"
// "EngineFail – {rider} – {laps left}"
// •	If the rider’s engine fails, remove him from the race and print:
// "{rider} is out of the race because of a technical issue, {laps left} laps before the finish."
