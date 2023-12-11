"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
    },
    rating: {
        type: Number,
        trim: true,
        required: true,
    },
    review: {
        type: String,
        trim: true,
        required: true,
    },
});
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
