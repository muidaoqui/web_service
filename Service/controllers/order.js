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
