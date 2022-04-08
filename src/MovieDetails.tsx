import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Highlight from "./Highlight";
import { MovieDetails as Movie } from "./models";
import { get } from "./movies.service";
import Tags from "./Tags";

type MovieDetailsProps = {
  getImagePath: (path: string) => string;
};

function MovieDetails({ getImagePath }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie>();
  let { id } = useParams() as { id: string };


  useEffect(() => {
    if (id) {
      get(parseInt(id, 10)).then(m => {
        m.release_date = new Date(m.release_date);
        setMovie(m);
      });
    }
  }, [id]);

  const formatCurrency = (amount: number) => {
    const formatOptions: Intl.NumberFormatOptions = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
      currencyDisplay: 'narrowSymbol',
      style: 'currency'
    };
    return new Intl.NumberFormat('en-US', formatOptions).format(amount);
  };

  let body;
  if (!movie) {
    body = <span>Loading movie details...</span>;
  } else if (movie.success === false) {
    body = <h2>Sorry, we couldn't find that movie.</h2>;
  } else {
    body = <div className="flex m-8">
      <div className="mr-8 grow">
        <img className="w-[48em]" src={getImagePath(movie.poster_path)} alt={movie.title} />
      </div>
      <div>
        <h2 className="text-5xl mb-2">{movie.title}</h2>
        <h3 className="font-light mb-6 text-xl">{movie.tagline}</h3>
        <p className="mb-8">{movie.overview}</p>
        <div className="grid grid-cols-3">
          <Highlight label="Released" value={movie.release_date.getFullYear()} tooltip={movie.release_date.toLocaleDateString()} />
          <Highlight label="Runtime" value={`${movie.runtime} mins`} />
          <Highlight label="User rating" value={movie.vote_average} tooltip={`${movie.vote_count.toLocaleString()} votes`} />
          {
            !!movie.budget &&
            <Highlight label="Budget" value={formatCurrency(movie.budget)} tooltip={`$${movie.budget.toLocaleString()}`} />
          }
          {
            !!movie.revenue &&
            <Highlight label="Revenue" value={formatCurrency(movie.revenue)} tooltip={`$${movie.revenue.toLocaleString()}`} />
          }
          <Tags label="Genre" values={movie.genres.map(g => g.name)} />
        </div>
      </div>
    </div>;
  }

  return <div>
    {body}
  </div>
};

export default MovieDetails;