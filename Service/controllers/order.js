import Order from "../model/order.js";
import Domain from "../model/domain.js";
import Hosting from "../model/hosting.js";

// ========== CREATE ORDER (auto calculate total) ==========
export const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ message: "Order items required" });
    }

    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      let productData = null;
      let finalPrice = 0;

      if (item.productType === "domain") {
        productData = await Domain.findById(item.productId);
        if (!productData) {
          return res.status(404).json({ message: "Domain not found" });
        }
        // giá lấy theo newPrice, nhân với số năm
        finalPrice = productData.newPrice * (item.duration || 1);
        processedItems.push({
          productType: "domain",
          productId: productData._id,
          name: productData.name,
          price: productData.newPrice,
          quantity: 1,
          duration: item.duration || 1,
        });
      }
      else if (item.productType === "hosting") {
        productData = await Hosting.findById(item.productId);
        if (!productData) {
          return res.status(404).json({ message: "Hosting not found" });
        }
        // giá hosting * số năm
        finalPrice = productData.price * (item.duration || 1);
        processedItems.push({
          productType: "hosting",
          productId: productData._id,
          name: productData.name,
          price: productData.price,
          quantity: 1,
          duration: item.duration || 1,
        });
      }
      else {
        return res.status(400).json({ message: "Invalid product type" });
      }

      totalAmount += finalPrice;
    }

    const order = await Order.create({
      userId: req.authUser.id,
      items: processedItems,
      totalAmount,
      paymentMethod,
    });

    res.status(201).json({ message: "Order created", data: order });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// xem danh sách order của User
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.authUser.id }).sort({ createdAt: -1 });
    for (const order of orders) {
      for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        let product = null;
        if (item.productType === "domain") {
          product = await Domain.findById(item.productId);
        } else if (item.productType === "hosting") {
          product = await Hosting.findById(item.productId);
        }
        // clone sang object thường để thêm field
        order.items[i] = { ...item.toObject(), product };
      }
    }
    res.status(200).json({
      message: "Orders fetched",
      data: orders || []
    });
  } catch (err) {
    console.error("Get my orders error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// xem chi tiết 1 order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.authUser.id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order fetched", data: order });
  } catch (err) {
    console.error("Get order by ID error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ========== ADMIN ==========
// xem tất cả order
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "Orders fetched", data: orders });
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// cập nhật trạng thái order
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "paid", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", data: order });
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// xóa order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
