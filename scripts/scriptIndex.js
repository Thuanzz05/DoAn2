// THÊM VÀO ĐẦU FILE scriptIndex.js

// Kiểm tra trạng thái đăng nhập và cập nhật menu
function updateMenuByLoginStatus() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isLoggedIn = userData && userData.isLoggedIn;
    
    const accountSubmenu = document.querySelector('.account-submenu');
    
    if (accountSubmenu) {
        if (isLoggedIn) {
            // Đã đăng nhập: Hiện "Quản lý tài khoản", ẩn "Đăng ký"
            accountSubmenu.innerHTML = `
                <li><a href="account.html"><i class="fas fa-user-circle"></i> Quản lý tài khoản</a></li>
                <li><a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a></li>
            `;
            
            // Thêm sự kiện đăng xuất
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Bạn có chắc muốn đăng xuất?')) {
                        localStorage.removeItem('userData');
                        alert('Đăng xuất thành công!');
                        location.reload();
                    }
                });
            }
        } else {
            // Chưa đăng nhập: Ẩn "Quản lý tài khoản", hiện "Đăng nhập" và "Đăng ký"
            accountSubmenu.innerHTML = `
                <li><a href="login-register.html" target="_blank"><i class="fas fa-sign-in-alt"></i> Đăng nhập</a></li>
                <li><a href="login-register.html#register" target="_blank" id="go-to-register"><i class="fas fa-user-plus"></i> Đăng ký</a></li>
            `;
        }
    }
}

// Gọi hàm khi load trang
document.addEventListener('DOMContentLoaded', function() {
    updateMenuByLoginStatus();
    
    // ... phần code cũ của bạn ở đây ...
});









// --slideshow--
var n = 5;
var i = 1;

function next(){
    if(i==n)
        i = 1;
    else
        i++;
    
    document.getElementById("slide").setAttribute("src","images/slide_"+i+".png")
}

function back(){
    if(i==1)
        i = n;
    else
        i--;
    
    document.getElementById("slide").setAttribute("src","images/slide_"+i+".png")
}

function autoPlay(){
    setInterval(next,3000);
}

// --back to top--
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }
    });
    $('#backtop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
});

// sk cuộn trang để ghim menu
window.onscroll = function() {
    const header = document.getElementById('header-bot');
    const sticky = header.offsetTop;

    if (window.pageYOffset > sticky) { 
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
};

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
}

// Hàm cập nhật số lượng giỏ hàng hiển thị
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        if (cartLink.textContent.includes('(')) {
            cartLink.textContent = cartLink.textContent.replace(/\(\d+\)/, `(${totalItems})`);
        } else {
            cartLink.innerHTML = `${cartLink.innerHTML} (${totalItems})`;
        }
    }
}

