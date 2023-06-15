/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Actor, ActorSorting } from '../types/actors.interface';

// ActorState interface
interface ActorState {
  activeActor: Actor | null;
  selectedActors: number[] | null;
  selectMode: boolean;
  deleteAll: boolean;
  sorting: ActorSorting;
}

// initialState object
const initialState: ActorState = {
  activeActor: null,
  selectedActors: null,
  selectMode: false,
  deleteAll: false,
  sorting: 'Ascending',
};

// ActorSlice slice of state and actions for actors
export const ActorSlice = createSlice({
  name: 'Actors',
  initialState,

  reducers: {
    // clearStateAction - clear state to initial state
    clearStateAction: () => initialState,

    // setActiveActorAction - set active actor
    setActiveActorAction: (state, action: PayloadAction<Actor | null>) => {
      state.activeActor = action.payload;
    },

    // setSelectedActorAction - set selected actor
    setSelectedActorAction: (state, action: PayloadAction<number>) => {
      if (state.selectedActors) {
        if (!state.selectedActors.includes(action.payload)) {
          state.selectedActors.push(action.payload);
        }
      } else {
        state.selectedActors = [action.payload];
      }
    },

    // setSelectedActorsAction - set selected actors
    setSelectedActorsAction: (state, action: PayloadAction<number[] | null>) => {
      state.selectedActors = action.payload;
    },

    // removeSelectedActorsAction - remove selected actors
    removeSelectedActorsAction: (state) => {
      state.selectedActors = null;
    },

    // removeSelectedActorAction - remove selected actor
    removeSelectedActorAction: (state, action: PayloadAction<number>) => {
      if (state.selectedActors) {
        state.selectedActors = state.selectedActors.filter((id) => id !== action.payload);
      }
    },

    // setSelectModeAction - set select mode
    setSelectModeAction: (state, action: PayloadAction<boolean>) => {
      state.selectMode = action.payload;
    },

    // setDeleteAllAction - set delete all
    setDeleteAllAction: (state, action: PayloadAction<boolean>) => {
      state.deleteAll = action.payload;
    },

    // setActorsSortingAction - set actors sorting
    setActorsSortingAction: (state, action: PayloadAction<ActorSorting>) => {
      state.sorting = action.payload;
    },
  },
});

export const {
  clearStateAction,
  setActiveActorAction,
  setSelectedActorAction,
  setSelectedActorsAction,
  removeSelectedActorsAction,
  removeSelectedActorAction,
  setSelectModeAction,
  setDeleteAllAction,
  setActorsSortingAction,
} = ActorSlice.actions;
export const actorReducer = ActorSlice.reducer;
