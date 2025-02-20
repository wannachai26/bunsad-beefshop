// สร้างตัวแปรสำหรับเก็บรายการสินค้าในตะกร้า
let cart = [];

// ฟังก์ชันเพิ่มสินค้าในตะกร้า
function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++; // เพิ่มจำนวนสินค้าหากมีอยู่แล้ว
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
}

// ฟังก์ชันอัปเดตรายการในตะกร้า
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    cartItemsContainer.innerHTML = ''; // ล้างตารางเดิม
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        cartItemsContainer.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>${item.price} บาท</td>
                <td>${itemTotal} บาท</td>
                <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">ลบ</button></td>
            </tr>
        `;
    });

    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // จำนวนรวมสินค้า
    totalPriceElement.textContent = totalPrice; // ราคาสินค้ารวม
}

// ฟังก์ชันเปลี่ยนจำนวนสินค้า
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // ลบสินค้าถ้าจำนวนเป็น 0 หรือต่ำกว่า
    }
    updateCart();
}

// ฟังก์ชันลบสินค้าออกจากตะกร้า
function removeFromCart(index) {
    cart.splice(index, 1); // ลบสินค้าตามตำแหน่ง
    updateCart();
}

// ฟังก์ชันสลับไปยังหน้าช่องทางการชำระเงิน
function goToPayment() {
    document.getElementById('cart-section').style.display = 'none'; // ซ่อนส่วนตะกร้าสินค้า
    document.getElementById('payment-section').style.display = 'block'; // แสดงส่วนชำระเงิน
    document.getElementById('confirm-button').style.display = 'inline-block';
    document.getElementById('next-button').style.display = 'none';
}

// ฟังก์ชันย้อนกลับไปที่ตะกร้าสินค้า
document.getElementById('backToCart').addEventListener('click', function () {
    document.getElementById('payment-section').style.display = 'none'; // ซ่อนส่วนชำระเงิน
    document.getElementById('cart-section').style.display = 'block'; // แสดงส่วนตะกร้าสินค้า
    document.getElementById('confirm-button').style.display = 'none';
    document.getElementById('next-button').style.display = 'inline-block';
});

document.addEventListener("DOMContentLoaded", function () {
    const paymentMethodSelect = document.getElementById("paymentMethod");
    const bankDetails = document.getElementById("bank-details");

    if (bankDetails) bankDetails.style.display = "none";

    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener("change", function () {
            if (paymentMethodSelect.value === "transfer") {
                bankDetails.style.display = "block"; // แสดงข้อมูลบัญชีธนาคาร
            } else {
                bankDetails.style.display = "none"; // ซ่อนเมื่อเลือกช่องทางอื่น
            }
        });
    }
});


// ฟังก์ชันยืนยันการชำระเงิน
function confirmPayment() {
    const paymentMethod = document.getElementById('paymentMethod').value;

    // ตรวจสอบว่าตะกร้ามีสินค้าอยู่หรือไม่
    if (cart.length === 0) {
        alert('กรุณาเลือกสินค้าเข้าตะกร้าก่อนทำการชำระเงิน');
        return;
    }

    if (!paymentMethod) {
        alert('กรุณาเลือกช่องทางการชำระเงิน');
        return;
    }

    if (paymentMethod === 'transfer') {
        alert('กรุณาโอนเงินเข้าบัญชีที่กำหนดและแนบหลักฐาน');
    } else if (paymentMethod === 'cod') {
        alert('ระบบจะจัดส่งสินค้าพร้อมเก็บเงินปลายทาง');
    } 

    cart = []; // ล้างตะกร้าหลังชำระเงิน
    updateCart();

    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();

    alert('ขอบคุณสำหรับการสั่งซื้อ! การชำระเงินเสร็จสมบูรณ์.');
}




