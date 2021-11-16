const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (token, message, title) => {
  console.log("Sending Notification");
  try {
    await admin.messaging().sendMulticast({
      tokens: [token],
      notification: {
        title,
        body: message,
      },
    });
    console.log("Done");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { admin, sendNotification };
