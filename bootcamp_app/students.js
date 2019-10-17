const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id AS student_id, students.name AS student_name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.log('query error', err.stack));