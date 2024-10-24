import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as hootService from "../../services/hootService";
import './HootForm.css';

const initial = {
  title: "",
  text: "",
  category: "News",
}

const HootForm = (props) => {

  const { hootId } = useParams();
  const [formData, setFormData] = useState(initial);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (hootId) {
      props.handleUpdateHoot(hootId, formData);
    } else {
      props.handleAddHoot(formData);
    }
  };

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setFormData(hootData);
    };
    if (hootId) {
      fetchHoot()
    } else {
      setFormData(initial);
    };
  }, [hootId]);

  return (
    <main id="hootform-main">
      <form onSubmit={handleSubmit} id="hootform-form">

        <h1>{hootId ? "Edit Hoot" : "New Hoot"}</h1>

        <div className="form-div">
          <label htmlFor="title-input">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title-input"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-div">
          <label htmlFor="text-input">Text</label>
          <textarea
            required
            type="text"
            name="text"
            id="text-input"
            value={formData.text}
            onChange={handleChange}
          />
        </div>

        <div className="form-div">
          <label htmlFor="category-input">Category</label>
          <select
            required
            name="category"
            id="category-input"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="News">News</option>
            <option value="Games">Games</option>
            <option value="Music">Music</option>
            <option value="Movies">Movies</option>
            <option value="Sports">Sports</option>
            <option value="Television">Television</option>
          </select>
        </div>

        <div className="form-div"><button type="submit">SUBMIT</button></div>

      </form>
    </main>
  );
};

export default HootForm;
