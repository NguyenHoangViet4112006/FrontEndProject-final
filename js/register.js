document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#registerForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const fullname = document.getElementById('fullname').value.trim();
        const firstname = document.getElementById('firstname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const agree = document.getElementById('agree').checked;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullname || !firstname || !email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Email không đúng định dạng.");
            return;
        }

        if (password.length < 8) {
            alert("Mật khẩu phải có ít nhất 8 ký tự.");
            return;
        }

        if (!agree) {
            alert("Bạn phải đồng ý với điều khoản.");
            return;
        }

        const userData = {
            fullname: fullname,
            firstname: firstname,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(userData));
        alert("Đăng ký thành công! Chuyển đến trang đăng nhập.");
        window.location.href = "../pages/login.html";
    });
});