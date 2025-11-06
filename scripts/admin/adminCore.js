// Kiểm tra đăng nhập admin
function checkAdminLogin() {
    const adminData = localStorage.getItem('adminData');
    
    if (!adminData) {
        alert('Vui lòng đăng nhập để truy cập trang quản trị!');
        window.location.href = 'admin-login.html';
        return false;
    }
    
    try {
        const admin = JSON.parse(adminData);
        
        if (!admin.isAdmin) {
            alert('Bạn không có quyền truy cập trang này!');
            window.location.href = 'index.html';
            return false;
        }
            // Hiển thị tên admin
        displayAdminInfo(admin);
        return true;
    } catch (e) {
        console.error('Lỗi parse adminData:', e);
        alert('Phiên đăng nhập không hợp lệ!');
        window.location.href = 'admin-login.html';
        return false;
    }
}

//Hiển thị thông tin admin trên header
function displayAdminInfo(admin) {
    const userNameElement = document.querySelector('.user-info span');
    if (userNameElement && admin.name) {
        userNameElement.textContent = admin.name;
    }
}

// Xử lý đăng xuất
function handleLogout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('adminData');
        alert('Đã đăng xuất thành công!');
        window.location.href = 'admin-login.html';
    }
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập admin
    if (!checkAdminLogin()) {
        return;
    }
});
