const donationQuery = `
  WITH 
      -- Add converted_amount_usd column to Donation table using Rate table
      usd_donations AS (
          SELECT 
          d.id,
          d.parent_id,
          d.amount,
          d.date,
          CASE 
              WHEN SPLIT_PART(d.amount, ' ', 2) = 'USD' THEN
                  CAST(SPLIT_PART(d.amount, ' ', 1) AS DECIMAL(25,17))
              ELSE
                  CAST(SPLIT_PART(d.amount, ' ', 1) AS DECIMAL(25,17)) * r.value 
          END AS converted_amount_usd
      FROM "Donation" d
      LEFT JOIN "Rate" r ON r.date = d.date AND r.sign = SPLIT_PART(d.amount, ' ', 2)
      ),
      -- Sum donations for each employee, filter those which are more than $100
      eligible_contributions AS (
          SELECT
              parent_id AS employee_id,
              SUM(converted_amount_usd) AS total_contribution_usd
          FROM usd_donations
          GROUP BY parent_id
          HAVING SUM(converted_amount_usd) > 100
      ),
      -- Calculate the total contribution
      total_contribution AS (
          SELECT SUM(total_contribution_usd) AS total_value FROM eligible_contributions
      )
  -- Calculate the reward from the $10,000 pool for each employee
  SELECT 
      ec.employee_id,
      e.name,
      e.surname,
      ROUND(ec.total_contribution_usd, 2) AS total_contribution_usd,
      FLOOR(ec.total_contribution_usd / tc.total_value * 10000 * 100) / 100 AS reward_usd
  FROM eligible_contributions ec
  CROSS JOIN total_contribution tc
  JOIN "Employee" e ON e.id = ec.employee_id`

module.exports = {
  donationQuery
}