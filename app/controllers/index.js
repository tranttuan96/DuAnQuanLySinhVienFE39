



var renderTableSV = function (result) {
    var noiDung = '';
    //Duyệt kết quả sinh viên trả về
    for (var i = 0; i < result.data.length; i++) {
        var sinhVien = result.data[i];
        //Hàm làm tròn .toFixed => lấy ra 2 số làm tròn
        var dtb = ((sinhVien.DiemToan + sinhVien.DiemLy + sinhVien.DiemHoa) / 3).toFixed(2);
        //Mỗi lần duyệt dùng dữ liệu 1 sinh viên tạo ra 1 tr sinh viên tương ứng
        noiDung += `
            <tr>
                <td>${sinhVien.MaSV}</td>
                <td>${sinhVien.HoTen}</td>
                <td>${sinhVien.Email}</td>
                <td>${sinhVien.SoDT}</td>
                <td>${sinhVien.CMND}</td>
                <td>${sinhVien.DiemToan}</td>
                <td>${sinhVien.DiemLy}</td>
                <td>${sinhVien.DiemHoa}</td>
                <td>${dtb}</td>
                <td>
                    <button class="btn btn-primary btnSua" onclick="suaSinhVien('${sinhVien.MaSV}')">Sửa</button>
                    <button class="btn btn-danger btnXoa" onclick="xoaSinhVien('${sinhVien.MaSV}')">Xoá</button>
                </td>
            </tr>
        `;
    }
    document.querySelector('#tblSinhVien').innerHTML = noiDung;
}


var suaSinhVien = function (maSV){
    // console.log(maSV)
    //Bước 1: Open popup modal => gọi nút thêm sinh viên click để lợi dụng mở modal
    document.querySelector('#btnThemSinhVien').click();
    //Bước 2: Chỉnh sửa title và nút xử lý của modal
    document.querySelector('.modal-title').innerHTML = 'Cập nhật thông tin sinh viên';
    document.querySelector('.modal-footer').innerHTML = `
        <button class='btn btn-primary btn-capnhat' onclick='capNhatSinhVien()'> Lưu </button>
    `;
    //Bước 3: Dùng mã sinh viên để lấy thông tin sinh viên từ server qua api
    sinhVienService.layThongTinSinhVien(maSV).then(function (res) {
        //Lấy đối tượng sinh viên từ server trả về gán cho biến sinh viên
        var sinhVien = res.data;
        //B4: sau khi lấy data từ server về load lại trên các control input
        domSelect('#MaSV').value = sinhVien.MaSV;
        domSelect('#HoTen').value = sinhVien.HoTen;
        domSelect('#Email').value = sinhVien.Email;
        domSelect('#CMND').value = sinhVien.CMND;
        domSelect('#SoDT').value = sinhVien.SoDT;
        domSelect('#DiemToan').value = sinhVien.DiemToan;
        domSelect('#DiemLy').value = sinhVien.DiemLy;
        domSelect('#DiemHoa').value = sinhVien.DiemHoa;
    }).catch(function(err) {
        console.log(err)
    })
}

var domSelect = function (selector){
    return document.querySelector(selector);
}


var capNhatSinhVien = function(){
    //Khi bấm nút lưu thì sẽ lấy thông tin từ người dùng nhập vào sau khi sửa => gọi pthức lưư api
    var MaSV = document.querySelector('#MaSV').value;
    var HoTen = document.querySelector('#HoTen').value;
    var Email = document.querySelector('#MaSV').value;
    var SoDT = document.querySelector('#SoDT').value;
    var CMND = document.querySelector('#CMND').value;
    var DiemToan = document.querySelector('#DiemToan').value;
    var DiemLy = document.querySelector('#DiemLy').value;
    var DiemHoa = document.querySelector('#DiemHoa').value;

    //Tạo object chứa thông tin người dùng
    var svUpdate = new SinhVien(MaSV, HoTen, Email, SoDT, CMND, DiemToan, DiemLy, DiemHoa);
    console.log('dataUpdate',svUpdate)
    //Gọi sv đưa dữ liệu về api
    sinhVienService.capNhatSinhVien(svUpdate).then(function(res) {
        
        console.log(res)
        //Nếu thành công sẽ load lại trang
        location.reload();
    }).catch(function(err) {
        console.log(err);
    })
}

var xoaSinhVien = function (maSV) {
    var cfDialog = confirm(`Bạn có muốn xoá sinh viên ${maSV} này không ?`);
    if (cfDialog === true) {
        sinhVienService.xoaSinhVien(maSV).then(function (result) {
            location.reload();
        }).catch(function (err) {
            alert('xoá thất bại');
        })
    }
}


//tạo đối tượng  từ lớp đối tượng QuanLySinhVienService để gọi api
var sinhVienService = new QuanLySinhVienService();
var promiseGetSinhVien = sinhVienService.LayDanhSachSinhVien();
promiseGetSinhVien.then(renderTableSV).catch(function (err) {

})


//Cài đặt tính năng cho nút thêm sinh viên
document.querySelector('#btnThemSinhVien').onclick = function () {

    //Thay đổi model heading
    document.querySelector('.modal-title').innerHTML = 'THÊM SINH VIÊN';
    //Thêm nút thêm sinh viên
    document.querySelector('.modal-footer').innerHTML = `
        <button class='btn btn-success btnTaoMoiSinhVien' onclick="themMoiNhanVien()">Tạo mới SV</button>
    `
}

// document.querySelector('.btnTaoMoiSinhVien').addEventListener('click', function (){
//     alert(1);
// })


var themMoiNhanVien = function () {
    //Lấy thông tin  người dùng nhập từ giao diện vào
    var MaSV = document.querySelector('#MaSV').value;
    var HoTen = document.querySelector('#HoTen').value;
    var Email = document.querySelector('#MaSV').value;
    var SoDT = document.querySelector('#SoDT').value;
    var CMND = document.querySelector('#CMND').value;
    var DiemToan = document.querySelector('#DiemToan').value;
    var DiemLy = document.querySelector('#DiemLy').value;
    var DiemHoa = document.querySelector('#DiemHoa').value;

    //Tạo object chứa thông tin người dùng
    var sv = new SinhVien(MaSV, HoTen, Email, SoDT, CMND, DiemToan, DiemLy, DiemHoa);

    //Gọi api BE đưa thông tin lên server lưu trữ
    sinhVienService.ThemSinhVien(sv).then(function (result) {
        console.log('thành công');
        //Load lại trang để gọi lại api layDanhSachSinhVien kiểm tra
        location.reload();
    }).catch(function (err) {
        console.log(err.response.data);
        //Load lại trang để gọi lại api layDanhSachSinhVien kiểm tra
        location.reload();

    })
}

//Cài đặt sự kiện cách này không được vì lúc chạy hàm này nút sửa chưa có trên giao  diện => chưa thể cài đặt sự onclick được
// document.querySelector('.btnSua').onclick = function(){
//     alert(1)
// }