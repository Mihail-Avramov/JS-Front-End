function manageStore(currentStock, deliveryStock) {
    const productsInfo = [...currentStock, ...deliveryStock];

    const stock = productsInfo.reduce((acc, curr, i) => {
        if (i % 2 === 0) {
            if (!acc.hasOwnProperty(curr)) {
                acc[curr] = 0;
            }

            acc[curr] += Number(productsInfo[i + 1]);
        }

        return acc;
    }, {});

    Object.entries(stock).forEach(([productName, productQty]) => {
        console.log(`${productName} -> ${productQty}`);
    });
}

function manageStore2(currentStock, deliveryStock) {
    const productsInfo = [...currentStock, ...deliveryStock];

    const stock = productsInfo.reduce((acc, curr, i) => {
        if (i % 2 !== 0) {
            return acc;
        }

        if (!acc.hasOwnProperty(curr)) {
            acc[curr] = 0;
        }

        acc[curr] += Number(productsInfo[i + 1]);

        return acc;
    }, {});

    Object.keys(stock).forEach((key) => {
        console.log(`${key} -> ${stock[key]}`);
    });
}

function manageStore3(availableStock, orderedStock) {
    const allInfo = [...availableStock, ...orderedStock];
    const allStock = allInfo.reduce((acc, curr, i) => {
        if (i % 2 === 0) {
            let product = acc.find((x) => x.hasOwnProperty(curr));
            if (product) {
                product[curr] += Number(allInfo[i + 1]);
            } else {
                acc.push({ [curr]: Number(allInfo[i + 1]) });
            }
        }
        return acc;
    }, []);

    allStock.forEach((product) => {
        Object.keys(product).forEach((key) => {
            console.log(`${key} -> ${product[key]}`);
        });
    });
}

manageStore3(["Chips", "5", "CocaCola", "9", "Bananas", "14", "Pasta", "4", "Beer", "2"], ["Flour", "44", "Oil", "12", "Pasta", "7", "Tomatoes", "70", "Bananas", "30"]);
