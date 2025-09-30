import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productType: {
    type: String,
    enum: ["domain", "hosting"],
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "items.productType" // sẽ ref tới Domain hoặc Hosting tùy loại
  },
  name: { type: String, required: true }, // Ví dụ: ".VN" hoặc "Gói 10GB"
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  duration: { type: Number, default: 1 }, // số năm / tháng đăng ký
  extra: { type: Object }, // lưu thêm thông tin tùy theo product
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "active", "expired", "cancelled"],
      default: "pending",
    },
    paymentMethod: { type: String, enum: ["cod", "bank", "momo", "paypal"], default: "bank" },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
