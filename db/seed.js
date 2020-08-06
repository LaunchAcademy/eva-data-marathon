import pg from 'pg'
import { fileURLToPath } from 'url'
import path from 'path'
import LineReader from "line-reader"


const pool = new pg.Pool({
  connectionString: "postgres://arkhamsrazor:password@127.0.0.1:5432/nasa"
});

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const crewPath = path.join(__dirname, "../crew.txt");
const excursionPath = path.join(__dirname, "../excursion.csv")


// ========================================================================
// build our SQL query string
const excursionQueryString =
  "INSERT INTO excursions (country, vehicle, occurred_on, duration_hours, duration_minutes, purpose) VALUES ($1, $2, $3, $4, $5, $6)";


LineReader.eachLine(excursionPath, (line, last, done) => {
  let [country, vehicle, occurred_on, duration_time, purpose] = line.split(",")
  let [duration_hours, duration_minutes] = duration_time.split(":")
  const excursionQueryString = "INSERT INTO excursions (country, vehicle, occurred_on, duration_hours, duration_minutes, purpose) VALUES ($1, $2, $3, $4, $5, $6)";

  pool.query(excursionQueryString, [country, vehicle, occurred_on, duration_hours, duration_minutes, purpose])
    .then(result => {
      if (last) {
        pool.end
      }
      done()
    }).catch((error) => {
      console.log(error)
      done()
    })
})


LineReader.eachLine(crewPath, (line, last, done) => {
  const crewQueryString = "INSERT INTO crew_members (member_name) VALUES ($1)";
  pool.query(crewQueryString, [line])
    .then(result => {
      if (last) {
        pool.end
      }
      done()
    }).catch((error) => {
      console.log(error)
      done()
    })
})