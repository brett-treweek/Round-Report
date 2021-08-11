import { useReducer } from "react";
import {
  UPDATE_HAZARDS
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_HAZARDS:
      return {
        ...state,
        hazards: [...action.hazards],
      };

    default:
      return state;
  }
};

export function useHazardReducer(initialState) {
  return useReducer(reducer, initialState)
}