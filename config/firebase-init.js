const admin = require('firebase-admin');
const serviceAccount = require('../config/aimmedpushtest-firebase-adminsdk-b3h3z-e3354ff72c.json');

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    
} catch (error) {
    console.error(error);
}


module.exports = admin;
