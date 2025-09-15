import React from 'react';
import OrderSummary from './OrderSummary';

const Step2UserInfo = ({ plan, selectedYear, getDiscountPrice, userForm, setUserForm, onBack, onUpdateAndNext, loading }) => (
    <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-green-700">Nhập thông tin khách hàng</h2>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Họ và tên</label>
                <input type="text" className="border rounded px-2 py-1 w-full" value={userForm.name} onChange={e => setUserForm({ ...userForm, name: e.target.value })} />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Email</label>
                <input type="email" className="border rounded px-2 py-1 w-full" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Số điện thoại</label>
                <input type="text" className="border rounded px-2 py-1 w-full" value={userForm.phone} onChange={e => setUserForm({ ...userForm, phone: e.target.value })} />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Địa chỉ</label>
                <input type="text" className="border rounded px-2 py-1 w-full" value={userForm.address} onChange={e => setUserForm({ ...userForm, address: e.target.value })} />
            </div>
            <div className="flex gap-2 mt-4">
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={onBack}>Quay lại</button>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={onUpdateAndNext}
                    disabled={loading}
                >
                    {loading ? "Đang cập nhật..." : "Cập nhật"}
                </button>
            </div>
        </div>
        <OrderSummary 
            plan={plan} 
            selectedYear={selectedYear} 
            getDiscountPrice={getDiscountPrice} 
        />
    </div>
);

export default Step2UserInfo;