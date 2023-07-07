function solve(x, y, z) {
    function sum(x, y) {
        return x + y;
    }
    function subtract(x, y) {
        return x - y;
    }

    console.log(subtract(sum(x, y), z));
}

solve(23, 6, 10);