// ===== LOAD TRANG =====
document.addEventListener('DOMContentLoaded', function() {
	
	
	// Xử lý account dropdown cho mobile
	const accountDropdown = document.querySelector('.account-dropdown');
	if (accountDropdown) {
		const accountLink = accountDropdown.querySelector('a');
		
		accountLink.addEventListener('click', function(e) {
			if (window.innerWidth <= 768) {
				e.preventDefault();
				accountDropdown.classList.toggle('active');
				
				const icon = this.querySelector('.fa-angle-down');
				if (icon) {
					if (accountDropdown.classList.contains('active')) {
						icon.style.transform = 'rotate(180deg)';
					} else {
						icon.style.transform = 'rotate(0deg)';
					}
				}
			}
		});
	}
	
    
    // 1. XỬ LÝ MENU VÀ SIDEBAR CHO MOBILE
    const menuContainer = document.querySelector('#menu .container');
    if (menuContainer) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i> Menu chính';

        const headerBot = document.getElementById('header-bot');
        if (headerBot) {
            headerBot.insertBefore(menuToggle, headerBot.firstChild);
        }

        menuToggle.addEventListener('click', function() {
            menuContainer.classList.toggle('menu-active');
            const icon = this.querySelector('i');
            if (menuContainer.classList.contains('menu-active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        const sidebarToggle = document.createElement('div');
        sidebarToggle.className = 'sidebar-toggle';
        sidebarToggle.innerHTML = '<i class="fas fa-th-list"></i> Danh mục';

        if (sidebar.parentNode) {
            sidebar.parentNode.insertBefore(sidebarToggle, sidebar);
        }

        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-active');
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('sidebar-active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-th-list';
            }
        });
    }

    // Xử lý dropdown cho menu mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentNode.classList.toggle('dropdown-active');
                
                const icon = this.querySelector('i');
                if (this.parentNode.classList.contains('dropdown-active')) {
                    icon.className = 'fas fa-angle-up';
                } else {
                    icon.className = 'fas fa-angle-down';
                }
            }
        });
    });

    // 2. XỬ LÝ THÊM SẢN PHẨM VÀO GIỎ HÀNG - SẢN PHẨM BÁN CHẠY & SẢN PHẨM MỚI
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productItem = this.closest('.product-item') || this.closest('.new-product-item');
            
            if (productItem) {
                const productNameElement = productItem.querySelector('.product-name a') || 
                                         productItem.querySelector('.new-product-name a');
                
                if (!productNameElement) {
                    console.error('Không tìm thấy tên sản phẩm');
                    return;
                }
                
                const productName = productNameElement.textContent.trim();
                const productImage = productItem.querySelector('img').src;
                const priceElement = productItem.querySelector('.current-price');
                
                if (!priceElement) {
                    console.error('Không tìm thấy giá sản phẩm');
                    return;
                }
                
                const priceText = priceElement.textContent;
                const productPrice = parseInt(priceText.replace(/\D/g, ''));
                const productId = productName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                
                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };
                
                addToCart(product);
            } else {
                console.error('Không tìm thấy thông tin sản phẩm');
            }
        });
    });

    // 3. XỬ LÝ FLASH SALE CAROUSEL
    let currentSlide = 0;
    const totalSlides = 2;

    const productsWrapper = document.getElementById('productsWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateSlide() {
        if (!productsWrapper || !prevBtn || !nextBtn) return;
        
        productsWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlide();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // 4. XỬ LÝ THÊM SẢN PHẨM FLASH SALE VÀO GIỎ HÀNG
    const flashSaleAddToCartBtns = document.querySelectorAll('.fs-add-to-cart-btn');
    
    flashSaleAddToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const productCard = this.closest('.fs-product-card');
            if (!productCard) {
                console.error('Không tìm thấy fs-product-card');
                return;
            }

            const productNameElement = productCard.querySelector('.fs-product-name');
            const productImageElement = productCard.querySelector('.fs-product-image');
            const priceElement = productCard.querySelector('.fs-current-price');
            
            if (!productNameElement || !productImageElement || !priceElement) {
                console.error('Không tìm thấy các element cần thiết trong Flash Sale card');
                return;
            }

            const productName = productNameElement.textContent.trim();
            const productImage = productImageElement.src;
            const priceText = priceElement.textContent;
            const productPrice = parseInt(priceText.replace(/\D/g, ''));
            const productId = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            
            addToCart(product);

            // // Hiệu ứng visual feedback
            // const originalContent = this.innerHTML;
            // this.innerHTML = '<i class="fas fa-check"></i> Đã thêm!';
            // this.style.background = '#28a745';
            // this.style.borderColor = '#28a745';
            // this.style.color = 'white';
            
            // setTimeout(() => {
            //     this.innerHTML = originalContent;
            //     this.style.background = 'transparent';
            //     this.style.borderColor = '#c94a52';
            //     this.style.color = '#c94a52';
            // }, 2000);
        });
    });
    
    // 5. KHỞI TẠO CAROUSEL
    updateSlide();

    // 6. HỖ TRỢ TOUCH/SWIPE TRÊN MOBILE
    let touchStartX = 0;
    let touchEndX = 0;

    const flashSaleSection = document.getElementById('flash-sale-christmas');
    if (flashSaleSection) {
        flashSaleSection.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        flashSaleSection.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) nextSlide();
            if (touchEndX > touchStartX + 50) prevSlide();
        });
    }

    // 7. AUTO-PLAY CAROUSEL
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(function() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlide();
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    startAutoPlay();
    
    if (flashSaleSection) {
        flashSaleSection.addEventListener('mouseenter', stopAutoPlay);
        flashSaleSection.addEventListener('mouseleave', startAutoPlay);
    }

    // 8. CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG KHI LOAD TRANG
    updateCartCount();
});