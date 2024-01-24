const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gaza',
    port: 3306,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS user_account (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    state INT,
    role VARCHAR(255)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating user_account table:', err.message);
  } else {
    console.log('user_account table created successfully');
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS user_data (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(255),
    picture VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating donor_data table:', err.message);
  } else {
    console.log('donor_data table created successfully');
  }
});


pool.query(`
  CREATE TABLE IF NOT EXISTS article (
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT ,
    type VARCHAR(255),
    title VARCHAR(255),
    content VARCHAR(255),
    picture VARCHAR(255),
    state INT DEFAULT 1,
    rating DOUBLE DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES user_data(user_id)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating donor_data table:', err.message);
  } else {
    console.log('atrticle table created successfully');
  }
});


pool.query(`
  CREATE TABLE IF NOT EXISTS donation_money (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT ,
    amount VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating donor_data table:', err.message);
  } else {
    console.log('donation_money table created successfully');
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS donation_money_anonymous (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    amount VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating donation_money_anonymous table:', err.message);
  } else {
    console.log('donation_money_anonymous table created successfully');
  }
});


pool.query(`
  CREATE TABLE IF NOT EXISTS donation_goods (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT ,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating donation_goods table:', err.message);
  } else {
    console.log('donation_goods table created successfully');
  }
});


pool.query(`
  CREATE TABLE IF NOT EXISTS donation_goods_anonymous (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(255),
    type VARCHAR(255)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating donation_goods_anonymous table:', err.message);
  } else {
    console.log('donation_goods_anonymous table created successfully');
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    comment VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating comment table:', err.message);
  } else {
    console.log('comment table created successfully');
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS rating (
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    article_id INT,
    rating INT,
    PRIMARY KEY (user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES user_data(user_id),
    FOREIGN KEY (article_id) REFERENCES article(article_id)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating rating table:', err.message);
  } else {
    console.log('rating table created successfully');
  }
});


pool.query(`
  CREATE TABLE IF NOT EXISTS notification (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    title VARCHAR(255),
    description VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)
  );
`, (err, results) => {
  if (err) {
    console.error('Error creating notification table:', err.message);
  } else {
    console.log('notification table created successfully');
  }
});
/*pool.query(`
    CREATE TABLE IF NOT EXISTS Role (
        RoleID INT AUTO_INCREMENT PRIMARY KEY,
        RoleName VARCHAR(255)
    );
`, (err, results) => {
    if (err) {
        console.error('Error creating Role table:', err.message);
    } else {
        console.log('Role table created successfully');
    }
});

pool.query(`
    CREATE TABLE IF NOT EXISTS User (
        UserID INT AUTO_INCREMENT PRIMARY KEY,
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
        Address VARCHAR(255),
        PhoneNumber VARCHAR(20),
        Email VARCHAR(255),
        Password VARCHAR(255),
        RoleID INT,
        FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
    );
`, (err, results) => {
    if (err) {
        console.error('Error creating User table:', err.message);
    } else {
        console.log('User table created successfully');
    }
});

pool.query(`
    CREATE TABLE IF NOT EXISTS goods_donation (
        DonationID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
        Address VARCHAR(255),
        PhoneNumber VARCHAR(20),
        Email VARCHAR(255),
        DonationDate DATETIME,
        FOREIGN KEY (UserID) REFERENCES User(UserID)
    );
`, (err, results) => {
    if (err) {
        console.error('Error creating Donation table:', err.message);
    } else {
        console.log('Donation table created successfully');
    }
});

const createAnonymousDonationTableQuery = `
    CREATE TABLE IF NOT EXISTS anonymous_donation (
        DonationID INT AUTO_INCREMENT PRIMARY KEY,
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
        Address VARCHAR(255),
        PhoneNumber VARCHAR(20),
        Email VARCHAR(255),
        DonationDate DATETIME
    );
`;

pool.query(createAnonymousDonationTableQuery, (err, results) => {
    if (err) {
        console.error('Error creating anonymous_donation table:', err.message);
    } else {
        console.log('anonymous_donation table created successfully');
    }
});


pool.query(`
    CREATE TABLE IF NOT EXISTS Goods (
        GoodID INT AUTO_INCREMENT PRIMARY KEY,
        DonationID INT,
        GoodType VARCHAR(255),
        FOREIGN KEY (DonationID) REFERENCES Donation(DonationID)
    );
`, (err, results) => {
    if (err) {
        console.error('Error creating Goods table:', err.message);
    } else {
        console.log('Goods table created successfully');
    }
});


const createCommentsTableQuery = `
    CREATE TABLE IF NOT EXISTS Comments (
        CommentID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        Content TEXT,
        CommentDate DATETIME,
        FOREIGN KEY (UserID) REFERENCES User(UserID)
    );
`;

pool.query(createCommentsTableQuery, (err, results) => {
    if (err) {
        console.error('Error creating Comments table:', err.message);
    } else {
        console.log('Comments table created successfully');
    }
});


const createArticlesTableQuery = `
    CREATE TABLE IF NOT EXISTS Articles (
        ArticleID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        Title VARCHAR(255),
        Content TEXT,
        ImageURL VARCHAR(255),
        PublicationDate DATETIME,
        Type VARCHAR(50) CHECK (Type IN ('news', 'events')),
        FOREIGN KEY (UserID) REFERENCES User(UserID) 
    );
`;
pool.query(createArticlesTableQuery, (err, results) => {
    if (err) {
        console.error('Error creating articles table:', err.message);
    } else {
        console.log('articles table created successfully');
    }
});

const createRatingsTableQuery = `
    CREATE TABLE IF NOT EXISTS Ratings (
        RatingID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        ArticleID INT,
        RatingValue INT CHECK (RatingValue >= 1 AND RatingValue <= 5),
        FOREIGN KEY (UserID) REFERENCES User(UserID),
        FOREIGN KEY (ArticleID) REFERENCES Articles(ArticleID)
    );
`;

pool.query(createRatingsTableQuery, (err, results) => {
    if (err) {
        console.error('Error creating Ratings table:', err.message);
    } else {
        console.log('Ratings table created successfully');
    }
});*/

module.exports = pool.promise(); // add promise here