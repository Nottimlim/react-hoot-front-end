import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as hootService from "../../services/hootService";
// hi
const HootDetails = (props) => {
  const [hoot, setHoot] = useState(null);
  const user = useContext(AuthedUserContext);

  const { hootId } = useParams();

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      console.log("hootData", hootData);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);
///test 5
  // Verify that hoot state is being set correctly:
  console.log("hoot state:", hoot);

  if (!hoot) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          {hoot.author.username} posted on
          {new Date(hoot.createdAt).toLocaleDateString()}
        </p>
        {hoot.author._id === user._id && (
          <>
            <button onClick={() => props.handleDeleteHoot(hootId)}>
              Delete
            </button>
        </>
      )}
      </header>
      <p>{hoot.text}</p>
      <section>
        <h2>Comments</h2>

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
