import { Link } from 'react-router-dom';
import './HootList.css'

const HootList = ({ hoots }) => {
  
  if (!Array.isArray(hoots) || hoots.length === 0) {
    return <p>No hoots available.</p>;
  }

  return (
    <main id="hootlist-main">
      {hoots.map((hoot) => (
        <div className="hoot-card">
          <Link key={hoot._id} to={`/hoots/${hoot._id}`} className="hoot-card-link">
            <header className="hoot-card-header">
              <div className="hoot-card-head">
                <h2 className="hoot-card-title">{hoot.title}</h2>
                <p><span className="hoot-card-cat">{hoot.category}</span></p>
              </div>
            </header>
            <p className="hoot-card-text">{hoot.text}</p>
            <p>
                {hoot.author.username} <span>posted on</span> {new Date(hoot.createdAt).toLocaleDateString()}
            </p>
          </Link>
        </div>
      ))}
    </main>
  );
};

export default HootList;