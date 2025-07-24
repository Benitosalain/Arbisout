import Datastore from 'nedb-promises';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES module style
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make sure users.db is always loaded from the project root
const dbPath = path.resolve(__dirname, '../../users.db'); // Adjust if needed

const usersDb = Datastore.create({ filename: dbPath, autoload: true });
const saltRounds = 10;

// Ensure a default admin user exists
async function ensureDefaultAdmin() {
  const users = await usersDb.find({});
  if (users.length === 0) {
    const hashedPassword = await bcrypt.hash('123456', saltRounds);
    await usersDb.insert({ username: 'admin', password: hashedPassword, role: 'admin' });
    console.log('✅ Default admin user created: admin / 123456');
  }
}
ensureDefaultAdmin();

export async function getAllUsers() {
  try {
    const users = await usersDb.find({});
    return users;
  } catch {
    return [];
  }
}

export async function findUser(username, password) {
  try {
    const user = await usersDb.findOne({ username });
    if (user && user.password) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      return passwordMatch ? user : null;
    }
    return null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
}

export async function addUser(username, password, role = 'user') {
  try {
    const existing = await usersDb.findOne({ username });
    if (existing) {
      return { success: false, error: "User exists" };
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = { username, password: hashedPassword, role };
    await usersDb.insert(newUser);
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Error adding user:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteUser(username) {
  try {
    const result = await usersDb.remove({ username }, {});
    if (result === 0) {
      return { success: false, error: "User not found" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: error.message };
  }
}

export default usersDb;
