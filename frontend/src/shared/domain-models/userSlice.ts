import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getText} from '../api/http'

type LoadingState = "not-started" | "loading" | "finished"

export interface UserState {
    state: LoadingState,
    email: string | null,
}

export const fetchCurrentUser = createAsyncThunk<string | null, void, { state: { user: UserState } }>(
    'user/fetchCurrentUser',
    async () => {
        try {
            const userNameResponse = await getText('/api/User/me')
            return userNameResponse.length > 0 ? userNameResponse : null
        } catch {
            return null
        }
    },
    {
        condition: (_, {getState}) => getState().user.state === 'not-started',
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        state: "not-started" as LoadingState,
        email: null as string | null,
    } as UserState,
    reducers: {
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
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.state = 'finished'
                state.email = action.payload
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.state = 'finished'
                state.email = null
            })
    },
})

// Action creators are generated for each case reducer function
export const { setUser, unsetUser } = userSlice.actions

export const userSelector = userSlice.selectSlice

export default userSlice.reducer