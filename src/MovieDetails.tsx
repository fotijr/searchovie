import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails as Movie } from "./models";
import { get } from "./movies.service";

type MovieDetailsProps = {
  getImagePath: (path: string) => string;
};

function MovieDetails({ getImagePath }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie>();
  let { id } = useParams() as { id: string };


  useEffect(() => {
    if (id) {
      get(parseInt(id, 10)).then(m => setMovie(m));
    }
  }, [id]);

  let body;
  if (!movie) {
    body = <span>Loading movie details...</span>;
  } else if (movie.success === false) {
    body = <h2>Sorry, we couldn't find that movie.</h2>;
  } else {
    body = <div className="flex m-8">
      <div className="mr-8">
        <img src={getImagePath(movie.poster_path)} alt={movie.title} />
      </div>
      <div>
        <h2 className="text-3xl">{movie.title}</h2>
        <h3 className="font-light mb-4">{movie.tagline}</h3>
        <p>{movie.overview}</p>
      </div>
    </div>;
  }

  return <div>
    {body}
  </div>
};

export default MovieDetails;