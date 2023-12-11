"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const tagsSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const detailsSchema = new mongoose_1.Schema({
    level: {
        type: String,
    },
    description: {
        type: String,
    },
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'categoryId is required'],
        ref: 'Course',
    },
    price: {
        type: Number,
        required: true,
    },
    tags: [tagsSchema],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    details: {
        type: detailsSchema,
        required: true,
    },
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
