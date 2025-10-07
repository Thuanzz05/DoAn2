// //Lấy các phần tử - Kiểm tra tồn tại trước
// const loginTab = document.getElementById('login-tab');
// const registerTab = document.getElementById('register-tab');
// const loginForm = document.getElementById('login-form');
// const registerForm = document.getElementById('register-form');
// const goToRegisterButton = document.getElementById('go-to-register'); //Nút ĐK trên thanh điều hướng

// // Chỉ chạy code nếu các element tồn tại (tức là đang ở trang login-register.html)
// if (loginTab && registerTab && loginForm && registerForm) {
    // //Kiểm tra URL khi trang tải để xác định nên hiển thị tab nào
    // document.addEventListener('DOMContentLoaded', function() {
        // if (window.location.hash === '#register') {     //Nếu URL có chứa #register, hiển thị tab đăng ký
            // activateRegisterTab();
        // }
    // });

    // // Hàm kích hoạt tab đăng ký
    // function activateRegisterTab() {
        // registerTab.classList.add('active');
        // loginTab.classList.remove('active');
        
        // registerForm.classList.add('active');
        // loginForm.classList.remove('active');
    // }

    // // Hàm kích hoạt tab đăng nhập
    // function activateLoginTab() {
        // loginTab.classList.add('active');
        // registerTab.classList.remove('active');
        
        // loginForm.classList.add('active');
        // registerForm.classList.remove('active');
    // }

    // //Thêm sự kiện click cho tab đăng nhập
    // loginTab.addEventListener('click', function() {
        // activateLoginTab();
        // history.pushState(null, null, 'login-register.html#login');
    // });

    // //Thêm sự kiện click cho tab đăng ký
    // registerTab.addEventListener('click', function() {
        // activateRegisterTab();
        // history.pushState(null, null, 'login-register.html#register');     // Cập nhật URL
    // });

    // // Xử lý sự kiện submit form đăng nhập
    // loginForm.addEventListener('submit', function(e) {
        // e.preventDefault(); // Ngăn chặn form submit
        // const emailElement = document.getElementById('login-email');
        // const passwordElement = document.getElementById('login-password');
        
        // if (emailElement && passwordElement) {
            // const email = emailElement.value;
            // const password = passwordElement.value;
            
            // // Logic đăng nhập
            // console.log('Đăng nhập với:', email, password);
            // alert('Đăng nhập thành công!');
            // window.location.href = "index.html"; 
        // }
    // });

    // // Xử lý sự kiện submit form đăng ký
    // registerForm.addEventListener('submit', function(e) {
        // e.preventDefault(); 
        // const nameElement = document.getElementById('register-name');
        // const emailElement = document.getElementById('register-email');
        // const passwordElement = document.getElementById('register-password');
        // const confirmElement = document.getElementById('register-confirm');
        
        // if (nameElement && emailElement && passwordElement && confirmElement) {
            // const name = nameElement.value;
            // const email = emailElement.value;
            // const password = passwordElement.value;
            // const confirm = confirmElement.value;
            
            // if (password !== confirm) {     // Kiểm tra mật khẩu khớp
                // alert('Mật khẩu không khớp!');
                // return;
            // }
            // console.log('Đăng ký với:', name, email, password);     // Logic đăng ký
            // alert('Đăng ký thành công!');
        // }
    // });
// }

// // Xử lý sự kiện click cho nút đăng ký trên thanh điều hướng (có thể có trên mọi trang)
// if (goToRegisterButton) {
    // goToRegisterButton.addEventListener('click', function(e) {
        // // Có thể thêm logic ở đây nếu cần
    // });
// }




// Lấy các phần tử
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const goToRegisterButton = document.getElementById('go-to-register');

// Chỉ chạy code nếu các element tồn tại
if (loginTab && registerTab && loginForm && registerForm) {
    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.hash === '#register') {
            activateRegisterTab();
        }
    });

    function activateRegisterTab() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    function activateLoginTab() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    }

    loginTab.addEventListener('click', function() {
        activateLoginTab();
        history.pushState(null, null, 'login-register.html#login');
    });

    registerTab.addEventListener('click', function() {
        activateRegisterTab();
        history.pushState(null, null, 'login-register.html#register');
    });

    // XỬ LÝ ĐĂNG NHẬP
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailElement = document.getElementById('login-email');
        const passwordElement = document.getElementById('login-password');
        
        if (emailElement && passwordElement) {
            const emailOrUsername = emailElement.value.trim();
            const password = passwordElement.value;
            
            // Lấy danh sách tài khoản từ localStorage
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            
            // Tìm tài khoản khớp
            const account = accounts.find(acc => 
                (acc.email === emailOrUsername || acc.name === emailOrUsername) && 
                acc.password === password
            );
            
            if (account) {
                // Lưu trạng thái đăng nhập
                const userData = {
                    isLoggedIn: true,
                    name: account.name,
                    email: account.email,
                    phone: account.phone || '',
                    address: account.address || '',
                    joinDate: account.joinDate
                };
                
                localStorage.setItem('userData', JSON.stringify(userData));
                
                alert('Đăng nhập thành công!');
                window.location.href = "index.html";
            } else {
                alert('Email/Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        }
    });

    // XỬ LÝ ĐĂNG KÝ
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameElement = document.getElementById('register-name');
        const emailElement = document.getElementById('register-email');
        const passwordElement = document.getElementById('register-password');
        const confirmElement = document.getElementById('register-confirm');
        
        if (nameElement && emailElement && passwordElement && confirmElement) {
            const name = nameElement.value.trim();
            const email = emailElement.value.trim();
            const password = passwordElement.value;
            const confirm = confirmElement.value;
            
            // Kiểm tra mật khẩu khớp
            if (password !== confirm) {
                alert('Mật khẩu không khớp!');
                return;
            }
            
            // Kiểm tra độ dài mật khẩu
            if (password.length < 6) {
                alert('Mật khẩu phải có ít nhất 6 ký tự!');
                return;
            }
            
            // Lấy danh sách tài khoản hiện có
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            
            // Kiểm tra email đã tồn tại
            if (accounts.some(acc => acc.email === email)) {
                alert('Email này đã được đăng ký!');
                return;
            }
            
            // Kiểm tra tên đã tồn tại
            if (accounts.some(acc => acc.name === name)) {
                alert('Tên người dùng này đã tồn tại!');
                return;
            }
            
            // Tạo tài khoản mới
            const newAccount = {
                name: name,
                email: email,
                password: password,
                phone: '',
                address: '',
                joinDate: new Date().toLocaleDateString('vi-VN')
            };
            
            // Thêm vào danh sách và lưu
            accounts.push(newAccount);
            localStorage.setItem('accounts', JSON.stringify(accounts));
            
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            
            // Chuyển sang tab đăng nhập
            activateLoginTab();
            registerForm.reset();
        }
    });
}

if (goToRegisterButton) {
    goToRegisterButton.addEventListener('click', function(e) {
        // Logic nếu cần
    });
}