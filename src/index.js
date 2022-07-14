const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')

app.use(express.static("./public"))
require("./config/db");

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
extended: true
}))



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __basedir + 'src/uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    },
  })
  const uploadFile = multer({ storage: storage })
  app.get('/get', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  })
  app.post('/import-excel', uploadFile.single('import-excel'), (req, res) => {
    importFileToDb('src/uploads/' + req.file.filename)
    console.log(res)
  })
  function importFileToDb(exFile) {
    readXlsxFile(exFile).then((rows) => {
      rows.shift()
      database.connect((error) => {
        if (error) {
          console.error(error)
        } else {
          let query = 'INSERT INTO user (id, name, email) VALUES ?'
          connection.query(query, [rows], (error, response) => {
            console.log(error || response)
          })
        }
      })
    })
  }
  let nodeServer = app.listen(4000, function () {
    let port = nodeServer.address().port
    let host = nodeServer.address().address
    console.log('App working on: ', host, port)
  })