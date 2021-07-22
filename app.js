const http = require("http");
const fs = require("fs");
const path = require("path");
const rooter = require("./rooter");
const db = require("./db");
const Image = db.image;

http.createServer((req, res) => {
    console.log(`req.url: ${req.url}`);
    rooter(req, res);
}).listen(3000, () => {
    console.log("server start 3000");
})

exports.sendRes = function sendRes(url, contentType, res) {
    let file = path.join(__dirname, "static", url);

    fs.readFile(file, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.write("file not found");
            res.end();
            console.log(`error 404 ${file}`);
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.write(content);
            res.end();
            console.log(`res 200 ${file}`);
        }
    })
}

exports.getContentType = function getContentType(url) {
    switch (path.extname(url)) {
        case ".html": return "text/html";
        case ".css": return "text/css";
        case ".js": return "text/javascript";
        case ".json": return "application/json";
        case ".png": return "image/x-png";
        case ".jpeg": return "image/jpeg";
        case ".jpg": return "image/jpeg";
        default: "application/octet-stream";
    }
}

exports.saveUploadFile = function saveUploadFile(req, res) {
    let fileName = path.basename(req.url);
    let file = path.join(__dirname, "uploads", fileName);
    let imageFolder = path.join(__dirname, "static/images", fileName);
    req.pipe(fs.createWriteStream(file));
    req.on("end", () => {
        fs.copyFile(file, imageFolder, err => {
            if (err) {
                console.log(err);
            }
            fs.unlink(file, err => {
                if (err) {
                    console.log(err);
                }
            })
        });
        res.writeHead(200, { "Content-Type": "text" });
        res.write(fileName);
        res.end();
    })
}

exports.writeToDB = function writeToDB(data, res) {
    data = JSON.parse(data, true)
    Image.create({
        image_name: data["imageName"],
        file_name: data["fileName"],
        user_name: data["userName"],
    })
        .then(result => {
            res.end("ok");
            console.log(`res 200 ${result}`);
        }).catch(err => {
            res.end("error");
            console.log(`error 404 ${err}`);
        })
}

exports.findAllDB = function findAllDB(res) {
    Image.findAll()
        .then(data => {
            res.end(JSON.stringify(data));
            console.log(`data: ${JSON.stringify(data)}`);
        })
        .catch(err => {
            res.end("error");
            console.log(`error 404 ${err}`);
        })
}