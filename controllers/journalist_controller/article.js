const multer = require('multer');
const db = require('../../db');


const storage = require('../../util/upload');
const upload = multer({ storage: storage });

const addArticle = async (req, res) => {
  try {
    const { title, content ,type} = req.body;
    const authorId = req.user_id;
    // Validation: Check if required fields are present
    if (!title || !content) {
      return res.status(400).json({ error: 'all feilds are required' });
    }

    // The file has been uploaded successfully
    const filePath = req.file ? req.file.filename : null;

    // Insert the new article into the database
    const insertArticleQuery = `
          INSERT INTO article (title,content ,author_id,type, picture)
          VALUES (?, ?,?, ?,?)
        `;
    await db.execute(insertArticleQuery, [title, content, authorId, type,filePath]);

    res.status(200).json({ message: 'Article added successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = [upload.single('articlePic'), addArticle];

