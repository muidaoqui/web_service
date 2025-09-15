import React from 'react';
import OrderSummary from './OrderSummary';

const Step1Cart = ({ plan, selectedYear, setSelectedYear, getDiscountPrice, onNext }) => (
    <div>
        <div className="mb-4 text-lg font-bold text-green-700">Còn 1 xíu nữa thôi, bạn đã có thể bắt đầu kinh doanh.</div>
        <div className="bg-green-100 border border-green-300 rounded p-3 mb-4 text-green-700 font-semibold">
            Hãy chọn dịch vụ bạn muốn thanh toán!
        </div>
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white rounded shadow p-6">
                <div className="flex items-center mb-2">
                    <input type="checkbox" checked readOnly className="accent-green-600 mr-2" />
                    <span className="font-bold text-lg">{plan.name}</span>
                    <span className="ml-auto font-bold text-green-700">{getDiscountPrice(selectedYear).toLocaleString('vi-VN')}đ</span>
                    <button className="ml-4 text-gray-400 hover:text-red-500" title="Xóa"><span>🗑️</span></button>
                </div>
                <div className="mt-2">
                    <select
                        className="border rounded px-2 py-1"
                        value={selectedYear}
                        onChange={e => setSelectedYear(Number(e.target.value))}
                    >
                        <option value={1}>1 năm</option>
                        <option value={2}>2 năm</option>
                        <option value={3}>3 năm</option>
                    </select>
                </div>
            </div>
            <OrderSummary 
                plan={plan} 
                selectedYear={selectedYear} 
                getDiscountPrice={getDiscountPrice} 
            />
        </div>
        <div className="w-full md:w-80 bg-white rounded shadow p-6 mt-4">
            <div className="font-bold mb-2">Nhân viên tư vấn</div>
            <input
                type="text"
                className="border rounded px-2 py-1 w-full mb-2"
                placeholder="Mã nhân viên"
            />
            <button className="bg-gray-200 px-3 py-1 rounded">Cập nhật</button>
        </div>
        <button
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-green-700 transition-all"
            onClick={onNext}
        >
            Tiếp tục thanh toán
        </button>
    </div>
);

export default Step1Cart;