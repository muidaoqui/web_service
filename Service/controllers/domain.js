import DomainModel from "../model/domain.js";

const domainController = {
    // CREATE
    create: async (req, res) => {
        try {
            const { name, price, transfer } = req.body;
            if (name == null || price == null || transfer == null) {
                return res.status(400).send({ message: 'Data is required!', success: false });
            }

            const existedName = await DomainModel.findOne({ name });
            if (existedName) {
                return res.status(409).send({ message: 'Domain name already exists!', success: false });
            }

            const newDomain = await DomainModel.create({ name, price, transfer });
            res.status(201).send({ data: newDomain, message: 'Created successfully', success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    },

    // READ ALL
    getAll: async (req, res) => {
        try {
            const domains = await DomainModel.find();
            res.status(200).send({ data: domains, success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    },

    // READ ONE
    getById: async (req, res) => {
        try {
            const domain = await DomainModel.findById(req.params.id);
            if (!domain) return res.status(404).send({ message: 'Domain not found', success: false });
            res.status(200).send({ data: domain, success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    },

    // UPDATE
    update: async (req, res) => {
        try {
            const updatedDomain = await DomainModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedDomain) return res.status(404).send({ message: 'Domain not found', success: false });
            res.status(200).send({ data: updatedDomain, message: 'Updated successfully', success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    },

    // DELETE
    delete: async (req, res) => {
        try {
            const deletedDomain = await DomainModel.findByIdAndDelete(req.params.id);
            if (!deletedDomain) return res.status(404).send({ message: 'Domain not found', success: false });
            res.status(200).send({ message: 'Deleted successfully', success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    }
};

export default domainController;
