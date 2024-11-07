import userReducer, { setUser, clearUser, setAgreement, setAreaId, setBookingId } from '../SushStore'; 

describe('userSlice reducer', () => {
  const initialState = {
    user: {
      id: null,
      token: null,
      refreshToken: null,
      role: null,
      username: null,
      firstLetter: null,
      firstname: null,
      lastname: null,
      agreed: false,
      areaid: null,
      bookingId: null
    }
  };

  // Test initial state
  it('should return the initial state when passed an empty action', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  // Test setUser action
  it('should handle setUser', () => {
    const action = {
      payload: {
        id: 1,
        token: 'sampleToken',
        refreshToken: 'sampleRefreshToken',
        role: 'admin',
        username: 'johndoe',
        firstLetter: 'J',
        firstname: 'John',
        lastname: 'Doe',
        agreed: true
      }
    };

    const expectedState = {
      user: {
        id: 1,
        token: 'sampleToken',
        refreshToken: 'sampleRefreshToken',
        role: 'admin',
        username: 'johndoe',
        firstname: 'John',
        lastname: 'Doe',
        firstLetter: 'J',
        agreed: true,
        areaid: null,
        bookingId: null
      }
    };

    expect(userReducer(initialState, setUser(action.payload))).toEqual(expectedState);
  });

  // Test clearUser action
  it('should handle clearUser', () => {
    const populatedState = {
      user: {
        id: 1,
        token: 'sampleToken',
        refreshToken: 'sampleRefreshToken',
        role: 'admin',
        username: 'johndoe',
        firstLetter: 'J',
        firstname: 'John',
        lastname: 'Doe',
        agreed: true,
        areaid: 123,
        bookingId: 'booking123'
      }
    };

    const expectedState = {
      ...initialState,
      user: {
        ...initialState.user,
        areaid: null,
        bookingId: null
      }
    };

    expect(userReducer(populatedState, clearUser())).toEqual(expectedState);
  });

  // Test setAgreement action
  it('should handle setAgreement', () => {
    const action = { payload: true };
    const expectedState = {
      ...initialState,
      user: {
        ...initialState.user,
        agreed: true
      }
    };

    expect(userReducer(initialState, setAgreement(action.payload))).toEqual(expectedState);
  });

  // Test setAreaId action
  it('should handle setAreaId', () => {
    const action = { payload: 456 };
    const expectedState = {
      ...initialState,
      user: {
        ...initialState.user,
        areaid: 456
      }
    };

    expect(userReducer(initialState, setAreaId(action.payload))).toEqual(expectedState);
  });

  // Test setBookingId action
  it('should handle setBookingId', () => {
    const action = { payload: 'booking123' };
    const expectedState = {
      ...initialState,
      user: {
        ...initialState.user,
        bookingId: 'booking123'
      }
    };

    expect(userReducer(initialState, setBookingId(action.payload))).toEqual(expectedState);
  });
});
