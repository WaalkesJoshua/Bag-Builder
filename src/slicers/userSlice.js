import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_DEV_URL;
const PORT = process.env.REACT_APP_NODE_PORT;
const API_KEY = process.env.REACT_APP_API_KEY;
const headers = {"Authorization": API_KEY};



const initialState = {
  users: [],
  currentUser: {},
  usersBags: []
};

export const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    addUsers: (state, {payload}) => {
      const {users} = payload;
      state.users = users;
    },
    addOneUser: (state, {payload}) => {
      const {user} = payload;
      state.users = [...state.users, user];
    },
    setCurrentUser: (state, {payload}) => {
      const {user} = payload;
      state.currentUser = user;
    },
    setUsersBags: (state, {payload}) => {
      const {bags} = payload;
      state.usersBags = bags;
    },
  }
});

export const {
  addUsers,
  addOneUser,
  setCurrentUser,
  setUsersBags
} = userSlice.actions;

export async function fetchUsers(dispatch) {
  try{
    const response = await axios.get(`${BASE_URL}${PORT}/users`, {headers});
    const users = response.data;
    dispatch(addUsers({users}));
  } catch (error) {
    console.error('Fetch users error: ' + error);
  }
};

export async function fetchUserBags(dispatch, userId) {
  try {
    const response = await axios.get(`${BASE_URL}${PORT}/bags/userId/${userId}`, {headers});
    const bags = response.data;
    dispatch(setUsersBags({bags}));
  } catch (error) {
    console.error('Fetch users bags error: ' + error);
  }
};



