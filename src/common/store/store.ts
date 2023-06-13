import { configureStore } from '@reduxjs/toolkit';
import { actorReducer } from '../../features/actors/store/actors.slice';
import { actorApi } from '../../features/actors/api/actors.api';

export const store = configureStore({
    // @ts-ignore
    reducer: {
        actor: actorReducer,
        [actorApi.reducerPath]: actorApi.reducer,
    },
    // @ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
