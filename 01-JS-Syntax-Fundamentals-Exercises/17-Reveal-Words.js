function solve(words, text) {
    const wordArray = words.split(", ");

    for (let index = 0; index < wordArray.length; index++) {
        text = text.replace(
            "*".repeat(wordArray[index].length),
            wordArray[index]
        );
    }

    console.log(text);
}

solve("great", "softuni is ***** place for learning new programming languages");
solve(
    "great, learning",
    "softuni is ***** place for ******** new programming languages"
);
