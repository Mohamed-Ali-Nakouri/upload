const express = require('express');
const app  = express();
const multer  = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')  // tbadel win bech t uploadi
    },
    filename: function (req, file, cb) {
       // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E3)

        cb(null,   file.originalname) // lenna esm el file ki yuploada
    }
});

let destination = multer({ storage: storage });
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'POST,GET');
        return res.status(200).json({});
    }
    next();
});


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', destination.single('image'), function (req, res, next) {
    console.log(req.file.path);
    res.send("File upload sucessfully.");
});


module.exports = app ;
