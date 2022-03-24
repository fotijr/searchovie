import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
// import { useLocation } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

import { Movie } from './models';
import { debounce } from 'lodash';
import { search, getPopular } from './movies.service';
import { useHistory } from 'react-router-dom';

type HeaderProps = {
    /** Show list of movies */
    showMovies: (movies: Movie[]) => void;
};

function Header({ showMovies }: HeaderProps) {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Movie[]>([]);

    const searchMovies = async (term: string) => {
        const movies = await search(term);
        setSuggestions(movies.results);
        showMovies(movies.results);
        return movies;
    };
    var debouncedSearch = debounce(searchMovies, 200);

    /** Handle user selecting an autocomplete result */
    const handleUserInitiatedSearch = (movie: Movie | string) => {
        if (typeof movie === 'string') {
            // search term selected
            if (movie !== searchTerm) {
                setSearchTerm(movie);
            }
            searchMovies(movie);
            history.push({
                pathname: '/',
                search: `?search=${encodeURIComponent(movie)}`
            });
        } else {
            // movie selected from auto-complete, go to movie page
            history.push(`/${movie.id}`);
        }
    }

    /** Handle user typing into search box */
    const onInputChange = async (event: React.SyntheticEvent<Element, Event>, value: any, reason: string) => {
        const term = (event.target as HTMLInputElement).value;
        setSearchTerm(term);
        debouncedSearch(term);
    }

    useEffect(() => {
        // initial view shows popular movies
        getPopular().then(m => showMovies(m));
    }, []);

    return <div>
        <div className='flex bg-ovieblue items-center'>
            <span className='mx-8 text-white font-sans	font-black text-2xl'>searchovie</span>
            <Autocomplete freeSolo
            className='my-2 flex-grow max-w-4xl'
                noOptionsText="No movies found"
                getOptionLabel={(m: Movie | string) => (m as Movie).title || m as string}
                options={suggestions}
                onChange={(e, value, reason, details) => handleUserInitiatedSearch(details?.option as Movie)}
                onInputChange={(e, value, reason) => onInputChange(e, value, reason)}
                disableClearable
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
            <button 
            className='bg-white px-8 py-4 text-ovieblue mx-4'
            onClick={() => { handleUserInitiatedSearch(searchTerm) }}>Search</button>
        </div>

    </div>
};

export default Header;