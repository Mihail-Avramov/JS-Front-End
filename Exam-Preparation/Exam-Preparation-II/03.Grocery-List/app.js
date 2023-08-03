const API_URL = "http://localhost:3030/jsonstore/grocery/";

const formElement = document.querySelector("form.list");
const tableBody = document.getElementById("tbody");

const formInputs = {
    product: document.getElementById("product"),
    count: document.getElementById("count"),
    price: document.getElementById("price"),
};

const addProductBtn = document.getElementById("add-product");
addProductBtn.addEventListener("click", addProduct);

const updateProductBtn = document.getElementById("update-product");
updateProductBtn.addEventListener("click", updateProduct);

const loadProductsBtn = document.getElementById("load-product");
loadProductsBtn.addEventListener("click", loadProducts);

function addProduct(e) {
    e.preventDefault();

    const [product, count, price] = Object.values(formInputs).map((x) => x.value);

    if (product !== "" && count !== "" && price !== "") {
        const newProduct = {
            product,
            count,
            price,
        };

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
            .then((res) => res.json())
            .then((data) => {
                loadProducts(e);
            })
            .catch((err) => console.error(err));

        formElement.reset();
    }
}

function loadProducts(e) {
    e.preventDefault();

    fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            tableBody.innerHTML = "";
            Object.values(data).forEach((product) => {
                const tr = document.createElement("tr");
                tr.setAttribute("data-id", product._id);
                tr.innerHTML = `<td>${product.product}</td><td>${product.count}</td><td>${product.price}</td><td class="btn"><button class="update">Update</button><button class="delete">Delete</button></td>`;
                tableBody.appendChild(tr);

                const deleteBtn = tr.querySelector(".delete");
                deleteBtn.addEventListener("click", deleteProduct);

                const editBtn = tr.querySelector(".update");
                editBtn.addEventListener("click", editProduct);
            });
        })
        .catch((err) => console.error(err));
}

function deleteProduct(e) {
    e.preventDefault();

    const id = e.target.parentElement.parentElement.dataset.id;

    fetch(API_URL + id, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            loadProducts(e);
        })
        .catch((err) => console.error(err));
}

function editProduct(e) {
    e.preventDefault();
    const id = e.target.parentElement.parentElement.dataset.id;
    const [product, count, price] = e.target.parentElement.parentElement.querySelectorAll("td");
    formInputs.product.value = product.textContent;
    formInputs.count.value = count.textContent;
    formInputs.price.value = price.textContent;

    addProductBtn.setAttribute("disabled", true);
    updateProductBtn.removeAttribute("disabled");
    updateProductBtn.setAttribute("data-id", id);
}

function updateProduct(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const [product, count, price] = Object.values(formInputs).map((x) => x.value);

    if (product !== "" && count !== "" && price !== "") {
        const newProduct = {
            product,
            count,
            price,
            _id: id,
        };

        fetch(API_URL + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
            .then((res) => res.json())
            .then((data) => {
                loadProducts(e);
            })
            .catch((err) => console.error(err));
    }

    addProductBtn.removeAttribute("disabled");
    updateProductBtn.setAttribute("disabled", true);
    updateProductBtn.removeAttribute("data-id");
    formElement.reset();
}
