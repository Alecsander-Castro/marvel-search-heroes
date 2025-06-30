import { Link } from "react-router-dom";
import type { Heroes } from "../models/Heroes";

interface HeroesList {
  heroes: Heroes[];
}

function HeroesList({ heroes }: HeroesList) {
  return heroes.map((hero) => (
    <div key={hero.id}>
      <Link to={`/heroes-page/${hero.id}`}>
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.name}
        />
        <p>{hero.name}</p>
      </Link>
    </div>
  ));
}
export default HeroesList;
