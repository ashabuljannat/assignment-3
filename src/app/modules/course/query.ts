// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pagination = (queryResult: any, queryLimit: number) => {
  const totalPages = Math.ceil(queryResult.length / queryLimit);
  const allPageData = [];

  function getPageData(pageNumber: number) {
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
