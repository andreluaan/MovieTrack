
class Genre {
  constructor({ id, name, description = '' }) {
    this.id          = id;
    this.name        = name;
    this.description = description;
  }

  toJSON() {
    return {
      id:          this.id,
      name:        this.name,
      description: this.description,
    };
  }
}

Genre.DEFAULTS = [
  new Genre({ id: 'action',    name: 'Ação' }),
  new Genre({ id: 'drama',     name: 'Drama' }),
  new Genre({ id: 'comedy',    name: 'Comédia' }),
  new Genre({ id: 'horror',    name: 'Terror' }),
  new Genre({ id: 'scifi',     name: 'Ficção Científica' }),
  new Genre({ id: 'romance',   name: 'Romance' }),
  new Genre({ id: 'animation', name: 'Animação' }),
  new Genre({ id: 'thriller',  name: 'Thriller' }),
];

module.exports = Genre;