function printCharactersInRange(...chars) {
    firstCharAscii = chars.map((char) => char.charCodeAt(0)).sort((a, b) => a - b)[0];
    lastCharAscii = chars.map((char) => char.charCodeAt(0)).sort((a, b) => a - b)[chars.length - 1];

    let charsToPrint = [];

    for (let asciiCode = firstCharAscii + 1; asciiCode < lastCharAscii; asciiCode++) {
        charsToPrint.push(String.fromCharCode(asciiCode));
    }

    return charsToPrint.join(" ");
}

console.log(printCharactersInRange("C", "#"));