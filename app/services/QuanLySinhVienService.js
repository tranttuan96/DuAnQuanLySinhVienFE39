var QuanLySinhVienService = function () {
    //Lớp đối tượng chứa các phương thức giao tiếp với server (BE)
    this.LayDanhSachSinhVien = function () {
        //promise
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
            method: 'GET',
        })
    }

    this.ThemSinhVien = function (sinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
            method: 'POST',
            data: sinhVien//Thuộc tính chứa dữ liệu đưa server (Lưu ý phải đúng object mẫu BE cung cấp)
        })
    }

    this.xoaSinhVien = function (maSinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/' + maSinhVien,
            method: 'DELETE',
        })
    }


    this.capNhatSinhVien = function (sinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/capnhatthongtinsinhvien',
            method: 'PUT',
            data: sinhVien//Thuộc tính chứa dữ liệu đưa server (Lưu ý phải đúng object mẫu BE cung cấp)
        })
    }

    this.layThongTinSinhVien = function (maSV) {

        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/laythongtinsinhvien/' + maSV,
            method: 'GET',
        })

    }


}
