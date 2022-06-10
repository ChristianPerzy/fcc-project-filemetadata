var express = require('express');
var cors = require('cors');
let multer = require('multer');
let fs = require('fs');
require('dotenv').config()

var app = express();
let fupload = multer({dest: 'uploads/'});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', fupload.single('upfile'), (req, res) => {
  let file = req.file;
  fs.unlink(file.path, (err) => {
    if (err) return console.log(err);
  });  

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
