"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
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
        required: true,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: true,
    },
    tags: [tagsSchema],
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
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
    durationInWeeks: Number,
    details: {
        type: detailsSchema,
        required: true,
    },
    review: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Review'
    },
});
courseSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeDifference = new Date(this.endDate).getTime() - new Date(this.startDate).getTime();
        const differenceInWeeks = Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));
        this.durationInWeeks = differenceInWeeks;
        // this.review = "";
        next();
    });
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
