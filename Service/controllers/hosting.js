import HostingModel from "../model/hosting.js";

// Helper response
const sendResponse = (res, status, success, message, data = null) => {
    const response = { success, message };
    if (data !== null) response.data = data;
    return res.status(status).json(response);
};

// Validate input
const validateHostingInput = (body, isUpdate = false) => {
    const { userId, name, price, dungluong, subdomain, mysql, email, type } = body;

    if (!isUpdate) {
        if (!userId || !name || price == null || !dungluong || !subdomain || !mysql || !email || !type) {
            return "All required fields must be provided!";
        }
    }

    if (price != null && (isNaN(price) || Number(price) <= 0)) {
        return "Price must be greater than 0";
    }
    return null;
};

const hostingController = {
    // CREATE
    create: async (req, res) => {
        try {
            const error = validateHostingInput(req.body);
            if (error) return sendResponse(res, 400, false, error);

            const { name } = req.body;

            // Check duplicate
            const existedName = await HostingModel.findOne({ name }).lean();
            if (existedName) {
                return sendResponse(res, 409, false, "Hosting name already exists!");
            }

            const newHosting = await HostingModel.create(req.body);
            return sendResponse(res, 201, true, "Created successfully", newHosting);
        } catch (error) {
            return sendResponse(res, 500, false, error.message);
        }
    },

    // READ ALL (with optional filter + pagination)
    getAll: async (req, res) => {
        try {
            const { type, page = 1, limit = 20 } = req.query;
            const query = type ? { type } : {};
            const skip = (page - 1) * limit;

            const hostings = await HostingModel.find(query).skip(skip).limit(Number(limit)).lean();
            const total = await HostingModel.countDocuments(query);

            return sendResponse(res, 200, true, "Fetched successfully", { hostings, total });
        } catch (error) {
            return sendResponse(res, 500, false, error.message);
        }
    },

    // READ ONE
    getById: async (req, res) => {
        try {
            const hosting = await HostingModel.findById(req.params.id).lean();
            if (!hosting) {
                return sendResponse(res, 404, false, "Hosting not found");
            }
            return sendResponse(res, 200, true, "Fetched successfully", hosting);
        } catch (error) {
            return sendResponse(res, 500, false, error.message);
        }
    },

    // UPDATE
    update: async (req, res) => {
        try {
            const existedName = await HostingModel.findOne({ name: req.body.name, _id: { $ne: req.params.id } });
            if (existedName) {
                return sendResponse(res, 409, false, "Hosting name already exists!");
            }
            const error = validateHostingInput(req.body, true);
            if (error) return sendResponse(res, 400, false, error);

            const updatedHosting = await HostingModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedHosting) {
                return sendResponse(res, 404, false, "Hosting not found");
            }
            return sendResponse(res, 200, true, "Updated successfully", updatedHosting);
        } catch (error) {
            return sendResponse(res, 500, false, error.message);
        }
    },

    // DELETE
    delete: async (req, res) => {
        try {
            const deletedHosting = await HostingModel.findByIdAndDelete(req.params.id);
            if (!deletedHosting) {
                return sendResponse(res, 404, false, "Hosting not found");
            }
            return sendResponse(res, 200, true, "Deleted successfully");
        } catch (error) {
            return sendResponse(res, 500, false, error.message);
        }
    }
};

export default hostingController;
