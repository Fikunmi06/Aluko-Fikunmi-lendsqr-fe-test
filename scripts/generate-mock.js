
const fs = require('fs')
const path = require('path')
const faker = require('faker')

function generateUsers(n = 500) {
  const users = []
  for (let i = 1; i <= n; i++) {
    users.push({
      id: i,
      fullName: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      createdAt: faker.date.past().toISOString(),
    })
  }
  return users
}

const users = generateUsers(500)
const data = { users }

fs.mkdirSync(path.join(__dirname, '..', 'mock'), { recursive: true })
fs.mkdirSync(path.join(__dirname, '..', 'public', 'mock'), { recursive: true })
fs.writeFileSync(path.join(__dirname, '..', 'mock', 'db.json'), JSON.stringify(data, null, 2))
fs.writeFileSync(path.join(__dirname, '..', 'public', 'mock', 'db.json'), JSON.stringify(data, null, 2))
console.log('Generated mock data with', users.length, 'users')