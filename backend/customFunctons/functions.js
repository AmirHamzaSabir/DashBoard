// ** Returns paginated array
const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage)

const roleText = (role) => {
    switch (role) {
        case 0:
          return "User"
        case 1:
          return "Admin"
        case 2:
          return "Super Admin"
      }
}

module.exports = {
    paginateArray,
    roleText
}
