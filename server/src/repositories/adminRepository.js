const Admin = require("../models/adminModel");

class AdminRepository {
    async findAdminById(id) {
        return await Admin.findById(id).select("-password");
    };

    async findAdminByUserName(username) {
        return await Admin.findOne({ username });
    };
};

module.exports = AdminRepository;
