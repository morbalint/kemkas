import {configureStore} from "@reduxjs/toolkit"
import userReducer from './shared/domain-models/userSlice'
import character2eReducer from './second-edition/domain-models/characterSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        character2E: character2eReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
