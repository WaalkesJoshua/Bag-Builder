import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_DEV_URL || 'http://localhost:';
const port = process.env.REACT_APP_NODE_PORT || 4040;

const initialState = {
  users: [],
  currentUser: {}
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
    }
  }
});

export const {
  addUsers,
  addOneUser,
  setCurrentUser
} = userSlice.actions;

export async function fetchUsers(dispatch) {
  try{
    const response = await axios.get(`${baseUrl}${port}/users`);
    const users = response.data;
    dispatch(addUsers({users}));
  } catch (error) {
    console.error('Fetch users error: ' + error);
  }
};

