import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {AuthedUserContext} from "../../App.jsx"
import CommentForm from "../CommentForm/CommentForm.jsx";
import * as hootService from "../../services/hootService.js";
import './HootDetails.css';


const HootDetails = (props) => {
  
  const [hoot, setHoot] = useState(null);
  const user = useContext(AuthedUserContext);
  
  const { hootId } = useParams();

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData); // removed object within an object
    };
    fetchHoot();
  }, [hootId, hoot]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
  };

  if (!hoot) return <main>Loading...</main>;

  return (
    <main id="hootdetails-main">
      <header>
        <p><span>{hoot.category.toUpperCase()}</span></p>
        <h1>{hoot.title}</h1>
        <p>
          {hoot.author.username} <span>posted on</span> {new Date(hoot.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{hoot.text}</p>
      {hoot.author._id === user._id && (
          <div>
            <Link to={`/hoots/${hootId}/edit`}><button>Edit</button></Link>
            <button onClick={() => props.handleDeleteHoot(hootId)}>
              Delete
            </button>
          </div>
        )}
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => {
          return <article key={comment._id} className="comment-card">
            <header>
              <p className="comment-header">
                {comment.author.username} <span>posted on</span> {new Date(comment.createdAt).toLocaleDateString()}:
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        })}

      </section>
    </main>
  );
};




export default HootDetails;
