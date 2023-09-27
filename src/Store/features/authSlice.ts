import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {};
  loading: boolean;
  error: string;
  message: string;
  accessToken: string | null;
  refreshToken: string | null;
}

interface SignUpPayload {
  error: string;
  message: string;
  accessToken: string;
  refreshToken: string;
}
interface SignInPayload {
  error: string;
  message: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: "",
  message: "",
  accessToken: "",
  refreshToken: "",
};

export const signUpUser = createAsyncThunk<SignUpPayload, any>(
  "auth/signUpUser",
  async (user) => {
    const res = await fetch(
      "https://e-commerce-backend-zprm.onrender.com/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    return await res.json();
  }
);

// export const signInUser = createAsyncThunk<SignInPayload, any>(
//   "auth/signInUser",
//   async (user) => {
//     const res = await fetch(
//       "https://e-commerce-backend-zprm.onrender.com/user/login",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       }
//     );

//     return await res.json();
//   }
// );

export const signInUser = createAsyncThunk<SignInPayload, any>(
  "auth/signInUser",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://e-commerce-backend-zprm.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.error);
      }

      return data;
    } catch (error) {
      return rejectWithValue("An error occurred while signing in");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await fetch(
        "https://e-commerce-backend-zprm.onrender.com/user/refreshToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.error);
      }
      dispatch(updateAccessToken(data.accessToken));
      return data;
    } catch (error) {
      return rejectWithValue("An error occurred while refreshing token");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.accessToken = localStorage.getItem("token") || action.payload;
    },
    addUser: (state, action: PayloadAction<string>) => {
      state.accessToken = localStorage.getItem("user") || action.payload;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.message = action.payload.message;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.payload.refreshToken)
      );
      state.isAuthenticated = true;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
    });

    // SignIn User

    builder.addCase(signInUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.message = action.payload.message;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.payload.refreshToken)
      );
      state.isAuthenticated = true;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const { addToken, addUser, logOut, updateAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
