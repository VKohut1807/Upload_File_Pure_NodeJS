const app = require("./app");

module.exports = function (req, res) {
    if (req.url === "/") {
        app.sendRes("index.html", "text/html", res);
    } else if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === "POST") {
        console.log("upload files");
        app.saveUploadFile(req, res);
    } else if (req.url === "/save-form" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            console.log(body);
            app.writeToDB(body, res);
        })
    } else {
        app.sendRes(req.url, app.getContentType(req.url), res);
    }
}