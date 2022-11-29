const axios = require('axios');

const getPeoples = async () => {
  const { data } = await axios.get('https://dummyjson.com/users?skip=0&limit=100');
  const users = data.users.map((user, i) => {
    let admin = false;
    if (i % 10 === 1) {
      admin = true;
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: 'password',
      email: user.email,
      isAdmin: admin,
    }
  })
  return users;
}
module.exports = getPeoples;