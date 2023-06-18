import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.DEV_URL || 'http://localhost:';
const port = process.env.NODE_PORT || 4040;

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


export async function fetchDiscs(dispatch) {
  try{
    const response = await axios.get(`${baseUrl + port}/discs`);
    const discs = response.data;
    dispatch(getDiscs({ discs }));
  } catch (error) {
    console.log('Fetch Discs error :' + error);
  }
};

export function updateUserBag(dispatch, disc) {
  //adds a disc to a users bag

}