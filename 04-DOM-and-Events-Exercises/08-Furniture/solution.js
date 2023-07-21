function solve() {
    const [generateTextArea, buyTextArea] = document.getElementsByTagName("textarea");
    const [generateButton, buyButton] = document.getElementsByTagName("button");
    const tbody = document.querySelector("tbody");

    generateButton.addEventListener("click", generate);
    buyButton.addEventListener("click", buy);

    function generate() {
        if (generateTextArea.value) {
            try {
                const data = JSON.parse(generateTextArea.value);
                data.forEach(({ img, name, price, decFactor }) => {
                    const tableRow = generateElement("tr", "", tbody);
                    const firstColumn = generateElement("td", "", tableRow);
                    generateElement("img", "", firstColumn, "", "", { src: img });
                    const secondColumn = generateElement("td", "", tableRow);
                    generateElement("p", name, secondColumn);
                    const thirdColumn = generateElement("td", "", tableRow);
                    generateElement("p", price, thirdColumn);
                    const fourthColumn = generateElement("td", "", tableRow);
                    generateElement("p", decFactor, fourthColumn);
                    const fifthColumn = generateElement("td", "", tableRow);
                    generateElement("input", "", fifthColumn, "", "", { type: "checkbox" });
                });
            } catch (error) {
                console.log(error);
            }
        }
        generateTextArea.value = "";
    }

    function buy() {
        const allCheckedInputs = Array.from(document.querySelectorAll("tbody tr input:checked"));
        let boughtItems = [];
        let totalPrice = 0;
        let totalDecFactor = 0;

        allCheckedInputs.forEach((input) => {
            const tableRow = input.parentElement.parentElement;
            const [_firstColumn, secondColumn, thirdColumn, fourthColumn] = Array.from(tableRow.children);
            let item = secondColumn.children[0].textContent;
            console.log(item);
            boughtItems.push(item);
            let currentPrice = Number(thirdColumn.children[0].textContent);
            totalPrice += currentPrice;
            let currentDecFactor = Number(fourthColumn.children[0].textContent);
            totalDecFactor += currentDecFactor;
        });

        buyTextArea.value += `Bought furniture: ${boughtItems.join(", ")}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${
            totalDecFactor / allCheckedInputs.length
        }`;
    }

    //type = string
    //id = string
    //parent = HTMLelement (parent)
    //idName = string
    //classesArray = ["className1", "className2", ...]
    //attributesObj = {src: "link to img", href: "link to site", type: "checkbox"}
    function generateElement(type, textContent, parent, id, classesArray, attributesObj) {
        //"HTML-TAG"
        const element = document.createElement(type);

        //"text or value content"
        if (textContent) {
            if (type !== "input" && type !== "textarea") {
                element.textContent = textContent;
            } else {
                element.value = textContent;
            }
        }

        // "idName"
        if (id) {
            element.id = id;
        }

        // ["className1", "className2", ...]
        if (classesArray) {
            classesArray.forEach((className) => {
                element.classList.add(className);
            });
        }

        //{src: "link to img", href: "link to site", type: "checkbox", row: 20}
        if (attributesObj) {
            Object.entries(attributesObj).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        // append HTMLelement to HTMLparent
        if (parent) {
            parent.appendChild(element);
        }

        return element;
    }
}
