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
        console.log(`${key} -> ${stock[key]}`)
    })
}

manageStore2(["Chips", "5", "CocaCola", "9", "Bananas", "14", "Pasta", "4", "Beer", "2"], ["Flour", "44", "Oil", "12", "Pasta", "7", "Tomatoes", "70", "Bananas", "30"]);
