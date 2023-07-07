function getSmallestNumber(...nums) {
    return nums.sort((a, b) => a - b)[0];
    //return Math.min(...nums)
}

console.log(getSmallestNumber(2, 5, 3));
getSmallestNumber(600, 342, 123);
