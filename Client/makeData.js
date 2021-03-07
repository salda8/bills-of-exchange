const fs = require('fs')
const last = require('lodash/fp/last')

try {
  fs.mkdirSync('data')
} catch (e) {}

const userNames = [
  'Harry',
  'Ron',
  'Hermione',
  'Fred',
  'George',
  'Giny',
  'Rubeus',
  'Severus',
  'Albus',
  'Bellatrix',
  'Sirius',
  'Draco',
]

const users = userNames.map((name) => ({
  id: Math.round(Math.random() * 1000000),
  name,
}))

const getUser = (prev) => {
  const index = Math.min(
    Math.floor(Math.random() * users.length),
    users.length - 1
  )

  return prev && prev.includes(users[index].id) ? getUser(prev) : users[index]
}

const makeEndorsements = (uIds = []) => {
  // eslint-disable-next-line no-array-constructor
  return new Array(Math.round(Math.random() * (users.length / 2)))
    .fill(null)
    .map(() => {
      const user = getUser(uIds)
      uIds.push(user.id)

      return user.id
    })
}

const boes = new Array(185).fill(null).map(() => {
  const emptyEndorsements = Math.round() > 0.7
  const drawee = getUser()
  const payee = getUser([drawee.id])

  const endorsement = emptyEndorsements ? [] : makeEndorsements([drawee.id])

  if (endorsement && last(endorsement) !== payee.id) {
    endorsement.push(payee.id)
  }

  return {
    id: Math.round(Math.random() * 10000000),
    drawee: drawee,
    payee: payee,
    amount: Math.round(Math.random() * 500000),
    endorsement: endorsement.map((id) => users.find((u) => u.id === id)),
  }
})

console.log(__dirname)
fs.writeFileSync(__dirname + '/data/users.json', JSON.stringify(users, null, 4))
fs.writeFileSync(__dirname + '/data/boes.json', JSON.stringify(boes, null, 4))
