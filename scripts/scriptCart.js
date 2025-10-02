document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Lấy các phần tử DOM
    const cartEmptyMessage = document.querySelector('.cart-empty');
    const cartHasItemsMessage = document.querySelector('.cart-has-items');
    
    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        if (cartHasItemsMessage) cartHasItemsMessage.style.display = 'none';
    } else {
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
        if (cartHasItemsMessage) cartHasItemsMessage.style.display = 'block';
        updateCartDisplay();
    }
    
    // Sự kiện cập nhật giỏ hàng
    const updateCartButton = document.querySelector('.cart-update');
    if (updateCartButton) {
        updateCartButton.addEventListener('click', () => {
            updateCartDisplay();
            alert('Giỏ hàng đã được cập nhật!');
        });
    }
});

// Cập nhật giao diện giỏ hàng
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('.cart-table tbody');
    
    if (!cartTableBody) return;
    
    cartTableBody.innerHTML = '';
    
    // Thêm từng sản phẩm vào bảng giỏ hàng
    cart.forEach((item, index) => {
        // Đảm bảo price và quantity là số hợp lệ
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const subtotal = price * quantity;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="cart-product" data-label="Sản phẩm">
                <div class="cart-product-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-product-name"><a href="#">${item.name}</a></div>
            </td>
            <td class="cart-price" data-label="Giá">${price.toLocaleString()}₫</td>
            <td class="cart-quantity" data-label="Số lượng">
                <button class="quantity-btn" onclick="updateQuantity(${index}, ${quantity - 1})">-</button>
                <input type="number" value="${quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button class="quantity-btn" onclick="updateQuantity(${index}, ${quantity + 1})">+</button>
            </td>
            <td class="cart-subtotal" data-label="Tổng">${subtotal.toLocaleString()}₫</td>
            <td class="cart-remove" data-label="Xóa">
                <button onclick="removeItem(${index})">Xóa</button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });
    updateCartSummary();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    quantity = parseInt(quantity); 
    if (isNaN(quantity) || quantity < 1) quantity = 1;     // Kiểm tra và xác nhận giá trị nhập vào
    
    cart[index].quantity = quantity;     // Cập nhật số lượng sản phẩm trong giỏ hàng
    
    localStorage.setItem('cart', JSON.stringify(cart));     // Lưu lại giỏ hàng vào localStorage
    updateCartDisplay();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.splice(index, 1);     // Xóa sản phẩm khỏi giỏ hàng
    
    localStorage.setItem('cart', JSON.stringify(cart));     
    
    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        const cartEmptyMessage = document.querySelector('.cart-empty');
        const cartHasItemsMessage = document.querySelector('.cart-has-items');
        
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        if (cartHasItemsMessage) cartHasItemsMessage.style.display = 'none';
    } else {
        updateCartDisplay();
    }
}

//cập nhật tổng tiền
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const shipping = 0;
    const total = subtotal + shipping;
    
    //cập nhật 
    const subtotalElement = document.querySelector('.cart-summary-table tr:nth-child(1) td');
    const shippingElement = document.querySelector('.cart-summary-table tr:nth-child(2) td');
    const totalElement = document.querySelector('.cart-summary-table .total td');
    
    if (subtotalElement) subtotalElement.textContent = subtotal.toLocaleString() + '₫';
    if (shippingElement) shippingElement.textContent = shipping.toLocaleString() + '₫';
    if (totalElement) totalElement.textContent = total.toLocaleString() + '₫';
}
