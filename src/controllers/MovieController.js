
class MovieController {
  constructor(repository) {
    this.repo = repository;

    this.getAll       = this.getAll.bind(this);
    this.getById      = this.getById.bind(this);
    this.create       = this.create.bind(this);
    this.update       = this.update.bind(this);
    this.delete       = this.delete.bind(this);
    this.markAsWatched = this.markAsWatched.bind(this);
    this.getStats     = this.getStats.bind(this);
    this.getGenres    = this.getGenres.bind(this);
  }

  getAll(request, response) {
    try {
      const { status } = request.query; 
      const movies = this.repo.getAll({ status });
      response.json({ success: true, data: movies, total: movies.length });
    } catch (err) {
      response.status(500).json({ success: false, error: err.message });
    }
  }

  getById(request, response) {
    try {
      const movie = this.repo.getById(request.params.id);
      response.json({ success: true, data: movie });
    } catch (err) {
      response.status(404).json({ success: false, error: err.message });
    }
  }

  create(request, response) {
    try {
      const movie = this.repo.create(request.body);
      response.status(201).json({ success: true, data: movie });
    } catch (err) {
      response.status(400).json({ success: false, error: err.message });
    }
  }

  update(request, response) {
    try {
      const movie = this.repo.update(request.params.id, request.body);
      response.json({ success: true, data: movie });
    } catch (err) {
      const status = err.message.includes('não encontrado') ? 404 : 400;
      response.status(status).json({ success: false, error: err.message });
    }
  }

  delete(request, response) {
    try {
      this.repo.delete(request.params.id);
      response.json({ success: true, message: 'Filme removido com sucesso' });
    } catch (err) {
      response.status(404).json({ success: false, error: err.message });
    }
  }

  markAsWatched(request, response) {
    try {
      const movie = this.repo.markAsWatched(request.params.id, request.body);
      response.json({ success: true, data: movie });
    } catch (err) {
      const status = err.message.includes('não encontrado') ? 404 : 400;
      response.status(status).json({ success: false, error: err.message });
    }
  }

  getStats(request, response) {
    try {
      const stats = this.repo.getStats();
      response.json({ success: true, data: stats });
    } catch (err) {
      response.status(500).json({ success: false, error: err.message });
    }
  }

  getGenres(request, response) {
    const Genre = require('../models/Genre');
    response.json({ success: true, data: Genre.DEFAULTS.map(g => g.toJSON()) });
  }
}

module.exports = MovieController;