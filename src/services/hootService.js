// src/services/hootService.js
const BASE_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// show all hoots (GET method /hoots)
const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/hoots`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    // const response = await res.json();
    // console.log(response);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// show single hoot (GET method /hoots/:hootId)
const show = async (hootId) => {
  try {
    const res = await fetch(`${BASE_URL}/hoots/${hootId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// post hoot (POST method /hoots)
const create = async (hootFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/hoots`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hootFormData)
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// update hoot (PUT method /hoots/:hootId)
const update = async (hootId, hootFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/hoots/${hootId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hootFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

// delete hoot (DELETE method /hoots/:hootId)
const deleteHoot = async (hootId) => {
  try {
    const res = await fetch(`${BASE_URL}/hoots/${hootId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// post comment (POST method /hoots/:hootId/comments)
const createComment = async (hootId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/hoots/${hootId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

/* --------------------------------Exports--------------------------------*/

export {
  index,
  show,
  create,
  deleteHoot,
  update,
  createComment
};
