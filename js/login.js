document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn form gửi đi



    const correctPassword = "12345678";
    const inputEmail = document.getElementById('email').value;
    const inputPassword = document.getElementById('password').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    
        if (!emailRegex.test(inputEmail)) {
        alert("Email không đúng định dạng.");
    } else if (inputPassword !== correctPassword) {
        alert("Mật khẩu không đúng.");
    } else {
        alert("Đăng nhập thành công!");
        window.location.href = "../pages/dashboard.html";
    }
});