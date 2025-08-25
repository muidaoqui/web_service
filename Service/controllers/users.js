import UserModel from "../model/users.js";
import bcrypt from "bcryptjs";

export const authRegister = async (req, res) => {
  try {
    //Kiểm tra email
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }
    //Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //Tạo User
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


