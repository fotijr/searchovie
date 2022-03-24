import { useEffect, useState } from 'react'
import { debounce } from 'lodash';
import movieLogo from './movie.svg'
import Header from './Header';
import { search, getPopular, getConfig } from './movies.service';

import { ApiConfig, Movie } from './models';

function App() {
  const [apiConfig, setApiConfig] = useState<ApiConfig>();
  const [results, setResults] = useState<Movie[]>([]);

  const getImagePath = (path: string) => {
    let url: string;
    if (!path) {
      url = movieLogo;
    } else {
      url = `${apiConfig?.images.base_url}${apiConfig?.images.backdrop_sizes[0]}${path}`;
    }
    console.log('url', url);
    return url;
  }

  useEffect(() => {
    getConfig().then(c => setApiConfig(c));
  }, []);

  return (
    <div>
      <Header showMovies={(movies) => setResults(movies)} />
      <div className='flex flex-wrap'>
        {results.map((m) => (
          <div key={m.id} className='flex w-1/3 flex-col mb-4 p-2 bg-center bg-cover' style={{
            backgroundImage: `url('${getImagePath(m.backdrop_path)}')`
          }}>
            <h3 className='my-8'>{m.title}</h3>
            <div className='line-clamp-3'>{m.overview}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
