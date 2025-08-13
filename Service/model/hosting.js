import mongoose from 'mongoose';

const hostingSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    capacity: { type: Number },
    subdomain: { type: String },
    mysql: { type: Number },
    email: { type: String },
    backup: { type: String, default: "Miễn phí" }
});

const HostingModel = mongoose.model('Hosting', hostingSchema);

export default HostingModel;
