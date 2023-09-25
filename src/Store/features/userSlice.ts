import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
}
interface UserState{
    users : User[],
};
const initialState: UserState = {
    users : [],
};

export const UserSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
          addUser: (state,action:PayloadAction<User>) => {
              state.users.push({
                id:state.users.length,
                name:action.payload.name,
                email:action.payload.email,
                password:action.payload.password
              });
          }
    }
})

export default UserSlice.reducer;
export const {addUser} = UserSlice.actions;