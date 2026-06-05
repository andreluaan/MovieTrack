const express = require('express');

function createTmdbRouter() {
  const router = express.Router();

  router.get('/search', async (req, res) => {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, error: 'Parâmetro q é obrigatório' });
    }

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(q)}&language=pt-BR`;
      const response = await fetch(url);
      const data     = await response.json();

      const filmes = data.results.slice(0, 10).map(m => ({
        tmdbId:      m.id,
        title:       m.title,
        year:        m.release_date ? m.release_date.split('-')[0] : '—',
        overview:    m.overview,
        poster:      m.poster_path,
        voteAverage: m.vote_average,
      }));

      res.json({ success: true, data: filmes });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}

module.exports = createTmdbRouter;