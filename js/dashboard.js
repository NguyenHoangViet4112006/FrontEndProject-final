document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault(); // Ngăn hành vi mặc định
            const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");
            if (confirmLogout) {
                // Xoá thông tin đăng nhập
                // localStorage.removeItem("user");

                window.location.href = "../pages/login.html"; // Đường dẫn
            }
        });
    }
});