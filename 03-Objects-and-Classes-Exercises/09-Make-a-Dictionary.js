function solve(input) {
    const dictionary = input
        .map((obj) => JSON.parse(obj))
        .reduce((acc, curr) => {
            return {
                ...acc,
                ...curr,
            };
        }, {});

    Object.keys(dictionary)
        .sort()
        .forEach((key) => {
            console.log(`Term: ${key} => Definition: ${dictionary[key]}`);
        });
}

function solve2(input) {
    let dictionary = {};
    input.forEach((string) => {
        const term = JSON.parse(string);
        dictionary = Object.assign(dictionary, term);
    });

    Object.keys(dictionary)
        .sort()
        .forEach((key) => {
            console.log(`Term: ${key} => Definition: ${dictionary[key]}`);
        });
}

function solve3(input) {
    const dictionary = input.reduce((acc, curr) => {
        return {
            ...acc,
            ...JSON.parse(curr),
        };
    }, {});

    Object.keys(dictionary)
        .sort()
        .forEach((key) => {
            console.log(`Term: ${key} => Definition: ${dictionary[key]}`);
        });
}

solve3([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}',
]);
