import { createSlice } from '@reduxjs/toolkit'

type LoadingState = "not-started" | "loading" | "finished"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        state: "not-started" as LoadingState,
        email: null as string | null,
    },
    reducers: {
        load: (state) => {
            state.state = "loading"
            return state
        },
        setUser: (state, action: {payload: string}) => {
            state.state = "finished"
            state.email = action.payload
            return state
        },
        unsetUser: (state) => {
            state.state = "finished"
            state.email = null
            return state
        }
    },
})

// Action creators are generated for each case reducer function
export const { load, setUser, unsetUser } = userSlice.actions

export const userSelector = userSlice.selectSlice

export default userSlice.reducer