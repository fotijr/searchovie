import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
// import { useLocation } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

import { Movie } from './models';
import { debounce } from 'lodash';
import { search, getPopular } from './movies.service';

type HeaderProps = {
    showMovies: (movies: Movie[]) => void;
};

function Header({ showMovies }: HeaderProps) {
  //  const history = useNavigate();
    const [suggestions, setSuggestions] = useState<Movie[]>([]);

    const searchMovies = async (term: string) => {
        const movies = await search(term);
        setSuggestions(movies.results);
        showMovies(movies.results);
        return movies;
    };
    var debouncedSearch = debounce(searchMovies, 200);

    /** Handle user selecting an autocomplete result */
    const onChange = (event: React.SyntheticEvent<Element, Event>, value: any, reason: string, details: any) => {
        const term = (event.target as HTMLInputElement).value;
        searchMovies(term);
        console.log('onchange', event, value, reason, details);
    }

    /** Handle user typing into search box */
    const onInputChange = async (event: React.SyntheticEvent<Element, Event>, value: any, reason: string) => {
        const term = (event.target as HTMLInputElement).value;
        updateQueryParams(term);
        debouncedSearch(term);
        console.log('onInputChange', event, value, reason);
    }

    const updateQueryParams = (search: string) => {
        // var searchParams = new URLSearchParams(window.location.search);
        // searchParams.set("search", search);
        // window.location.search = searchParams.toString();
        

        // history.push({
        //     pathname: '/dresses',
        //     search: '?color=blue'
        // });
    }


    useEffect(() => {
        // initial view shows popular movies
        getPopular().then(m => showMovies(m));
    }, []);

    return <div>
        <div className='input-controls max-w-screen-md mx-auto'>
            <h1>searchovie</h1>
            <Autocomplete freeSolo
                options={suggestions.map((m) => m.title)}
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

    </div>
};

export default Header;