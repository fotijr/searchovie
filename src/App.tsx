import { useEffect, useState } from 'react'
import { debounce } from 'lodash';
import movieLogo from './movie.svg'
import Header from './Header';
import { search, getPopular, getConfig } from './movies.service';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ApiConfig, Movie } from './models';

function App() {
  const [apiConfig, setApiConfig] = useState<ApiConfig>();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const term = (e.target as HTMLInputElement).value;
    searchMovies(term);
  };

  const searchMovies = async (term: string) => {
    console.log(`term: ${term}, searchTerm: ${searchTerm}`);
    const movies = await search(term);
    setPopularMovies(movies.results);
    return movies;
  };
  var debouncedSearch = debounce(searchMovies, 200);

  const onChange = (event: React.SyntheticEvent<Element, Event>, value: any, reason: string, details: any) => {
    const term = (event.target as HTMLInputElement).value;
    searchMovies(term);
    console.log('onchange', event, value, reason, details);
  }

  const onInputChange = async (event: React.SyntheticEvent<Element, Event>, value: any, reason: string) => {
    const term = (event.target as HTMLInputElement).value;
    console.log('setting term', term);
    setSearchTerm(term);
    debouncedSearch(term);
    console.log('onInputChange', event, value, reason);
  }

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
    Promise.all([
      getConfig(),
      getPopular()
    ]).then(([config, movies]) => {
      setApiConfig(config);
      setPopularMovies(movies);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className='input-controls max-w-screen-md mx-auto'>
        <Autocomplete freeSolo
          options={Array(10).fill(undefined).map((_, i) => i.toString())}
          onChange={(e, value, reason, details) => onChange(e, value, reason, details)}
          onInputChange={(e, value, reason) => onInputChange(e, value, reason)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        <button>Search</button>
      </div>
      <div className='flex flex-wrap'>
        {popularMovies.map((m) => (
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
