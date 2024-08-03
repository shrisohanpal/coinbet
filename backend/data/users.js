import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    phone: "23422",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    phone: "234232",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    phone: "2342290",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Darshan Kumar",
    email: "darshan@email.com",
    phone: "23422123",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Salesh Singh",
    email: "salesh@email.com",
    phone: "234212762",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Sachin Ahirwar",
    email: "sachin@email.com",
    phone: "23422904567",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
