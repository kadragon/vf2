const functions = require("firebase-functions");

var admin = require("firebase-admin");
var serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().admin.db_url
});

const db = admin.database();

exports.createUser = functions
  .region("asia-northeast3")
  .auth.user()
  .onCreate(async user => {
    const { uid, email, displayName, photoURL } = user;
    const u = {
      email,
      displayName,
      photoURL,
      createdAt: new Date().getTime(),
      level: email === functions.config().admin.email ? 0 : 5
    };
    db.ref("users")
      .child(uid)
      .set(u);
  });

exports.deleteUser = functions
  .region("asia-northeast3")
  .auth.user()
  .onDelete(async user => {
    const { uid } = user;
    db.ref("users")
      .child(uid)
      .remove();
  });
