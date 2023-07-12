function solve(names) {
    const emplyees = names.reduce((acc, curr) => {
        acc[curr] = curr.length;
        return acc;
    }, {});

    Object.entries(emplyees).forEach(([name, number]) => {
        console.log(`Name: ${name} -- Personal Number: ${number}`);
    });
}

function solve2(names) {
    const emplyees = names.reduce((acc, curr) => {
        acc[curr] = curr.length;
        return acc;
    }, {});

    console.log(emplyees);

    Object.keys(emplyees).forEach((key) => {
        console.log(`Name: ${key} -- Personal Number: ${emplyees[key]}`);
    });
}

function solve3(names) {
    names.forEach((employee) => {
        console.log(`Name: ${employee} -- Personal Number: ${employee.length}`);
    });
}

function solve4(names) {
    names
        .map((employee) => {
            return { name: employee, number: employee.length };
        })
        .sort((a, b) => a.number - b.number)
        .forEach((employee) => console.log(`Name: ${employee.name} -- Personal Number: ${employee.number}`));
}

solve4(["Silas Butler", "Adnaan Buckley", "Juan Peterson", "Brendan Villarreal"]);
