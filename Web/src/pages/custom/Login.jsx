import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FaRegEye } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('cyan');
    const navigate = useNavigate();
    function togglePassword() {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
  }
    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="flex flex-col md:flex-row w-full max-w-2xl overflow-hidden rounded-xl shadow-lg bg-white">

                <div className="bg-gradient-to-br from-purple-200 to-cyan-200 flex flex-col justify-center items-center p-6 md:p-10 text-cyan-700 md:rounded-l-xl">
                    <img src={logo} alt="Logo" className="w-auto h-40 rounded-xl mb-4" />
                    <p className="text-center mt-10">Giải pháp web tối ưu cho doanh nghiệp</p>
                </div>

                <div className="flex flex-col justify-center w-full p-6 md:p-10">
                    <form  className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-center text-cyan-400">Đăng Nhập</h1>

                        <div>
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    placeholder="Nhập mật khẩu"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePassword}
                                >
                                    <FaRegEye />
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="bg-cyan-400 hover:bg-cyan-500 text-white h-10 rounded-lg font-semibold">
                            Đăng Nhập
                        </button>

                        {message && (
                            <p className={`text-sm text-${msgColor}-600 text-center`}>{message}</p>
                        )}

                        <p className="text-center text-sm">
                            Chưa có tài khoản? <Link to="/register" className="text-cyan-600 hover:underline">Đăng ký</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;