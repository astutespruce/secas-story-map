/**
 * Convert an array to an object, indexing on values of field
 * @param {Array} records
 * @param {String} field
 */
export const indexBy = (records: object[], field: string) =>
    records.reduce(
      (prev, record) => Object.assign(prev, { [record[field]]: record }),
      {}
    )