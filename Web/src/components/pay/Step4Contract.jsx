import React, {useState} from 'react';
import OrderSummary from './OrderSummary';

const Step4Contract = ({ plan, selectedYear, getDiscountPrice, userForm, employeeCode, onBack, onNext }) => {
    const [agreed, setAgreed] = useState(false);
    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white rounded shadow p-6">
                <h2 className="text-xl font-bold mb-4 text-green-700">Hợp đồng & Điều khoản dịch vụ</h2>
                
                {/* Thông tin hợp đồng */}
                <div className="mb-6 border-b pb-4">
                    <div className="font-semibold mb-2">Thông tin hợp đồng dịch vụ</div>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Dịch vụ: Hosting - {plan.name}</li>
                        <li>Thời hạn: {selectedYear} năm</li>
                        <li>Tổng giá trị hợp đồng: {getDiscountPrice(selectedYear).toLocaleString('vi-VN')}đ</li>
                        <li>Khách hàng: {userForm.name} ({userForm.email})</li>
                        <li>Ngày tạo: {new Date().toLocaleDateString('vi-VN')}</li>
                    </ul>
                </div>
                
                {/* Các điều khoản dịch vụ */}
                <div className="mb-6">
                    <div className="font-semibold mb-2">Các điều khoản chung</div>
                    <div className="max-h-64 overflow-y-auto bg-gray-50 p-4 border rounded">
                        <p className="mb-2 text-sm text-gray-600">
                            1. **Phạm vi dịch vụ:** Chúng tôi cam kết cung cấp dịch vụ hosting với các thông số đã nêu. Mọi thay đổi về cấu hình hoặc dịch vụ sẽ được thông báo trước.
                        </p>
                        <p className="mb-2 text-sm text-gray-600">
                            2. **Thanh toán:** Khách hàng có trách nhiệm thanh toán đầy đủ và đúng hạn theo hóa đơn. Việc chậm trễ thanh toán có thể dẫn đến việc tạm ngưng hoặc chấm dứt dịch vụ.
                        </p>
                        <p className="mb-2 text-sm text-gray-600">
                            3. **Trách nhiệm của Khách hàng:** Khách hàng phải tuân thủ các quy định về sử dụng dịch vụ, không sử dụng dịch vụ cho các mục đích bất hợp pháp hoặc gây hại.
                        </p>
                        <p className="mb-2 text-sm text-gray-600">
                            4. **Bảo mật:** Khách hàng chịu trách nhiệm bảo mật thông tin tài khoản của mình.
                        </p>
                        <p className="mb-2 text-sm text-gray-600">
                            5. **Hủy dịch vụ:** Khách hàng có thể yêu cầu hủy dịch vụ theo quy trình đã quy định.
                        </p>
                        <p className="mb-2 text-sm text-gray-600">
                            6. **Chấm dứt hợp đồng:** Hợp đồng có thể bị chấm dứt nếu một trong hai bên vi phạm các điều khoản đã thỏa thuận.
                        </p>
                    </div>
                </div>

                {/* Checkbox xác nhận */}
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="agreeCheckbox"
                        className="mr-2 accent-green-600"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="agreeCheckbox" className="text-gray-700">
                        Tôi đã đọc và đồng ý với các **Điều khoản dịch vụ** và **Chính sách bảo mật**.
                    </label>
                </div>
                
                {/* Nút điều hướng */}
                <div className="flex gap-2 mt-4">
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={onBack}>Quay lại</button>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-green-800"
                        onClick={onNext}
                        disabled={!agreed}
                    >
                        Tiếp tục thanh toán
                    </button>
                </div>
            </div>
            
            {/* Tóm tắt đơn hàng */}
            <OrderSummary 
                plan={plan} 
                selectedYear={selectedYear} 
                getDiscountPrice={getDiscountPrice} 
            />
        </div>
    );
};

export default Step4Contract;