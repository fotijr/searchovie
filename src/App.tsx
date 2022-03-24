import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import movieLogo from './movie.svg'
import Header from './Header';
import MovieDetails from './MovieDetails';
import { search, getPopular, getConfig } from './movies.service';

import { ApiConfig, Movie } from './models';

function App() {

  const [apiConfig, setApiConfig] = useState<ApiConfig>();
  const [results, setResults] = useState<Movie[]>([]);

  const getImagePath = (path: string) => {
    let url: string;
    if (!path || !apiConfig) {
      url = movieLogo;
    } else {
      url = `${apiConfig?.images.base_url}${apiConfig?.images.backdrop_sizes[0]}${path}`;
    }
    return url;
  }

  useEffect(() => {
    getConfig().then(c => setApiConfig(c));
  }, []);

  return (
    <Router>
      <Header showMovies={(movies) => setResults(movies)} />
      <div className='mx-4 my-2'>
        <Switch>
          <Route path="/:id">
            <MovieDetails />
          </Route>
          <Route path="/">
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
              {results.map((m) => (
                <div key={m.id} className='mb-8 bg-center bg-cover flex flex-col justify-end min-h-fit' style={{
                  backgroundImage: `url('${getImagePath(m.backdrop_path)}')`
                }}>
                  <div className='mt-8 -mb-6 p-2 text-white bg-gradient-to-b from-transparent to-black'>
                    <h3 className='text-2xl mb-1'>{m.title}</h3>
                    <div className='line-clamp-3 text-xs'>{m.overview}</div>
                  </div>
                </div>
              ))}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
