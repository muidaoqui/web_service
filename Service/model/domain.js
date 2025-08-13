import mongoose from 'mongoose';

const domainSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    transfer: { type: String, default: "Miễn phí" }
});

const DomainModel = mongoose.model('Domain', domainSchema);

export default DomainModel;
