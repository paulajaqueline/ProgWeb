const fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {

    fs.readdir(__dirname, (err, files) => {
        let string = ""
        files.forEach(file => {
            string += file +" <br> ";
        })
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(string)
        res.end()
    })
}).listen(3000);

console.log("Listening at port 3000");
