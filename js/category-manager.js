// ==== Chức năng hiển thị/hủy modal ====

// Lấy các phần tử DOM liên quan đến modal
const openModalButton = document.getElementById('openModal'); // Nút mở modal
const closeModalButton = document.getElementById('closeModal'); // Nút đóng modal
const modal = document.getElementById('addCategoryModal'); // Modal thêm danh mục
const overlay = document.getElementById('overlay'); // Lớp phủ nền

// Bắt sự kiện click để mở modal
openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
});

// Bắt sự kiện click để đóng modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

// Đóng modal khi click ra ngoài (vào overlay)
overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});


// ==== Dữ liệu danh mục (data mẫu ban đầu) ====
let categories = [
    { code: "DM001", name: "Quần áo", status: "Đang hoạt động" },
    { code: "DM002", name: "Kính mắt", status: "Ngừng hoạt động" },
    { code: "DM003", name: "Giày dép", status: "Đang hoạt động" },
    { code: "DM004", name: "Thời trang nam", status: "Ngừng hoạt động" },
    { code: "DM005", name: "Thời trang nữ", status: "Ngừng hoạt động" },
    { code: "DM006", name: "Hoa quả", status: "Ngừng hoạt động" },
    { code: "DM007", name: "Rau", status: "Đang hoạt động" },
    { code: "DM008", name: "Điện thoại", status: "Đang hoạt động" },
    { code: "DM009", name: "Ốp lưng", status: "Đang hoạt động" }
];

// Biến để lưu dữ liệu sau khi lọc
let filteredData = [...categories];
const itemsPerPage = 8; // Số mục trên mỗi trang
let currentPage = 1; // Trang hiện tại


