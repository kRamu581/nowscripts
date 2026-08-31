const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:5000/api/ai/summarize-url', {
      url: 'https://www.nowscripts.in/learn/csa-intro-setup/ch1-servicenow-intro'
    });
    console.log("SUCCESS:");
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log("ERROR:");
    if (err.response) {
      console.log(JSON.stringify(err.response.data, null, 2));
    } else {
      console.log(err.message);
    }
  }
}
test();
