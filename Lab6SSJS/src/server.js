// En un archivo llamado `server.js`

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuración de MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Cambiar a su contraseña de MySQL
  database: 'blog_db'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conexión a la base de datos MySQL establecida');
});

// Middleware para parsear JSON
app.use(bodyParser.json());

// Endpoint GET /posts
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Error al obtener los posts:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.status(200).json(results);
  });
});

// Endpoint GET /posts/:postId
app.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  db.query('SELECT * FROM posts WHERE id = ?', postId, (err, results) => {
    if (err) {
      console.error('Error al obtener el post:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Post no encontrado');
      return;
    }
    res.status(200).json(results[0]);
  });
});

// Endpoint POST /posts
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).send('Debe proporcionar un título y contenido para el post');
    return;
  }
  const newPost = { title, content };
  db.query('INSERT INTO posts SET ?', newPost, (err, result) => {
    if (err) {
      console.error('Error al crear el post:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    newPost.id = result.insertId;
    res.status(200).json(newPost);
  });
});

// Endpoint PUT /posts/:postId
app.put('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).send('Debe proporcionar un título y contenido para actualizar el post');
    return;
  }
  const updatedPost = { title, content };
  db.query('UPDATE posts SET ? WHERE id = ?', [updatedPost, postId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el post:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.status(200).json(updatedPost);
  });
});

// Endpoint DELETE /posts/:postId
app.delete('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  db.query('DELETE FROM posts WHERE id = ?', postId, (err, result) => {
    if (err) {
      console.error('Error al borrar el post:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.sendStatus(204);
  });
});

// Configuración del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
