import HostingModel from "../model/hosting.js";

const hostingController = {
    // CREATE
    create: async (req, res) => {
        try {
            const { name, price, capacity, subdomain, mysql, email, backup } = req.body;
            if (name == null || price == null || capacity == null || subdomain == null || mysql == null || email == null) {
                return res.status(400).send({ message: 'Data is required!', success: false });
            }

            const existedName = await HostingModel.findOne({ name });
            if (existedName) {
                return res.status(409).send({ message: 'Hosting name already exists!', success: false });
            }

            const newHosting = await HostingModel.create({
                name, price, capacity, subdomain, mysql, email, backup
            });

            res.status(201).send({ data: newHosting, message: 'Created successfully', success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    },

    // READ ALL
    getAll: async (req, res) => {
        try {
            const hostings = await HostingModel.find();
            res.status(200).send({ data: hostings, success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    },

    // READ ONE
    getById: async (req, res) => {
        try {
            const hosting = await HostingModel.findById(req.params.id);
            if (!hosting) return res.status(404).send({ message: 'Hosting not found', success: false });
            res.status(200).send({ data: hosting, success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    },

    // UPDATE
    update: async (req, res) => {
        try {
            const updatedHosting = await HostingModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedHosting) return res.status(404).send({ message: 'Hosting not found', success: false });
            res.status(200).send({ data: updatedHosting, message: 'Updated successfully', success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    },

    // DELETE
    delete: async (req, res) => {
        try {
            const deletedHosting = await HostingModel.findByIdAndDelete(req.params.id);
            if (!deletedHosting) return res.status(404).send({ message: 'Hosting not found', success: false });
            res.status(200).send({ message: 'Deleted successfully', success: true });
        } catch (error) {
            res.status(500).send({ message: error.message, success: false });
        }
    }
};

export default hostingController;
