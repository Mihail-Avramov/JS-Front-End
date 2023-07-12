function solve(input) {
    const wordsOccurrences = input
        .shift()
        .split(" ")
        .reduce((acc, curr) => {
            acc[curr] = 0;
            return acc;
        }, {});

    input.forEach((word) => {
        if (wordsOccurrences.hasOwnProperty(word)) {
            wordsOccurrences[word]++;
        }
    });

    Object.entries(wordsOccurrences)
        .sort(([, a], [, b]) => b - a)
        .forEach(([word, count]) => {
            console.log(`${word} - ${count}`);
        });
}

solve([
    "this sentence",
    "In",
    "this",
    "sentence",
    "you",
    "have",
    "to",
    "count",
    "the",
    "occurrences",
    "of",
    "the",
    "words",
    "this",
    "and",
    "sentence",
    "because",
    "this",
    "is",
    "your",
    "task",
]);
