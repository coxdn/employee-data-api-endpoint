const db = require('../database')
const { donationQuery } = require('../queries/donationQueries')

const calculateRewards = async (req, res) => {
  try {
    const results = await db.any(donationQuery)
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  calculateRewards,
}