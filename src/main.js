import express from 'express';
import { validationResult } from 'express-validator';
import cors from 'cors';
import {
  getAllPosts,
  getOnePost,
  createPost,
  editOnePost,
  deletePost,
} from './db.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

// Routes
app.get('/', (req, res) => {
  res.send('sTechInsight:Lab 6: Server Side Javascript');
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await getOnePost(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/posts', validateRequest, async (req, res) => {
  try {
    const result = await createPost(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/posts/:postId', validateRequest, async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await editOnePost(postId, req.body.columna, req.body.valor);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.delete('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await deletePost(postId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Handler para métodos no implementados
app.use((req, res) => {
  res.status(501).json({ error: 'Método no implementado' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});
