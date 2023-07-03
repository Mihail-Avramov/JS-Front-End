function solve(word, text) {
    console.log(
        text
            .toLowerCase()
            .split(" ")
            .some((w) => w === word.toLowerCase())
            ? word
            : `${word} not found!`
    );
}

solve("python", "JavaScript is the best programming language");
