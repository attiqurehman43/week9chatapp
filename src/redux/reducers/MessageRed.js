import {createSlice} from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    saveMessages: (state, action) => {
      console.log('action', action.payload);
      const msg = state.messages;
      msg.push(action.payload);
      state.messages = msg;
    },
  },
});

export const {saveMessages} = messageSlice.actions;
export default messageSlice.reducer;
