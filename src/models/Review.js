
class Review {
  constructor({ rating, description = '', watchedAt = null }) {
    this.setRating(rating);
    this.description = String(description).trim();
    this.watchedAt   = watchedAt ? new Date(watchedAt) : new Date();
  }

  setRating(value) {
    const n = Number(value);

    if (!Number.isInteger(n) || n < 1 || n > 5) {
      throw new Error('Rating deve ser um número inteiro entre 1 e 5');
    }

    this.rating = n;
  }

  toJSON() {
    return {
      rating:      this.rating,
      description: this.description,
      watchedAt:   this.watchedAt.toISOString(),
    };
  }
}

module.exports = Review;