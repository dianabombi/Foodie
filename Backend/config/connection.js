
const mongoose = require('mongoose');

const URI = "mongodb+srv://diana:diana1234@cluster0.zfdnm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// initialize connection with mongodb
main()
    .then(() => console.log (`DB is connected successfully`))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(URI);
}

module.exports = main;