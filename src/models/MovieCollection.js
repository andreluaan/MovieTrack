
class MovieCollection {
  constructor(movies = []) {
    this._movies = [...movies];
  }

  getWatched() {
    return this._movies.filter(m => m.status === 'watched');
  }

  getWatchlist() {
    return this._movies.filter(m => m.status === 'watchlist');
  }

  add(movie) {
    const Exist = this._movies.find(m => m.id === movie.id);

    if (Exist) {
      throw new Error(`Filme "${movie.title}" já está na lista`);
    }

    this._movies.push(movie);
  }

  remove(id) {
    const index = this._movies.findIndex(m => m.id === id);

    if (index === -1) {
      throw new Error(`Filme não encontrado`);
    }

    this._movies.splice(index, 1);
  }

  update(id, movie) {
    const index = this._movies.findIndex(m => m.id === id);

    if (index === -1) {
      throw new Error(`Filme não encontrado`);
    }

    this._movies[index] = movie;
  }

  findById(id) {
    return this._movies.find(m => m.id === id) || null;
  }

  getStats() {
    const watched  = this.getWatched();
    const ratings  = watched.map(m => m.review.rating);
    const avgRating = ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;

    return {
      total:        this._movies.length,
      watched:      watched.length,
      watchlist:    this.getWatchlist().length,
      avgRating:    Number(avgRating),
    };
  }

  toJSON() {
    return this._movies.map(m => m.toJSON());
  }
}

module.exports = MovieCollection;