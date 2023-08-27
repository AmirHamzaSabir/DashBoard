// ** Returns paginated array
const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage)
module.exports = {
    paginateArray
}