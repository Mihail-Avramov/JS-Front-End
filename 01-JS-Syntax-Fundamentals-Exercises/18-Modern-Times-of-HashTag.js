function solve(text) {
    return text
        .split(" ")
        .filter((word) => /^#[a-zA-Z]+$/.test(word))
        .map((word) => word.slice(1))
        .join("\n");
}

console.log(
    solve(
        "The symbol # is known #variously in English-speaking #regions as the #number sign"
    )
);
