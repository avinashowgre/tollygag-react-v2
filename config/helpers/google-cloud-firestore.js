const FireStore = require("@google-cloud/firestore");

const GOOGLE_CLOUD_PROJECT_ID = "silicon-data-327202"; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = "./config/credentials.json"; // Replace with the path to the downloaded private key

exports.db = new FireStore({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});
