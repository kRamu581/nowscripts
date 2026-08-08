const http = require('http');
const jwt = require('jsonwebtoken');

const token = jwt.sign({ userId: '60d0fe4f5311236168a109ca', role: 'user' }, 'default-secret-do-not-use');

const data = JSON.stringify({
  message: 'Hello, how do I enroll in a roadmap?',
  conversationId: 'test-123'
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/copilot/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
}, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
