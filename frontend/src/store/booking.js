import { csrfFetch } from "./csrf";

// ACTIONS
const VIEW_BOOKINGS = 'booking/viewBooking'
const ADD_BOOKING = 'booking/createBooking'
const EDIT_BOOKING = 'booking/editBooking'
const DELETE_BOOKING = 'booking/deleteBooking'

const actionViewBookings = (booking) => {
  return {
    type: VIEW_BOOKINGS,
    booking
  }
}
const actionCreateBooking = (booking) => {
  return {
    type: ADD_BOOKING,
    booking
  }
}
const actionEditBooking = (bookingId) => {
  return {
    type: EDIT_BOOKING,
    bookingId
  }
}
const actionDeleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    bookingId
  }
}

//THUNKS

export const thunkViewAllSpotBookings  = async (dispatch) => {
  // const res = await csrfFetch(`/api/${spotId}/bookings`)

  // if (res.ok) {
  //   const bookings = await res.json();
  //   dispatch(actionViewBookings(bookings));
  //   return bookings
  // }
}

export const thunkCreateBooking = async (dispatch) => {
  // const res = await csrfFetch(`/api/${spotId}/booking`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(newBooking),
  // });

  // if (res.ok) {
  //   const newBooking = await res.json();
  //   dispatch(actionCreateBooking(newBooking));
  // }
}

export const thunkUpdateBooking  = async (dispatch) => {
  // const res = await csrfFetch(`/api/spots/${bookingId}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (res.ok) { }
}

export const thunkDeleteBooking  = async (dispatch) => {

  // const res = await csrfFetch(`/api/booking/${bookingId}`, {
  //   method: "DELETE",
  // });
  // if (res.ok) {
  //   // const bookings = await res.json();
  //   dispatch(actionDeleteBooking(bookingId));
  // }
}

//Reducer
const initialState = {}

const bookingReducer= (state = initialState, action) => {
  switch (action.type) {

    //get booking
    case VIEW_BOOKINGS:

    // create booking
    case ADD_BOOKING:

    //edit booking
    case EDIT_BOOKING:

    //delete booking
    case DELETE_BOOKING:

    // rest goes above
     default:
      return state;
  }
}


export default bookingReducer
