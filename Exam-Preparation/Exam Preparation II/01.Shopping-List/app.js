function solve(input) {
    let shoppingList = input.shift().split("!");
    let command = null;

    while ((command = input.shift()) !== "Go Shopping!") {
        let [action, item, newItem] = command.split(" ");
        switch (action) {
            case "Urgent":
                if (!shoppingList.includes(item)) {
                    shoppingList.unshift(item);
                }
                break;
            case "Unnecessary":
                if (shoppingList.includes(item)) {
                    shoppingList.splice(shoppingList.indexOf(item), 1);
                }
                break;
            case "Correct":
                if (shoppingList.includes(item)) {
                    shoppingList.splice(shoppingList.indexOf(item), 1, newItem);
                }
                break;
            case "Rearrange":
                if (shoppingList.includes(item)) {
                    shoppingList.splice(shoppingList.indexOf(item), 1);
                    shoppingList.push(item);
                }
                break;
        }
    }
    console.log(shoppingList.join(", "));
}

solve(["Milk!Pepper!Salt!Water!Banana", "Urgent Salt", "Unnecessary Grapes", "Correct Pepper Onion", "Rearrange Grapes", "Correct Tomatoes Potatoes", "Go Shopping!"]);
