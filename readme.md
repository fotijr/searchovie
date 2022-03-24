# Searchovie
Movie search built in React. Movies searched via [The Movie DB's API](https://developers.themoviedb.org/3/movies/get-popular-movies). Back-end hosted on Netlify's free platform using [Netlify Functions](https://www.netlify.com/products/functions).

[✨ Try out searchovie ✨](https://searchovie.fotijr.com/)

## Libraries used
- Axios, for network requests.
- Lodash, for debouncing.
- Mu, for autocomplete component.
- Tailwind CSS, for a utility-based CSS framework.

## The Movie DB API
Access to the API requires an API key (obtained when registering a free account). To run this code, you will need to set your API key value to the `SEARCHOVIE_API_KEY` environment variable.

## Development scripts
```
# run the front-end and backend
yarn dev:all

# run the front-end only
yarn dev

# build the app
yarn build
```
