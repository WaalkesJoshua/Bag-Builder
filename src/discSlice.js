import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  discs: [],
  userBag: []
};

export const discSlice = createSlice({
  name: 'discs',
  initialState: initialState,
  reducers: {
    getDiscs: (state, { payload }) => {
      console.log('state1', state.discs);
      const { discs } = payload;
      state.discs = discs;
      console.log('state2', state.discs);
    },
    addDiscToBag: (state, { payload }) => {
      const { disc } = payload;
      state.discs = [...state.discs, disc];
      state.discs = state.discs.sort((a, b) => {
        return a.speed - b.speed;
      })
    }
  }
});

export const {
  getDiscs,
  addDiscToBag
} = discSlice.actions;

export function fetchDiscs(dispatch) {
  // return async (dispatch) => {
    axios.get(`http://localhost:3030/discs`)
      .then((resp) => {
        // let discs = resp.data;
        // dispatch(getDiscs({ discs }))
        console.log(resp.data);
      })
  // }
};

export function updateUserBag(dispatch, disc) {
  //adds a disc to a users bag

}