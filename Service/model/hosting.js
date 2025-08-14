import mongoose from 'mongoose';

const hostingSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true }, // giá theo tháng
    dungluong: { type: String, required: true },
    subdomain: { type: String, required: true },
    mysql: { type: String, required: true },
    email: { type: String, required: true },
    backup: { type: String, default: "Miễn phí" },
    yearly: { type: String, required: true },
    type: { type: String, enum: ['thuongmai', 'vip', 'phothong'], required: true }
}, { timestamps: true });


const HostingModel = mongoose.model('Hosting', hostingSchema);

export default HostingModel;
