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
