const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/medium-clone', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    const users = db.collection('users');
    
    // The user typed some password in the screenshot, but we don't know it.
    // Let's set it to 'admin123' so they can login.
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await users.updateOne(
      { email: 'mowadmin@gmail.com' },
      {
        $set: {
          email: 'mowadmin@gmail.com',
          name: 'Mow Admin',
          password: hashedPassword,
          isVerified: true,
          isActive: true,
          role: 'Admin',
          intrests: ['ServiceNow', 'Administration'],
          authProviders: ['password']
        }
      },
      { upsert: true }
    );
    
    console.log('Successfully created/updated admin user!');
    console.log('Email: mowadmin@gmail.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
