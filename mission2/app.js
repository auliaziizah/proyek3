var totalpembelian = 0;
const menus = [
    {
        num: 1,
        nama: "Cappucino",
        myImage: new Image(300, 300),
        src: 'gambar/Cappucino.jpg',
        harga: 20000
    },
    {
        num: 2,
        myImage: new Image(300, 300),
        src: 'gambar/GreenTea.jpg',
        nama: "Green Tea Latte",
        harga: 25000
    },
    {
        num: 3,
        myImage: new Image(300, 300),
        src: 'gambar/RedVelvet.jpg',
        nama: "Red Velvet",
        harga: 27000
    },
    {
        num: 4,
        myImage: new Image(300, 300),
        src: 'gambar/Chocolate.jpg',
        nama: "Chocolate",
        harga: 20000
    },
    {
        num: 5,
        myImage: new Image(300, 300),
        src: 'gambar/MineralWater.jpg',
        nama: "Mineral Water",
        harga: 5000
    },
    {
        num: 6,
        myImage: new Image(300, 300),
        src: 'gambar/LemonTea.jpg',
        nama: "Lemon Tea",
        harga: 10000
    }
];
function updateItemTotal(item, quantity) {
    const price = parseInt(item.getAttribute("data-price"));
    const itemTotalElement = item.querySelector(".item-total-value");
    const itemTotal = price * quantity;
    itemTotalElement.textContent = itemTotal;
}

function updateTotalPembelian() {
    totalPembelianElement.textContent = totalpembelian;
}

function updateTotal() {
    const pajakRate = 0.11; // Tarif pajak 11%
    const pajak = totalpembelian * pajakRate;
    const total = totalpembelian + pajak;

    pajakElement.textContent = pajak;
    totalElement.textContent = total;
}

function updateSelectedList(menuItem, price, quantity, totalPrice, imageSrc) {
    const selectedListItem = document.createElement("li");
    selectedListItem.innerHTML = `
        <div class="selected-item">
            <img src="${imageSrc}" alt="${menuItem}" width="50">
            <h5>${menuItem}</h5>
            <p>Rp. ${price} x${quantity} = Rp ${totalPrice}</p>
        </div>
    `;
    selectedListItem.setAttribute("data-menu", menuItem); // Tambahkan atribut data-menu
    selectedList.appendChild(selectedListItem);
}

const menuContainer = document.getElementById("menu");
const selectedList = document.getElementById("selected-list");
const totalPembelianElement = document.querySelector(".totalPembelian-value");
const pajakElement = document.querySelector(".pajak-value");
const totalElement = document.querySelector(".total-value");
let listMenus = '<div class="row">';
for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    
    listMenus +=
        `<div class="col-md-6 mb-4">
        <div class="card">
            <div id="${menu.num}" class="menu card-body d-flex flex-column justify-content-center align-items-center" data-price="${menu.harga}">
                <img src="${menu.src}" alt="${menu.nama}" class="img-fluid mb-2" width="200">
                <h5 class="card-title">${menu.nama}</h5>
                <p class="card-text">Rp. <span class="harga" id="harga-${menu.num}">${menu.harga}</span></p>
                <div class="quantity d-flex justify-content-center align-items-center">
                    <button class="subtract btn btn-primary mx-2">-</button>
                    <span class="quantity-value">0</span>
                    <button class="add btn btn-primary mx-2">+</button>
                </div>
                <br>
                <button class="tambahPesanan btn btn-success d-flex justify-content-center">Tambahkan Barang</button>
            </div>
        </div>
    </div>`;
}
listMenus += '</div>'; // Close last row

document.getElementById("menu").innerHTML = listMenus;
menuContainer.addEventListener("click", function(event) {
    const listItem = event.target.closest(".menu");

    if (listItem) {
        const price = parseInt(listItem.getAttribute("data-price"));
        const quantityElement = listItem.querySelector(".quantity-value");
        const quantity = parseInt(quantityElement.textContent);

        if (event.target.matches(".subtract")) {
            if (quantity > 0) {
                quantityElement.textContent = quantity - 1;
                // ... (update item total)
            }
        } else if (event.target.matches(".add")) {
            quantityElement.textContent = quantity + 1;
            // ... (update item total)
        } else if (event.target.matches(".tambahPesanan")) {
            if (quantity > 0) {
                const menuItem = listItem.querySelector("h5").textContent;
                const imageSrc = listItem.querySelector("img").getAttribute("src");
                const totalPrice = price * quantity;

                const existingSelected = selectedList.querySelector(`li .item-info p:first-child`);
                if (existingSelected && existingSelected.textContent === menuItem) {
                    const existingQuantity = parseInt(existingSelected.getAttribute("data-quantity"));
                    const existingTotalPrice = parseInt(existingSelected.getAttribute("data-total-price"));

                    existingSelected.setAttribute("data-quantity", existingQuantity + quantity);
                    existingSelected.setAttribute("data-total-price", existingTotalPrice + totalPrice);

                    quantityElement.textContent = 0; // Reset quantity

                    updateTotalPembelian();
                    updateTotal();
                } else {
                    listItem.classList.add("selected");
                    totalpembelian += totalPrice;

                    quantityElement.textContent = 0;
                    updateTotalPembelian();
                    updateTotal();

                    updateSelectedList(menuItem, price, quantity, totalPrice, imageSrc);
                }
            }
        }
    }
});