import { createSlice } from '@reduxjs/toolkit'

type LoadingState = "not-started" | "loading" | "finished"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        state: "not-started" as LoadingState,
        email: null,
    },
    reducers: {
        load: (state) => {
            state.state = "loading"
        },
        setUser: (state, action) => {
            state.state = "finished"
            state.email = action.payload
        },
        unsetUser: (state) => {
            state.state = "finished"
            state.email = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { load, setUser, unsetUser } = userSlice.actions

export const userSelector = userSlice.selectSlice

export default userSlice.reducer