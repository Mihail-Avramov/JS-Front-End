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
    const emplyees = names.reduce((acc, curr) => {
        acc[curr] = curr.length;
        return acc;
    }, {});

    console.log(emplyees)

    Object.keys(emplyees).forEach((key) => {
        console.log(`Name: ${key} -- Personal Number: ${emplyees[key]}`);
    });
}

function solve3(names) {
    names.forEach((employee) => {
        console.log(`Name: ${employee} -- Personal Number: ${employee.length}`);
    })
}

solve2(["Silas Butler", "Adnaan Buckley", "Juan Peterson", "Brendan Villarreal"]);