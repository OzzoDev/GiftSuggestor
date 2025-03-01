import { Middleware } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchFavGiftsIds } from "./favGiftsSlice";
import { RootState } from "./store";

interface Action {
  type: "FETCH_FAVGIFTIDS";
}

type AppAction = Action;

function isActionWithType(action: unknown): action is AppAction {
  return typeof action === "object" && action !== null && "type" in action;
}

const fetchFavGiftIdsMiddleware: Middleware<
  {},
  RootState,
  ThunkDispatch<RootState, void, AppAction>
> = (store) => (next) => (action) => {
  if (isActionWithType(action) && action.type === "FETCH_FAVGIFTIDS") {
    store.dispatch(fetchFavGiftsIds());
  }

  return next(action);
};

export default fetchFavGiftIdsMiddleware;
