import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  error: string;
  message: string | null;
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

export const signUpUser = createAsyncThunk<any, any>(
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

export const signInUser = createAsyncThunk<any, any>(
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
    console.log("i am running");
    try {
      const Token = localStorage.getItem("accessToken");

      const refreshToken = { refreshToken: Token };
      const res = await fetch(
        "https://e-commerce-backend-zprm.onrender.com/user/refreshToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(refreshToken),
        }
      );
      const data = await res.json();
      console.log(data, "This is data1111");
      if (!res.ok) {
        return rejectWithValue(data.error);
      }
      dispatch(updateAccessToken(data.accessToken));
      console.log(data, "This is data");
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
      state.user = null;
      state.message = null;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
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
    builder.addCase(signUpUser.rejected, (state) => {
      state.loading = false;
    });

    // SignIn User

    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.payLoad;
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
      state.user = action.payload.payLoad;
    });
    builder.addCase(signInUser.rejected, (state) => {
      state.loading = false;
    });

    //Token Update
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.payLoad;
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
      state.user = action.payload.payLoad;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { addToken, addUser, logOut, updateAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
