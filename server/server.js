import path from "path"
import logger from "morgan"
import bodyParser from "body-parser"
import hbsMiddleware from "express-handlebars"
import fs from "fs"
import _ from "lodash"
import express from "express"
import pg from "pg"
import {fileURLToPath} from 'url'

const app = express()

const pool = new pg.Pool({
  connectionString: "postgres://arkhamsrazor:password@127.0.0.1:5432/nasa"
});
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("views", path.join(__dirname, "../views"))
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs"
  })
)

app.set("view engine", "hbs")

app.use(logger("dev"))
app.use(express.json())

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/", (req,res) => {
  res.redirect("/nasa")
})

app.get("/nasa", (req,res) => {
  let queryString = "SELECT * FROM excursions"
  pool.query(queryString)
  .then(excursions => {
    debugger
    if (excursions.rows.length >0){
    res.render('index', {excursions: excursions.rows } )}
    else {
      let excursions = []
      res.render('index', {excursions,excursions})
    }
  })
})
app.get("/nasa/:id", (req,res) => {
  let queryString = `SELECT * FROM excursions WHERE id=${req.params.id}`
  pool.query(queryString)
  .then(result => {
    
  })
})

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})

export default app
