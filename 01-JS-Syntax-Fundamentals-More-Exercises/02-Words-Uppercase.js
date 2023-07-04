function solve(text) {
    console.log(
        text
            .match(/\w+/g)
            .map((word) => word.toUpperCase())
            .join(", ")
    );
}

solve("Hi, how are you?");
