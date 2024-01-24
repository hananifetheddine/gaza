const db = require('../../db');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const storage = require('../../util/upload');



const upload = multer({ storage: storage });

// Function to hash the password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};
  

const updateProfile = async (req, res) => {
    const userId = req.user_id;
    const { new_first_name, new_last_name, new_email, new_password,new_address,new_phone_number } = req.body;

    if (!new_first_name && !new_last_name && !new_email && !new_password && !req.file) {
        return res.status(400).json({ error: 'At least one field (newFirstName, newLastName, newEmail, newPassword, profilePic) is required for update' });
    }

    try {
        // Fetch user data based on userId from the database
        const [currentUser] = await db.query('SELECT * FROM user_data WHERE user_id = ?', [userId]);
        

        const [currentAccount] = await db.query('SELECT * FROM user_account WHERE user_id = ?', [userId]);
      


    // Update first name if provided
    const updatedFirstName = new_first_name || currentUser[0].first_name;

    // Update last name if provided
    const updatedLastName = new_last_name || currentUser[0].last_name;

    // Update email if provided
    const updatedEmail = new_email || currentAccount[0].email;

     // Update phone number if provided
     const updatedPhoneNumber = new_phone_number || currentAccount[0].phone_number;

      // Update email if provided
      const updatedAdress = new_address || currentAccount[0].address;
    // Check if the updated email is unique
    const [existingUserWithEmail] = await db.query('SELECT * FROM user_account WHERE email = ? AND user_id != ?', [updatedEmail, userId]);

    if (existingUserWithEmail.length > 0) {
        return res.status(400).json({ error: 'Email is already in use by another user' });
    }

    // Update password if provided
    const updatedPassword = new_password ? await hashPassword(new_password) : currentAccount[0].password;
    console.log(updatedPassword);
    // Update profile picture if provided
    const updatedProfilePic = req.file ? req.file.filename : currentUser[0].profile_pic;

     // Update user account in the database
     await db.query(`
     UPDATE user_account
     SET email = ?, password = ?
     WHERE user_id = ?
   `, [updatedEmail, updatedPassword, userId]);

    // Update user profile in the database
    await db.query(`
      UPDATE user_data
      SET first_name = ?, last_name = ?,  picture = ?,address=?,phone_number=?
      WHERE user_id = ?
    `, [updatedFirstName, updatedLastName,updatedProfilePic,updatedAdress,updatedPhoneNumber, userId]);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });

  }
};

module.exports = [upload.single('profilePic'), updateProfile];
  