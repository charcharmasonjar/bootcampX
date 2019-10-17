const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2] || 'JUL02';
const values = [`%${cohortName}%`];

const queryString = `
SELECT
  DISTINCT teachers.name AS teacher,
  cohorts.name AS cohort
FROM
  teachers
  JOIN assistance_requests ON assistance_requests.teacher_id = teachers.id 
  JOIN students ON assistance_requests.student_id = students.id 
  JOIN cohorts on students.cohort_id = cohorts.id
WHERE
  cohorts.name LIKE $1
ORDER BY
  teachers.name;
`;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
})
.catch(err => console.log('query error', err.stack));