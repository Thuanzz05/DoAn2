document.addEventListener('DOMContentLoaded', function() {
    taiThongKe();
});

function taiThongKe() {
    // Đếm sản phẩm từ localStorage
    const danhSachSanPham = JSON.parse(localStorage.getItem('products') || '[]');
    document.getElementById('total-products').textContent = danhSachSanPham.length;

    // Đếm đơn hàng
    const danhSachDonHang = JSON.parse(localStorage.getItem('orders') || '[]');
    document.getElementById('total-orders').textContent = danhSachDonHang.length;

    // Đếm khách hàng
    const danhSachKhachHang = JSON.parse(localStorage.getItem('customers') || '[]');
    document.getElementById('total-customers').textContent = danhSachKhachHang.length;

    // Tính doanh thu từ các đơn hàng đã hoàn thành
    let tongDoanhThu = 0;
    danhSachDonHang.forEach(donHang => {
        if (donHang.status === 'completed') {
            tongDoanhThu += donHang.total || 0;
        }
    });
    document.getElementById('total-revenue').textContent = tongDoanhThu.toLocaleString('vi-VN') + '₫';
}