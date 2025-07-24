import usersDb from '../db/users';

export async function loginUser(username, password) { // Changed 'email' to 'username'
    const user = await usersDb.findUser(username, password); // Now calling findUser with username
    if (user) {
        return { success: true, user };
    }
    return { success: false };
}

