const { v4: uuidv4 } = require('uuid');
const Movie           = require('./Movie');
const MovieCollection = require('./MovieCollection');

class IMovieRepository {
  getAll()                { throw new Error('Not implemented: getAll'); }
  getById(id)             { throw new Error('Not implemented: getById'); }
  create(data)            { throw new Error('Not implemented: create'); }
  update(id, data)        { throw new Error('Not implemented: update'); }
  delete(id)              { throw new Error('Not implemented: delete'); }
  markAsWatched(id, data) { throw new Error('Not implemented: markAsWatched'); }
  getStats()              { throw new Error('Not implemented: getStats'); }
}

class InMemoryMovieRepository extends IMovieRepository {
  constructor() {
    super();
    this._collection = new MovieCollection();
  }

  getAll({ status } = {}) {
    const todos = this._collection.toJSON();

    if (status) {
      return todos.filter(m => m.status === status);
    }

    return todos;
  }

  getById(id) {
    const movie = this._collection.findById(id);

    if (!movie) {
      throw new Error(`Filme "${id}" não encontrado`);
    }

    return movie.toJSON();
  }

  create(data) {
    const movie = new Movie({ ...data, id: uuidv4() });
    this._collection.add(movie);
    return movie.toJSON();
  }

  update(id, data) {
    const movie = this._collection.findById(id);

    if (!movie) {
      throw new Error(`Filme "${id}" não encontrado`);
    }

    movie.update(data);
    this._collection.update(id, movie);
    return movie.toJSON();
  }

  delete(id) {
    this._collection.remove(id);
    return true;
  }

  markAsWatched(id, reviewData) {
    const movie = this._collection.findById(id);

    if (!movie) {
      throw new Error(`Filme "${id}" não encontrado`);
    }

    movie.markAsWatched(reviewData);
    this._collection.update(id, movie);
    return movie.toJSON();
  }

  getStats() {
    return this._collection.getStats();
  }
}

module.exports = { IMovieRepository, InMemoryMovieRepository };