import bcrypt from "bcryptjs"

const users = [
  {
    name: 'Dieynaba Faye',
    email: 'dieynabe@gmail.com',
    password: bcrypt.hashSync('dieynaba', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin:false,
  },
]

export default  users