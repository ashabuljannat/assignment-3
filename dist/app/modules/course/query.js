"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pagination = (queryResult, queryLimit) => {
    const totalPages = Math.ceil(queryResult.length / queryLimit);
    const allPageData = [];
    function getPageData(pageNumber) {
        const startIndex = (pageNumber - 1) * queryLimit;
        const endIndex = startIndex + queryLimit;
        return queryResult.slice(startIndex, endIndex);
    }
    for (let page = 1; page <= totalPages; page++) {
        const pageData = getPageData(page);
        allPageData.push(pageData);
    }
    return { allPageData, totalPages };
};
exports.pagination = pagination;
