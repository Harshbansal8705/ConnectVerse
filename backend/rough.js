const bcrypt = require('bcryptjs');

console.log(bcrypt.compareSync("Holla", "$2a$10$iLwR.VuxWrfdc45D2IWk7OT.eeD/309dKBRvgXvVQDnQtb7N9f8Z."));