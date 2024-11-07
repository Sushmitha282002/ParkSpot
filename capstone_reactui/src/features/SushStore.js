import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id:null,
      token: null,
      refreshToken: null,
      role: null,
      username: null,
      firstLetter: null,
      firstname: null,
      lastname: null,
      agreed: false, // Initial agreement status
      areaid: null,  
      bookingId: null,
      loginType: null
    }
  },
  reducers: {
    setUser: (state, action) => {
      const {id,token, refreshToken, role, username, firstLetter, firstname, lastname, agreed,loginType } = action.payload;
      
      state.user.id=id;
      state.user.token = token;
      state.user.refreshToken = refreshToken;
      state.user.role = role;
      state.user.username = username;
      state.user.firstname = firstname;
      state.user.lastname = lastname;
      state.user.firstLetter = firstLetter;
      state.user.loginType=loginType;
      state.user.agreed = agreed; // Store agreement status
    },
    clearUser(state) {

      state.user.id=null;
      state.user.token = null;
      state.user.refreshToken = null;
      state.user.role = null;
      state.user.username = null;
      state.user.firstLetter = null;
      state.user.firstname = null;
      state.user.lastname = null;
      state.user.loginType=null;
      state.user.agreed = false; // Reset agreement status on logout
      state.user.areaid = null;
      state.user.bookingId = null;
    },
    setAgreement(state, action) {
      state.user.agreed = action.payload; // Update agreement status
    },
    setAreaId: (state, action) => {
      state.user.areaid = action.payload; // Set area ID
    },
    setBookingId: (state, action) => {
      state.user.bookingId = action.payload; // Set booking ID after a successful booking
    }
  }
});

// Export actions
export const { setUser, clearUser, setAgreement,setAreaId , setBookingId} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
