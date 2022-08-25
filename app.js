const express = require("express");
const multer = require("multer");
const server = express();

server.use(express.static('./images'));
server.use(express.static('./static'));

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({storage: fileStorageEngine });

// ****** что неверно с этой строкой?
// server.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

server.post('/single', upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Single File upload success");
})

server.listen(3000);