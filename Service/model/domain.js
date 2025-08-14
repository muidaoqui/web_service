import mongoose from 'mongoose';

const domainSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    newPrice: { type: Number, required: true },
    renewPrice: { type: Number, required: true },
    transfer: { type: String, default: "Miễn phí" },
    type: { type: String, enum: ['vn', 'qt'], required: true }
}, { timestamps: true });


const DomainModel = mongoose.model('Domain', domainSchema);

export default DomainModel;
