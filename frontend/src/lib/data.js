// Đối tượng lưu trữ các loại lọc
export const FilterType = {
    all: "Tất cả",
    active: "Đang làm",
    completed: " Hoàn thành",
}

//Tạo mảng để quản lý những tùy chọn trong bộ lọc
export const options = [
    {
        value: "today",
        label: "Hôm nay",
    },
    {
        value: "week",
        label: "Tuần này",
    },
    {
        value: "month",
        label: "Tháng này",
    },
    {
        value: "all",
        label: "Tất cả",
    },
]