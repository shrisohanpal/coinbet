import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Darshan Kumar',
    email: 'darshan@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Salesh Singh',
    email: 'salesh@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sachin Ahirwar',
    email: 'sachin@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
