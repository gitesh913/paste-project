import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addTopastes: (state , action) => {
     const paste  = action.payload
     state.pastes.push(paste);
     localStorage.setItem("pastes" , JSON.stringify(state.pastes))
    },
    updateTopastes: (state , action) => {
     const paste = action.payload;
     const index = state.pastes.findIndex((item) => item._id === paste._id)

    if (index >= 0) {
     state.pastes[index] = paste;
     localStorage.setItem("pastes" , JSON.stringify(state.pastes))
    }
    },
    resetAllpastes: (state, action) => {
      state.pastes =[];
      localStorage.removeItem("pastes")
    },
    removeFrompastes: (state, action) => {
      const pasteID = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteID)

      if (index >= 0) {
        state.pastes.splice(index , 1);
        localStorage.setItem("pastes" , JSON.stringify(state.pastes))
      }
    }
  },
})  

// Action creators are generated for each case reducer function
export const { addTopastes , removeFrompastes , updateTopastes , resetAllpastes } = pasteSlice.actions

export default pasteSlice.reducer