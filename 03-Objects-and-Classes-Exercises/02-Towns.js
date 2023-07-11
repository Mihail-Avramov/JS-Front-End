function townsInfo(towns) {
    towns
        .map((town) => {
            const [name, lat, long] = town.split(" | ");
            return { town: name, latitude: Number(lat).toFixed(2), longitude: Number(long).toFixed(2) };
        })
        .forEach((town) => {
            console.log(town);
        });
}

function townsInfo2(towns) {
    for (const town of towns) {
        const arguments = town.split(" | ");
        const name = arguments[0];
        const lat = Number(arguments[1]).toFixed(2);
        const long = Number(arguments[2]).toFixed(2);
        const obj = {
            town: name,
            latitude: lat,
            longitude: long,
        };
        console.log(obj);
    }
}

function townsInfo3(towns) {
    for (const town of towns) {
        const [name, lat, long] = town.split(" | ");
        const obj = {
            town: name,
            latitude: Number(lat).toFixed(2),
            longitude: Number(long).toFixed(2),
        };
        console.log(obj);
    }
}

function townsInfo4(towns) {
    towns.forEach((town) => {
        const [name, lat, long] = town.split(" | ");
        const obj = {
            town: name,
            latitude: Number(lat).toFixed(2),
            longitude: Number(long).toFixed(2),
        };
        console.log(obj);
    });
}

townsInfo4(["Sofia | 42.696552 | 23.32601", "Beijing | 39.913818 | 116.363625"]);
