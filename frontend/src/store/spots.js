import { csrfFetch } from "./csrf";

const VIEW_USERS = "spots/viewSpots"; //users spot
const VIEW_SPOTS = "spots/viewSpots";
const VIEW_CURRENT = "spots/viewCurrent"; //one spot
const UPDATE_SPOT = "spots/updateSpot";
const ADD_SPOT = "spots/addSpot";
const ADD_IMAGE = "spots/addImage";
const REMOVE_SPOT = "spots/removeSpot";

// Actions
const viewSpots = (spots) => {
  return {
    type: VIEW_SPOTS,
    spots,
  };
};

const viewCurrent = (spot) => {
  return {
    type: VIEW_CURRENT,
    spot,
  };
};

export const viewUserSpots = (userId, spots) => {
  return {
    type: VIEW_USERS,
    userId,
    spots,
  };
};

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

// const addImage = (spotId) => {
//   return {
//     type: ADD_IMAGE,
//     spotId
//   };
// };

const removeSpot = (spot) => {
  return {
    type: REMOVE_SPOT,
    spot,
  };
};

//------------------------------------------------
//THUNKS

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  if (res.ok) {
    const spots = await res.json();
    dispatch(viewSpots(spots));
    return spots;
  }
};

export const getOneSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();

    dispatch(viewCurrent(spot));
    return spot;
  }
};

export const getUsersSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

  if (res.ok) {
    const userSpots = await res.json();
    dispatch(viewUserSpots(userSpots));
    return userSpots;
  }
};

export const createSpot = (newSpot) => async (dispatch) => {
  // console.log("newSpot//////////", newSpot);
  const { previewImage } = newSpot;
  const res = await csrfFetch("/api/spots/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSpot),
  });
  if (res.ok) {
    const createdSpot = await res.json();
    let spotId = createdSpot.id;
    // console.log('createdSpot++++++++', createdSpot)
    const newImgRes = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: previewImage, preview: true }),
    });

    if (newImgRes.ok) {
      const newImg = await newImgRes.json()
      // console.log('newIMg??????????', newImg)
      createdSpot.previewImage = newImg.url
      dispatch(addSpot(createdSpot))
    }

  }
};

// export const addSpotImg = (payload, spotId) => async (dispatch) => {
//   const res = await csrfFetch(``, {});
//   if (res.ok) {
//     const newImg = await res.json();
//     createdSpot: {
//     }
//     dispatch(addSpot(newImg));
//     return {
//       type: ADD_IMAGE,
//       spotId: spotId,
//     };
//   }
// };

export const editASpot = (spotId, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  // console.log('editASpot thunk is it printing')
  if (res.ok) {
    const spot = await res.json();
    dispatch(updateSpot(spot));
    return updateSpot;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    // const spots = await res.json();
    dispatch(removeSpot(spotId));
  }
};

//Reducer
// const initialState = {
//   allSpots: {},
//   spot: {},
// };

// let state = {}
const spotReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case VIEW_SPOTS:
      const manySpots = {};
      action.spots.forEach((spot) => {
        manySpots[spot.id] = spot;
      });
      return manySpots;

    case VIEW_USERS:
      const manyUserSpots = { };
      action.spots.forEach((spot) => {
        manyUserSpots[spot.id] = spot;
      });
      return manyUserSpots;

    case VIEW_CURRENT:
      const oneSpot = {}; //dont spread state due to get request. rely on db
      oneSpot[action.spot.id] = action.spot;
      return oneSpot;

    case UPDATE_SPOT:
      newState = { ...state };
      const updatedSpot = action.spot;
      // newState.spot = {[action.spot.id]: updatedSpot}
      newState[action.spot.id] = updatedSpot;
      return newState;

    case ADD_SPOT:
      newState = { ...state  };
      const newSpot = action.spot;

      newState[action.spot.id] = newSpot;


      return newState;

    // case ADD_IMAGE:
    //   newState = { ...state, spot: { ...state.spot } }
    //   const newImg = action.spot
    //   newState = {
    //     spot: {
    //       [action.spot.id]: newImg
    //     }
    //   }

    case REMOVE_SPOT:
      const deleteSpot = {...state
      };
     delete deleteSpot[action.spot.id]
      return deleteSpot;

    // rest goes above
    default:
      return state;
  }
};

export default spotReducer;
