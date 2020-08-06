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
  connectionString: "postgres://postgres:password@127.0.0.1:5432/nasa"
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

app.get('/nasa', (req, res) =>{
  let queryString = "Select * from excursions"
  pool.query(queryString)
  .then(result => {
    debugger
    if(result.rows.length >0){
      debugger
      res.render('excursions/index', {excursions:result.rows})
    } else{
      debugger
      res.render('excursions/index', {excursions:result.rows})
    }
  })
})

app.get('/nasa/crew_members/new', (req, res) => {
  res.render('crew_members/new')
})

app.post('/nasa/crew_members', (req, res) => {
  let name = req.body.name
  let queryString = "INSERT INTO crew_members (member_name) VALUES ($1)"
  pool.connect()
  .then(client=> {
    client.query(queryString, [name])
    .then(result => {
      client.release()
      res.redirect('/nasa')
    })
  })
  .catch((error) => {
    console.log(error)
    res.sendStatus(500)
  })
  res.redirect('/nasa')
})



app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})

export default app
