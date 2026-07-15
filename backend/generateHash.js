import bcrypt from "bcrypt";

const password = "Admin123*";
const password2 = "123"

const hash = await bcrypt.hash(password, 10);

console.log(hash);