var express = require('express')
var app = express();
const cors = require('cors');
const bodyparser = require('body-parser')
var urlencode = bodyparser.urlencoded({ extended: true })
var Jobs = require('./mongo')
var Jobreq = require('./mongojob')
var nodemailer = require('nodemailer')


// const path = require('path');
// const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


var mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/job'



app.use(cors())
app.use(express.json());

app.use(bodyparser.json());
app.use(methodOverride('_method'));
// app.set('view engine', 'ejs');


mongoose.connect(uri)
const conn = mongoose.createConnection(uri)
let gfs;

conn.once('open', () => {
    console.log('connected')
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});





app.post('/submit', urlencode, (req, res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let age = req.body.age;
    let email = req.body.email;
    let phoneno = req.body.phoneno;
    let address = req.body.address;
    let graduate1 = req.body.grade1;
    let marks1 = req.body.marks1;
    let graduate2 = req.body.grade2;
    let marks2 = req.body.marks2;
    let company1 = req.body.company1;
    let year1 = req.body.year1;
    let company2 = req.body.company2;
    let year2 = req.body.year2;
    let resume = req.body.resume;
    let password = req.body.password;



    console.log(name)
    console.log(lastname)
    console.log(age)
    console.log(email)
    console.log(phoneno)
    console.log(address)
    console.log(password)


    var job = new Jobs({
        name: name,
        lastname: lastname,
        age: age,
        email: email,
        phoneno: phoneno,
        address: address,
        graduate1: graduate1,
        marks1: marks1,
        graduate2: graduate2,
        marks2: marks2,
        company1: company1,
        year1: year1,
        company2: company2,
        year2: year2,
        resume:resume,
        password: password,
    })
    job.save()

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mackyabez@gmail.com',
            pass: 'xhryzlhleddeyskf'
        }
    })

    var mail = {
        from: 'mackyabez@gmail.com',
        to: `${email}`,
        subject: 'Welcome',
        text: `Hello.. Welcome to Job-search Site. Your account is registered with Name - ${name} ${lastname}  Job-server if this wasnt you please let us know. Regards`

    }

    transporter.sendMail(mail, function (err, info) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('mail sent ' + info.response)
        }
    })

    res.send('submitted')
})
app.post('/get', urlencode, (req, res) => {
    let email = req.body.email;
    Jobs.find({ email: email }, function (err, response) {

        console.log(response)
        res.send(response)
    })


})

app.post('/login', urlencode, (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Jobs.find({ email: email }, function (err, response) {

        if (err) {
            return err
        }
        console.log(response.email)
        if (response) {


            response.forEach(value => {

                if (value.email === email) {
                    if (value.password === password) {
                        console.log(value.name);

                        res.send(value.email)
                    }
                    else {
                        console.log('if')
                        res.send('wrong')

                    }
                }

            })


        }


    })
})

app.post('/delete', function (req, res) {
    let name = req.body.name;

    Notes.deleteOne({ name: name }, (err, doc) => {
        if (err) return err;
        res.json(doc)

    })
})


app.post('/update', function (req, res) {
    // let id = req.body.id;
    let companyname = req.body.companyname
    let email = req.body.email;

    console.log(companyname)
    console.log(email)
    Jobs.updateOne({ email: email }, { $addToSet: { applied_job: { $each: [companyname] } } }, (err, doc) => {


        if (err) return err;
        res.json(doc)

    })
})

app.post('/jobreq', urlencode, (req, res) => {
    Jobreq.find(function (err, response) {

        console.log(response)
        res.send(response)
    })


})


app.post('/profilereq', urlencode, (req, res) => {
    let companyname = req.body.companyname;

    Jobreq.find({ companyname: companyname }, function (err, response) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(response)
            res.send(response)
        }
    })


})

app.post('/jobrem', urlencode, (req, res) => {
    let email = req.body.email;
    let companyname = req.body.companyname;
    Jobs.updateOne({ email: email }, { $pull: { 'applied_job': companyname } }, function (err, response) {
        console.log(companyname)
        console.log(response)
        res.send(response)
    })


})


app.post('/remove', urlencode, (req, res) => {
    let email = req.body.email;
    let companyname = req.body.companyname;
    Jobs.updateOne({ email: email }, { $pull: { 'applied_job': companyname } }, function (err, response) {
        console.log(companyname)
        console.log(response)
        res.send(response)
    })


})


app.post('/jobsubmit', urlencode, (req, res) => {
    let companyname = req.body.companyname;
    let position = req.body.position;
    let salary = req.body.salary;

    var jobreq = new Jobreq({
        companyname: companyname,
        position: position,
        salary: salary,

    })
    jobreq.save()



    res.send('submitted')
})


//gridfs

const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            // crypto.randomBytes(16, (err, buf) => {
                // if (err) {
                //     return reject(err);
                // }
                const filename =(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };

                resolve(fileInfo);
            
            // });
         

        });
    }
});

const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {

    res.json({ file: req.file })


});


app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        else {
            res.send({ files: files })
        }


    });
});










app.listen(3001)
{
    console.log('server is running on 3001')
}