import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails as Movie } from "./models";
import { get } from "./movies.service";

function MovieDetails() {
  const [movie, setMovie] = useState<Movie>();
  let { id } = useParams() as { id: string };


  useEffect(() => {
    console.log('id', id);
    if (id) {
      get(parseInt(id, 10)).then(m => setMovie(m));
    }
  }, [id]);

  return <div>
    {(!movie || movie.success === false)
      ? <h2>Didn't work</h2>
      : <div>
        <h2>{movie.title}</h2>
        <h3>{movie.tagline}</h3>
        <p>{movie.overview}</p>
      </div>
    }
    <div>
      {JSON.stringify(movie, null, '  ')}
    </div>

  </div>
};

export default MovieDetails;