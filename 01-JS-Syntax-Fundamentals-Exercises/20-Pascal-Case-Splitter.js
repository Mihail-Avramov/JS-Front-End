function solve(text) {
    return text.split(/(?=[A-Z])/).join(", ");
}

console.log(solve("SplitMeIfYouCanHaHaYouCantOrYouCan"));
