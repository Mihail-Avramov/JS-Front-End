function solve(names) {
    const emplyees = names.reduce((acc, curr) => {
        acc[curr] = curr.length;
        return acc;
    }, {})

    Object.entries(emplyees).forEach(([name, number]) => {
        console.log(`Name: ${name} -- Personal Number: ${number}`);
    })
}

function solve2(names) {
    names.forEach((employee) => {
        console.log(`Name: ${employee} -- Personal Number: ${employee.length}`);
    })
}

solve2(["Silas Butler", "Adnaan Buckley", "Juan Peterson", "Brendan Villarreal"]);