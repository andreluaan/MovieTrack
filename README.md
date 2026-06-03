# 🎬 MovieTrack

Aplicação para gerenciar filmes assistidos e lista de filmes que desejo assistir.

##  Ideia

O usuário busca filmes pela integração com a API do TMDB, adiciona à sua lista
de "Quero Assistir" e, após assistir, move para "Assistidos" com nota (1–5) e
descrição opcional.

##  Classes do Domínio

### Genre
Representa o gênero cinematográfico. Existe de forma independente.
```
id | name | description
```

### Review
Avaliação do usuário. Só existe vinculada a um Movie (Composição).
```
rating (1–5) | description (opcional) | watchedAt
```

### Movie
Entidade principal. Associa-se a Genre e compõe Review.
```
id | title | year | status (watched | watchlist) | genreId | review | createdAt
```

### MovieCollection
Agrupa os filmes do usuário (Agregação). Oferece as duas listas.
```
movies[] → getWatched() | getWatchlist() | add() | remove()
```

### MovieRepository
Abstração de persistência. O Controller depende da interface, não da implementação.
```
IMovieRepository → InMemoryMovieRepository
```

## Relações entre as Classes

- **Associação**: Movie → Genre (referencia por id, Genre existe sozinho)
- **Composição**: Movie → Review (Review não existe sem Movie)
- **Agregação**: MovieCollection → Movie[] (Movie existe fora da coleção)
- **Dependência**: MovieController → IMovieRepository (depende da abstração)
