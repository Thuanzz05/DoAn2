document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length > 0) {
        updateOrderSummary(cart);     // Hiển thị thông tin đơn hàng ở phần checkout nếu có sản phẩm
    } else {
        alert('Giỏ hàng của bạn đang trống!');
        window.location.href = 'cart.html';
    }

    // Xử lý sự kiện submit form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {             // Kiểm tra thông tin form
                processOrder(); // Xử lý đặt hàng
            }
        });
    }
});

// Cập nhật thông tin đơn hàng hiển thị
function updateOrderSummary(cart) {
    const productSummary = document.querySelector('.product-summary');
    if (!productSummary) return;
    
    productSummary.innerHTML = '';     // Xóa nội dung hiện tại
    
    let subtotal = 0;    // Tổng tiền tạm tính
    
    // Thêm từng sản phẩm vào phần tóm tắt đơn hàng
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;         // Tính tổng giá trị của mỗi sản phẩm
        subtotal += itemTotal;
        
        // Tạo HTML cho mỗi sản phẩm
        const productItemHTML = `
            <div class="product-item">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="product-details">
                    <h3>${item.name}</h3>
                    <p class="variant">Màu sắc: ${item.variant || 'Mặc định'}</p>
                    <p class="quantity">Số lượng: ${item.quantity}</p>
                    <p class="price">${item.price.toLocaleString()}₫</p>
                </div>
            </div>
        `;
        productSummary.innerHTML += productItemHTML;       
    });
    
    const shipping = subtotal >= 500000 ? 0 : 30000;
    const total = subtotal + shipping;     // Tổng cộng
    
    // Cập nhật thông tin giá
    const priceSummary = document.querySelector('.price-summary');
    if (priceSummary) {
        priceSummary.innerHTML = `
            <div class="price-row">
                <span>Tạm tính</span>
                <span>${subtotal.toLocaleString()}₫</span>
            </div>
            <div class="price-row">
                <span>Phí vận chuyển</span>
                <span>${shipping.toLocaleString()}₫</span>
            </div>
            <div class="price-row total">
                <span>Tổng cộng</span>
                <span>${total.toLocaleString()}₫</span>
            </div>
        `;
    }
}

