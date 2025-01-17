SELECT
  cohorts.name AS cohort_name,
  COUNT(students.*) AS student_count
FROM
  cohorts
  JOIN students ON students.cohort_id = cohorts.id
GROUP BY
  cohort_name
HAVING
  COUNT(students.*) >= 18
ORDER BY
  COUNT(students.*);