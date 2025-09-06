import DomainModel from "../model/domain.js";

// Helper for consistent response
const sendResponse = (res, status, success, message, data = null) => {
    const response = { success, message };
    if (data !== null) response.data = data;
    return res.status(status).send(response);
};

// Validation helper
const validateDomainInput = ({ name, newPrice, renewPrice, type }, isUpdate = false) => {
    if (!isUpdate) {
        if (!name || newPrice == null || renewPrice == null || !type) {
            return "All required fields must be provided!";
        }
    }
    if (type && !["vn", "qt"].includes(type)) {
        return 'Invalid type! Must be "vn" or "qt".';
    }
    if (newPrice != null && (isNaN(newPrice) || Number(newPrice) <= 0)) {
        return "newPrice must be greater than 0";
    }
    if (renewPrice != null && (isNaN(renewPrice) || Number(renewPrice) <= 0)) {
        return "renewPrice must be greater than 0";
    }
    return null;
};

const domainController = {
    // CREATE
    create: async (req, res) => {
        try {
            const error = validateDomainInput(req.body);
            if (error) return sendResponse(res, 400, false, error);

            const { name, newPrice, renewPrice, transfer, type } = req.body;

            const existedName = await DomainModel.findOne({ name }).lean();
            if (existedName) return sendResponse(res, 409, false, "Domain name already exists!");

            const newDomain = await DomainModel.create({
                userId: req.authUser._id, // lấy userId từ auth
                name,
                newPrice,
                renewPrice,
                transfer: transfer || undefined,
                type,
            });

            return sendResponse(res, 201, true, "Created successfully", newDomain);
        } catch (error) {
            if (error.code === 11000) {
                return sendResponse(res, 409, false, "Domain name already exists!");
            }
            return sendResponse(res, 500, false, error.message);
        }
    },

    // READ ALL
    getAll: async (req, res) => {
        try {
            const { type } = req.query;
            const query = type ? { type } : {};
            const domains = await DomainModel.find(query).lean();
            return sendResponse(res, 200, true, "Fetched successfully", domains);
        } catch (error) {
            return sendResponse(res, 500, false, error.message);
        }
    },

    // READ BY ID
    getById: async (req, res) => {
        try {
            const domain = await DomainModel.findById(req.params.id).lean();
            if (!domain) return sendResponse(res, 404, false, "Domain not found");
            return sendResponse(res, 200, true, "Fetched successfully", domain);
        } catch (error) {
            return sendResponse(res, 500, false, error.message);
        }
    },

    // UPDATE
    update: async (req, res) => {
        try {
            const error = validateDomainInput(req.body, true);
            if (error) return sendResponse(res, 400, false, error);

            const updatedDomain = await DomainModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, lean: true } // thêm lean
            );
            if (!updatedDomain) return sendResponse(res, 404, false, "Domain not found");
            return sendResponse(res, 200, true, "Updated successfully", updatedDomain);
        } catch (error) {
            return sendResponse(res, 500, false, error.message);
        }
    },

    // DELETE
    delete: async (req, res) => {
        try {
            const deleted = await DomainModel.findByIdAndDelete(req.params.id).lean();
            if (!deleted) return sendResponse(res, 404, false, "Domain not found");
            return sendResponse(res, 200, true, "Deleted successfully", deleted);
        } catch (error) {
            return sendResponse(res, 500, false, error.message);
        }
    },
};

export default domainController;
