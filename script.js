let products = [];

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').value;

    if (name && price && image) {
        const product = {
            name: name,
            price: parseFloat(price),
            image: image
        };
        products.push(product);
        renderProductList();
        calculateTotalPrice();
        clearInputFields();
    } else {
        alert("Будь ласка, заповніть всі поля!");
    }
}

function renderProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p>${product.price} грн</p>
                <button onclick="editProduct('${product.name}')">Редагувати</button>
                <button onclick="removeProduct('${product.name}')">Видалити</button>
            </div>
        `;
        productList.appendChild(listItem);
    });
}

function removeProduct(name) {
    products = products.filter(product => product.name !== name);
    renderProductList();
    calculateTotalPrice();
}


function editProduct(name) {
    const index = products.findIndex(product => product.name === name);
    const currentProduct = products[index];

    let newName = prompt("Введіть нову назву товару:", currentProduct.name);
    let newPrice = prompt("Введіть нову ціну товару:", currentProduct.price);

    newName = newName === null || newName.trim() === '' ? currentProduct.name : newName;
    newPrice = newPrice === null || newPrice.trim() === '' ? currentProduct.price : parseFloat(newPrice);

    products[index].name = newName;
    products[index].price = newPrice;

    renderProductList();
    calculateTotalPrice();
}


function filterProducts() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchText));
    renderFilteredProductList(filteredProducts);
}

function renderFilteredProductList(filteredProducts) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p>${product.price} грн</p>
                <button onclick="editProduct('${product.name}')">Редагувати</button>
                <button onclick="removeProduct('${product.name}')">Видалити</button>
            </div>
        `;
        productList.appendChild(listItem);
    });
}

function calculateTotalPrice() {
    const totalPrice = products.reduce((total, product) => total + product.price, 0);
    document.getElementById('totalPrice').innerText = `Загальна вартість: ${totalPrice} грн`;
}

function clearInputFields() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
}
