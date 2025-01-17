SELECT
  DISTINCT teachers.name AS teacher,
  cohorts.name AS cohort
FROM
  teachers
  JOIN assistance_requests ON assistance_requests.teacher_id = teachers.id 
  JOIN students ON assistance_requests.student_id = students.id 
  JOIN cohorts on students.cohort_id = cohorts.id
WHERE
  cohorts.name = 'JUL02'
ORDER BY
  teachers.name