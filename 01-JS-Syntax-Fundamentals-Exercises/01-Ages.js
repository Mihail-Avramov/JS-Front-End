function solve(age) {
    if (age >= 66) {
        console.log("elder");
    } else if (age >= 20) {
        console.log("adult");
    } else if (age >= 14) {
        console.log("teenager");
    } else if (age >= 3) {
        console.log("child");
    } else if (age >= 0) {
        console.log("baby");
    } else {
        console.log("out of bounds");
    }
}

solve(-100);
solve(-1);
solve(0);
solve(2);
solve(3);
solve(13);
solve(14);
solve(19);
solve(20);
solve(65);
solve(66);
solve(100);
