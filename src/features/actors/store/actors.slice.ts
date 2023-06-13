/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Actor } from '../types/actors.interface';

interface ActorState {
  setActiveActor: Actor | null
  selectedActors: Actor[] | null;
  sorting: string;
}

const initialState: ActorState = {
  setActiveActor: null,
  selectedActors: null,
  sorting: 'ascending',
};

export const ActorSlice = createSlice({
  name: 'Actors',
  initialState,

  reducers: {
    setActiveActorAction: (state, action: PayloadAction<Actor | null>) => {
      state.setActiveActor = action.payload;
    },

    setSelectedActorsAction: (state, action: PayloadAction<Actor[] | null>) => {
      state.selectedActors = action.payload;
    },

    setActorsSortingAction: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
  },
});

export const {
  setActiveActorAction,
  setSelectedActorsAction,
  setActorsSortingAction,
} = ActorSlice.actions;
export const actorReducer = ActorSlice.reducer;