// ==== Hàm hiển thị dữ liệu lên bảng ====
function renderTableData() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Xóa dữ liệu cũ

    // Tính chỉ mục bắt đầu và kết thúc của trang hiện tại
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredData.slice(start, end); // Dữ liệu trang hiện tại

    // Tạo hàng dữ liệu và thêm vào bảng
    pageItems.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td><span class="${item.status === 'Đang hoạt động' ? 'active' : 'inactive'}">${item.status}</span></td>
            <td>
                <img src="../assets/icons/trash-icon.png" alt="Xóa" class="delete-icon">
                <img src="../assets/icons/pencil-icon.png" alt="Sửa" class="edit-icon">
            </td>
        `;
        tbody.appendChild(row);
    });
}


// ==== Hàm hiển thị phân trang ====
function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    // Nút quay lại trang trước
    const prevBtn = document.createElement("a");
    prevBtn.innerHTML = "&larr;";
    prevBtn.href = "#";
    prevBtn.classList.add("prev-page");
    prevBtn.onclick = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderTableData();
            renderPagination();
        }
    };
    pagination.appendChild(prevBtn);

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("a");
        pageBtn.innerText = i;
        pageBtn.href = "#";
        if (i === currentPage) pageBtn.classList.add("active-page");
        pageBtn.onclick = (e) => {
            e.preventDefault();
            currentPage = i;
            renderTableData();
            renderPagination();
        };
        pagination.appendChild(pageBtn);
    }

    // Nút sang trang tiếp theo
    const nextBtn = document.createElement("a");
    nextBtn.innerHTML = "&rarr;";
    nextBtn.href = "#";
    nextBtn.classList.add("next-page");
    nextBtn.onclick = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderTableData();
            renderPagination();
        }
    };
    pagination.appendChild(nextBtn);
}


// ==== Hàm lọc dữ liệu theo tên và trạng thái ====
function applyFilters() {
    const searchInput = document.querySelector(".search-box input").value.toLowerCase(); // Tên danh mục cần tìm
    const statusFilter = document.querySelector("#statusFilter").value; // Trạng thái được chọn

    // Lọc dữ liệu theo từ khóa tìm kiếm và trạng thái
    filteredData = categories.filter(item => {
        const matchName = item.name.toLowerCase().includes(searchInput);
        const matchStatus =
            !statusFilter ||
            (item.status === "Đang hoạt động" && statusFilter === "active") ||
            (item.status === "Ngừng hoạt động" && statusFilter === "inactive");
        return matchName && matchStatus;
    });

    currentPage = 1; // Reset về trang đầu tiên
    renderTableData();
    renderPagination();
}


// ==== Gán sự kiện cho ô tìm kiếm và bộ lọc trạng thái ====
document.querySelector(".search-box input").addEventListener("input", applyFilters);
document.querySelector("#statusFilter").addEventListener("change", applyFilters);


// ==== Xử lý thêm danh mục mới ====
document.querySelector("#addCategoryform").addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn submit mặc định

    // Lấy giá trị từ form
    const code = document.querySelector("#categoryCode").value.trim();
    const name = document.querySelector("#categoryName").value.trim();
    const status = document.querySelector("input[name='status']:checked")?.value;

    // Kiểm tra hợp lệ
    if (!code || !name) {
        alert("Vui lòng nhập đầy đủ mã và tên danh mục.");
        return;
    }

    // Kiểm tra trùng mã
    const codeExists = categories.some(cat => cat.code === code);
    if (codeExists) {
        alert("Mã danh mục đã tồn tại.");
        return;
    }

    // Kiểm tra trùng tên
    const nameExists = categories.some(cat => cat.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
        alert("Tên danh mục đã tồn tại.");
        return;
    }

    // Thêm danh mục mới vào danh sách
    const newCategory = {
        code,
        name,
        status: status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"
    };
    categories.push(newCategory);

    applyFilters(); // Cập nhật bảng
    alert("Thêm danh mục thành công!");

    // Đóng modal và reset form
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.querySelector("#addCategoryform").reset();
});


// ==== Xử lý sự kiện xóa và chỉnh sửa danh mục ====
document.querySelector("tbody").addEventListener("click", function (e) {
    // Xử lý xóa
    if (e.target && e.target.classList.contains("delete-icon")) {
        if (categories.length === 1) {
            alert("Không thể xóa, vì danh mục chỉ còn 1 mục duy nhất.");
            return;
        }

        const row = e.target.closest("tr");
        const categoryCode = row.querySelector("td").textContent;

        const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa danh mục "${categoryCode}"?`);
        if (confirmDelete) {
            filteredData = filteredData.filter(item => item.code !== categoryCode);
            categories = categories.filter(item => item.code !== categoryCode);
            renderTableData();
            renderPagination();
        }
    }

    // Xử lý sửa
    if (e.target && e.target.classList.contains("edit-icon")) {
        const row = e.target.closest("tr");
        const code = row.children[0].textContent.trim();
        const name = row.children[1].textContent.trim();
        const statusText = row.children[2].textContent.trim();

        const newName = prompt("Chỉnh sửa tên danh mục:", name);
        if (!newName) return;

        // Kiểm tra tên mới có bị trùng không
        const nameExists = categories.some(cat => cat.name.toLowerCase() === newName.toLowerCase() && cat.code !== code);
        if (nameExists) {
            alert("Tên danh mục đã tồn tại.");
            return;
        }

        // Xác nhận cập nhật trạng thái
        const newStatus = confirm("Bạn có muốn đặt trạng thái là 'Đang hoạt động'?") ? "Đang hoạt động" : "Ngừng hoạt động";

        // Cập nhật dữ liệu
        filteredData = filteredData.map(item =>
            item.code === code ? { ...item, name: newName, status: newStatus } : item
        );
        categories = categories.map(item =>
            item.code === code ? { ...item, name: newName, status: newStatus } : item
        );

        renderTableData();
        renderPagination();
        alert("Chỉnh sửa danh mục thành công!");
    }
});
// ==== Gọi hàm khởi tạo ban đầu ====
applyFilters();