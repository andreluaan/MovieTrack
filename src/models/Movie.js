const Review = require('./Review');
const Genre  = require('./Genre');

class Movie {
  constructor({ id, title, year, genreId, status = 'watchlist', review = null, createdAt = null }) {
    this.id        = id;
    this.title     = String(title).trim();
    this.year      = Number(year) || new Date().getFullYear();
    this.status    = status; 
    this.createdAt = createdAt ? new Date(createdAt) : new Date();

    this.genreId = genreId || 'action';
    this._genre  = Genre.DEFAULTS.find(g => g.id === this.genreId) || Genre.DEFAULTS[0];

    this.review = status === 'watched' && review
      ? new Review(review)
      : null;
  }

  markAsWatched(reviewData) {
    this.status = 'watched';
    this.review = new Review(reviewData);
  }

  update({ title, year, genreId, review }) {
    if (title)   this.title   = String(title).trim();
    if (year)    this.year    = Number(year);
    if (genreId) {
      this.genreId = genreId;
      this._genre  = Genre.DEFAULTS.find(g => g.id === genreId) || this._genre;
    }

    if (review && this.status === 'watched') {
      this.review = new Review(review);
    }
  }

  toJSON() {
    return {
      id:        this.id,
      title:     this.title,
      year:      this.year,
      status:    this.status,
      genreId:   this.genreId,
      genre:     this._genre.toJSON(),
      review:    this.review ? this.review.toJSON() : null,
      createdAt: this.createdAt.toISOString(),
    };
  }
}

module.exports = Movie;