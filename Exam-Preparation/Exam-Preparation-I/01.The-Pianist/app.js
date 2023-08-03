function solve(input) {
    let n = Number(input.shift());
    let pieces = {};

    input.splice(0, n).reduce((acc, line) => {
        let [piece, composer, key] = line.split("|");
        acc[piece] = { composer, key };
        return acc;
    }, pieces);

    let line;
    while ((line = input.shift()) !== "Stop") {
        let [command, piece, ...params] = line.split("|");

        switch (command) {
            case "Add":
                let [composer, key] = params;
                if (pieces[piece]) {
                    console.log(`${piece} is already in the collection!`);
                } else {
                    pieces[piece] = { composer, key };
                    console.log(`${piece} by ${composer} in ${key} added to the collection!`);
                }
                break;
            case "Remove":
                if (pieces[piece]) {
                    delete pieces[piece];
                    console.log(`Successfully removed ${piece}!`);
                } else {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                }
                break;
            case "ChangeKey":
                let [newKey] = params;
                if (pieces[piece]) {
                    pieces[piece].key = newKey;
                    console.log(`Changed the key of ${piece} to ${newKey}!`);
                } else {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                }
                break;
        }
    }

    Object.entries(pieces).forEach(([piece, { composer, key }]) => {
        console.log(`${piece} -> Composer: ${composer}, Key: ${key}`);
    });
}

solve([
    "4",
    "Eine kleine Nachtmusik|Mozart|G Major",
    "La Campanella|Liszt|G# Minor",
    "The Marriage of Figaro|Mozart|G Major",
    "Hungarian Dance No.5|Brahms|G Minor",
    "Add|Spring|Vivaldi|E Major",
    "Remove|The Marriage of Figaro",
    "Remove|Turkish March",
    "ChangeKey|Spring|C Major",
    "Add|Nocturne|Chopin|C# Minor",
    "Stop",
]);

// On the first line of the standard input, you will receive an integer n – the number of pieces you will initially have. On the next n lines, the pieces themselves will follow with their composer and key, separated by "|" in the following format: "{piece}|{composer}|{key}".
// Then, you will be receiving different commands, each on a new line, separated by "|", until the "Stop" command is given:
// •	"Add|{piece}|{composer}|{key}":
// o	You need to add the given piece with the information about it to the other pieces and print:
// "{piece} by {composer} in {key} added to the collection!"
// o	If the piece is already in the collection, print:
// "{piece} is already in the collection!"
// •	"Remove|{piece}":
// o	If the piece is in the collection, remove it and print:
// "Successfully removed {piece}!"
// o	Otherwise, print:
// "Invalid operation! {piece} does not exist in the collection."
// •	"ChangeKey|{piece}|{new key}":
// o	If the piece is in the collection, change its key with the given one and print:
// "Changed the key of {piece} to {new key}!"
// o	Otherwise, print:
// "Invalid operation! {piece} does not exist in the collection."
// Upon receiving the "Stop" command, you need to print all pieces in your collection in the following format:
// "{Piece} -> Composer: {composer}, Key: {key}"
