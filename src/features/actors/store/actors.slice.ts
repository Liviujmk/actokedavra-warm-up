/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Actor } from '../types/actors.interface';

interface ActorState {
  activeActor: Actor | null
  selectedActors: Actor[] | null;
  selectMode: boolean;
  sorting: string;
}

const initialState: ActorState = {
  activeActor: null,
  selectedActors: null,
  selectMode: false,
  sorting: 'ascending',
};

export const ActorSlice = createSlice({
  name: 'Actors',
  initialState,

  reducers: {
    setActiveActorAction: (state, action: PayloadAction<Actor | null>) => {
      state.activeActor = action.payload;
    },

    setSelectedActorsAction: (state, action: PayloadAction<Actor[] | null>) => {
      state.selectedActors = action.payload;
    },

    setSelectModeAction: (state, action: PayloadAction<boolean>) => {
      state.selectMode = action.payload;
    },

    setActorsSortingAction: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
  },
});

export const {
  setActiveActorAction,
  setSelectedActorsAction,
  setSelectModeAction,
  setActorsSortingAction,
} = ActorSlice.actions;
export const actorReducer = ActorSlice.reducer;
