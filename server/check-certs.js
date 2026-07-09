require('dotenv').config();
const mongoose = require('mongoose');

async function checkCertificates() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/medium-clone';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    const certificates = db.collection('certificates');
    
    const count = await certificates.countDocuments();
    console.log(`__CERT_COUNT__=${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking certificates:', error);
    process.exit(1);
  }
}

checkCertificates();
