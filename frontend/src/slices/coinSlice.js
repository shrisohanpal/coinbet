import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = { history: [], status: "", result: "" };

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setCoinData: (state, action) => {
      state.history = action.payload.history;
      state.status = action.payload.status;
      state.result = action.payload.result;
    },
  },
});

export const { setCoinData } = coinSlice.actions;

export default coinSlice.reducer;
