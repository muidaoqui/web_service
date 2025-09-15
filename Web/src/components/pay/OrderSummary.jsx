import React from 'react';

const OrderSummary = ({ plan, selectedYear, getDiscountPrice, employeeCode }) => {
    // Đảm bảo các giá trị được truyền vào là hợp lệ
    const validPlan = plan || { name: "", price: 0 };
    const validSelectedYear = selectedYear || 1;
    const price = getDiscountPrice(validSelectedYear);

    return (
        <div className="w-full md:w-80 bg-white rounded shadow p-6">
            <div className="font-bold mb-2">Tóm tắt đơn hàng</div>
            <div className="flex justify-between mb-1">
                <span>Hosting</span>
                <span>{validPlan.name}</span>
            </div>
            <div className="flex justify-between mb-1">
                <span>Tạm tính</span>
                <span>{price.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex justify-between mb-1">
                <span>Tổng tiền trước VAT</span>
                <span>{price.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex justify-between mb-1">
                <span>VAT</span>
                <span>Liên hệ</span>
            </div>
            <div className="flex justify-between mb-1 font-bold text-red-600">
                <span>Thành tiền</span>
                <span>{price.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Đã bao gồm VAT</div>
        </div>
    );
};

export default OrderSummary;