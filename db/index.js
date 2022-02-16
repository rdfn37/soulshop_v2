const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

main()
  .then(() => console.log("Conectado"))
  .catch((e) => console.log(e));

module.exports = mongoose;
