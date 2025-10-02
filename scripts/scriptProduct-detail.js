//load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    initProductData();
    setupEventListeners();
    updateCartCount();
});

//Hàm khởi tạo dl sp từ các phần tử HTML
function initProductData() {
    productData = {
        id: getProductIdFromUrl() || '1', 
        name: document.querySelector('.product-title').textContent,
        price: parseFloat(document.querySelector('.current-price').textContent.replace(/[^\d]/g, '')),
        image: document.getElementById('main-product-image').src,
        category: document.querySelector('.product-category a').textContent,
        description: document.querySelector('.product-description').textContent.trim()
    };
}

// Hàm lấy ID sản phẩm từ URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

//Hàm thiết lập tất cả các sự kiện
function setupEventListeners() {
    setupQuantityButtons();
    setupAddToCartButton();
}

//Hàm thiết lập các nút thay đổi số lượng
function setupQuantityButtons() {
    const decreaseBtn = document.querySelector('.quantity-selector .quantity-btn:first-child');
    const increaseBtn = document.querySelector('.quantity-selector .quantity-btn:last-child');
    const quantityInput = document.querySelector('.quantity-input');
    
    // Xóa bỏ tất cả event listener hiện có (nếu có)
    decreaseBtn.replaceWith(decreaseBtn.cloneNode(true));
    increaseBtn.replaceWith(increaseBtn.cloneNode(true));
    
    // Lấy lại các phần tử 
    const newDecreaseBtn = document.querySelector('.quantity-selector .quantity-btn:first-child');
    const newIncreaseBtn = document.querySelector('.quantity-selector .quantity-btn:last-child');
    
    newDecreaseBtn.addEventListener('click', function() {     // Thêm event listener mới
        decreaseQuantity();
    });
    
    newIncreaseBtn.addEventListener('click', function() {
        increaseQuantity();
    });
}

// Hàm thiết lập nút thêm vào giỏ hàng
function setupAddToCartButton() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const buyNowBtn = document.querySelector('.buy-now-btn');
    
    // Xóa bỏ tất cả event listener hiện có 
    addToCartBtn.replaceWith(addToCartBtn.cloneNode(true));
    buyNowBtn.replaceWith(buyNowBtn.cloneNode(true));
    
    // Lấy lại các phần tử sau khi clone
    const newAddToCartBtn = document.querySelector('.add-to-cart-btn');
    const newBuyNowBtn = document.querySelector('.buy-now-btn');
    
    // Thêm event listener mới
    newAddToCartBtn.addEventListener('click', function() {
        addToCartFromDetail();
    });
    
    newBuyNowBtn.addEventListener('click', function() {
        addToCartFromDetail();
        // Chuyển hướng đến trang giỏ hàng
        window.location.href = 'Cart.html';
    });
}

// Các hàm thay đổi số lượng
function increaseQuantity() {
    const quantityInput = document.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
}

function decreaseQuantity() {
    const quantityInput = document.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}

// Hàm thêm sản phẩm vào giỏ hàng từ trang chi tiết
function addToCartFromDetail() {
    const quantity = parseInt(document.querySelector('.quantity-input').value);
    
    if (productData && productData.id) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];         // Lấy giỏ hàng hiện tại hoặc khởi tạo giỏ hàng rỗng

        const selectedVariant = document.querySelector('.variant-option.active')?.textContent || 'Mặc định';         // Lấy biến thể đã chọn nếu có
        
        const product = {
            id: productData.id,
            name: productData.name,
            price: productData.price,
            image: productData.image,
            quantity: quantity,
            variant: selectedVariant
        };

        const existingProductIndex = cart.findIndex(item =>          // Kiểm tra xem sản phẩm đã có trong giỏ với biến thể giống nhau chưa
            item.id === product.id && item.variant === product.variant);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;           
        } else {
            cart.push(product); 
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} đã được thêm vào giỏ hàng!`);
    } else {
        alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.');
    }
}

// Hàm cập nhật số lượng giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let totalItems = 0;     // Tính tổng số sản phẩm trong giỏ
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    
    const cartLinks = document.querySelectorAll('a[href*="cart"], a[href*="gio-hang"]');     // Tìm tất cả các liên kết giỏ hàng (nếu có nhiều liên kết trên header/menu)
    
    cartLinks.forEach(link => {
        if (link.textContent.includes('(')) {         //Kiểm tra nếu liên kết có chứa số lượng trong ngoặc
            link.textContent = link.textContent.replace(/\(\d+\)/, `(${totalItems})`);             // Thay thế số lượng cũ
        } else {
            link.textContent = `${link.textContent} (${totalItems})`;              // Thêm số lượng vào cuối văn bản
        }
    });
}