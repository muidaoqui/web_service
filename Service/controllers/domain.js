import DomainModel from "../model/domain.js";

const domainController = {
    // CREATE
    create: async (req, res) => {
        try {
            const { name, newPrice, renewPrice, transfer, type } = req.body;

            // Validate required fields
            if (!name || newPrice == null || renewPrice == null || !type) {
                return res.status(400).send({ message: 'All required fields must be provided!', success: false });
            }

            // Validate type
            if (!['vn', 'qt'].includes(type)) {
                return res.status(400).send({ message: 'Invalid type! Must be "vn" or "qt".', success: false });
            }

            // Validate price
            if (newPrice <= 0 || renewPrice <= 0) {
                return res.status(400).send({ message: 'Prices must be greater than 0', success: false });
            }

            // Check duplicate name
            const existedName = await DomainModel.findOne({ name });
            if (existedName) {
                return res.status(409).send({ message: 'Domain name already exists!', success: false });
            }

            // Create
            const newDomain = await DomainModel.create({
                name,
                newPrice,
                renewPrice,
                transfer: transfer || undefined, // undefined để dùng default
                type
            });

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
            const { newPrice, renewPrice, type } = req.body;

            // Optional validations if provided
            if (type && !['vn', 'qt'].includes(type)) {
                return res.status(400).send({ message: 'Invalid type! Must be "vn" or "qt".', success: false });
            }
            if (newPrice != null && newPrice <= 0) {
                return res.status(400).send({ message: 'newPrice must be greater than 0', success: false });
            }
            if (renewPrice != null && renewPrice <= 0) {
                return res.status(400).send({ message: 'renewPrice must be greater than 0', success: false });
            }

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
