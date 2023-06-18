import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_DEV_URL || 'http://localhost:';
const port = process.env.REACT_APP_NODE_PORT || 4040;

const initialState = {
  discs: [],
  userBag: []
};

export const discSlice = createSlice({
  name: 'discs',
  initialState: initialState,
  reducers: {
    addDiscs: (state, { payload }) => {
      const { discs } = payload;
      state.discs = discs;
    },
    //below logic needs review
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
  addDiscs,
  addDiscToBag
} = discSlice.actions;


export async function fetchDiscs(dispatch) {
  try{
    const response = await axios.get(`${baseUrl + port}/discs`);
    const discs = response.data;
    dispatch(addDiscs({ discs }));
  } catch (error) {
    console.log('Fetch Discs error :' + error);
  }
};

export function updateUserBag(dispatch, disc) {
  //adds a disc to a users bag

}