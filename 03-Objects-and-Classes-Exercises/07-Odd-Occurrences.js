function solution(input) {
    const words = input.split(" ");

    const wordsOccurrences = words.reduce((acc, curr) => {
        let currentWord = curr.toLowerCase();
        let wordObj = acc.find((obj) => obj.hasOwnProperty(currentWord));
        if (!wordObj) {
            acc.push({ [currentWord]: 1 });
        } else {
            wordObj[currentWord]++;
        }
        return acc;
    }, []);

    const result = wordsOccurrences
        .filter((obj) => Object.values(obj)[0] % 2 !== 0)
        .map((obj) => {
            return Object.keys(obj)[0];
        });

    console.log(result.join(" "));
}

solution("Java C# Php PHP Java PhP 3 C# 3 1 5 C#");
