// Khởi tạo khi load trang
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    const isLoggedIn = checkLogin();
    if (!isLoggedIn) {
        alert('Vui lòng đăng nhập để sử dụng chức năng này!');
        window.location.href = 'login-register.html';
        return;
    }

    // Load dữ liệu người dùng
    loadUserData();

    // Xử lý menu sidebar
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });

    // Xử lý form chỉnh sửa thông tin
    document.getElementById('edit-form').addEventListener('submit', handleEditSubmit);

    // Xử lý form đổi mật khẩu
    document.getElementById('password-form').addEventListener('submit', handlePasswordSubmit);
});

// Kiểm tra đăng nhập
function checkLogin() {
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
        try {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData.isLoggedIn) {
                return true;
            }
        } catch (e) {
            console.error('Lỗi parse userData:', e);
        }
    }
    
    return false;
}

// Load dữ liệu người dùng từ localStorage
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) return;
    
    // Hiển thị thông tin trên tab "Thông tin tài khoản"
    document.getElementById('display-name').textContent = userData.name || 'Chưa cập nhật';
    document.getElementById('display-email').textContent = userData.email || 'Chưa cập nhật';
    document.getElementById('display-phone').textContent = userData.phone || 'Chưa cập nhật';
    document.getElementById('display-address').textContent = userData.address || 'Chưa cập nhật';
    document.getElementById('display-joindate').textContent = userData.joinDate || 'Chưa cập nhật';

    // Load vào form edit
    document.getElementById('edit-name').value = userData.name || '';
    document.getElementById('edit-phone').value = userData.phone || '';
    document.getElementById('edit-address').value = userData.address || '';
}

// Chuyển section
function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

    hideAllAlerts();
}

// Xử lý cập nhật thông tin
function handleEditSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('edit-name').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const address = document.getElementById('edit-address').value.trim();

    // Validate số điện thoại
    const phoneRegex = /^[0-9]{10}$/;
    if (phone && !phoneRegex.test(phone)) {
        showAlert('edit-error');
        return;
    }

    // Validate tên không rỗng
    if (!name) {
        showAlert('edit-error');
        return;
    }

    // Lấy dữ liệu hiện tại
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // Cập nhật thông tin mới
    userData.name = name;
    userData.phone = phone;
    userData.address = address;
    
    // Lưu lại
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Cập nhật vào danh sách accounts
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const accountIndex = accounts.findIndex(acc => acc.email === userData.email);
    
    if (accountIndex !== -1) {
        accounts[accountIndex].name = name;
        accounts[accountIndex].phone = phone;
        accounts[accountIndex].address = address;
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    // Cập nhật hiển thị
    loadUserData();

    // Hiển thị thông báo thành công
    showAlert('edit-success');

    // Chuyển về tab xem thông tin sau 1.5s
    setTimeout(() => {
        switchSection('info');
    }, 1500);
}

// Xử lý đổi mật khẩu
function handlePasswordSubmit(e) {
    e.preventDefault();

    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate mật khẩu mới phải khớp
    if (newPassword !== confirmPassword) {
        showAlert('password-error');
        return;
    }

    // Validate độ dài mật khẩu
    if (newPassword.length < 6) {
        showAlert('password-error');
        return;
    }

    // Lấy thông tin user hiện tại
    const userData = JSON.parse(localStorage.getItem('userData'));
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
    // Tìm account trong danh sách
    const accountIndex = accounts.findIndex(acc => acc.email === userData.email);
    
    if (accountIndex !== -1) {
        // Kiểm tra mật khẩu cũ
        if (accounts[accountIndex].password !== currentPassword) {
            alert('Mật khẩu hiện tại không đúng!');
            showAlert('password-error');
            return;
        }
        
        // Cập nhật mật khẩu mới
        accounts[accountIndex].password = newPassword;
        localStorage.setItem('accounts', JSON.stringify(accounts));
        
        // Hiển thị thông báo thành công
        showAlert('password-success');
        
        // Reset form
        document.getElementById('password-form').reset();
        
        alert('Đổi mật khẩu thành công!');
    }
}

// Hiển thị alert
function showAlert(alertId) {
    hideAllAlerts();
    const alert = document.getElementById(alertId);
    if (alert) {
        alert.classList.add('show');

        setTimeout(() => {
            alert.classList.remove('show');
        }, 3000);
    }
}

// Ẩn tất cả alert
function hideAllAlerts() {
    document.querySelectorAll('.alert').forEach(a => a.classList.remove('show'));
}

// Hủy chỉnh sửa
function cancelEdit() {
    loadUserData();
    switchSection('info');
}

// Đăng xuất
function handleLogout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        // Xóa session
        localStorage.removeItem('userData');
        
        alert('Đăng xuất thành công!');
        window.location.href = 'index.html';
    }
}

// Load đơn hàng (mở rộng sau)
function loadOrders() {
    const orders = [];
    
    const ordersContainer = document.getElementById('orders-container');
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <p style="text-align: center; color: #666; padding: 40px 0;">
                <i class="fas fa-box-open" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                Bạn chưa có đơn hàng nào
            </p>
        `;
    }
}