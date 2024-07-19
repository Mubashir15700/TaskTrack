const Reason = require("../models/reasonModel");

class ReasonRepository {
    async saveBlockReason(userId, action, reason) {
        const blockReason = new Reason({
            userId,
            action,
            reason
        });
        return await blockReason.save();
    };

    async removeBlockReason(userId, action) {
        return await Reason.findOneAndDelete({ userId, action });
    };

    async findBlockReason(userId, action) {
        return await Reason.findOne({ userId, action });
    };
};

module.exports = ReasonRepository;
