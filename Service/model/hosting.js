import mongoose from 'mongoose';

const hostingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    dungluong: { type: String, required: true },
    subdomain: { type: String, required: true },
    mysql: { type: String, required: true },
    email: { type: String, required: true },
    backup: { type: String, default: "Miễn phí" },
    yearly: { type: Number, default: function() { return this.price * 12; } }, // giá theo năm
    type: { type: String, enum: ['thuongmai', 'vip', 'phothong'], required: true }
}, { timestamps: true });


const HostingModel = mongoose.model('Hosting', hostingSchema);

export default HostingModel;
