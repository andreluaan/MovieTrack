const express    = require('express');
const cors       = require('cors');
const path       = require('path');

const { InMemoryMovieRepository } = require('./src/models/MovieRepository');
const MovieController              = require('./src/controllers/MovieController');
const createMovieRouter            = require('./src/routes/movieRoutes');
const { error, notFound }   = require('./src/middleware/error');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const repository  = new InMemoryMovieRepository();
const controller  = new MovieController(repository);
const movieRouter = createMovieRouter(controller);

// Rotas da API
app.use('/api/movies', movieRouter);
app.get('/api/genres', controller.getGenres);

app.get('/{*path}', (request, response) => {
  if (request.path.startsWith('/api')) return notFound(request, response);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(error);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});