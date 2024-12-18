import { Link } from 'react-router-dom';
import './style.css'; // Ensure the path is correct

export const HomePage = () => {
  return (
    <div className="container text-center mt-5 pt-5">
      <h1 className="my-4">Fruit World!</h1>
      <h6 className='text-white my-4'>
        Select the difficulty level
      </h6>
      <div className="cards-holder row mx-auto">
        <Link to={'/levelEasy'} className="card col-3 mx-auto" style={{    background:'linear-gradient(rgb(207, 255, 214),#6be065)'}}id="easy">
            <h2>Easy</h2>
        </Link>
        <Link to={'/levelModerate'}  className="card col-3 max-auto" style={{    background:'linear-gradient(yellow, orange)'}} id="moderate">
          <h2>Moderate</h2>
        </Link>
        <Link to={'/levelDifficulty'}  className="card col-3 mx-auto"  style={{    background:'linear-gradient(rgb(0, 0, 0),#3e0315)'}} id="difficult">
          <h2>Difficult</h2>
        </Link>
      </div>
    </div>
  );
};
