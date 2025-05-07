// hooks/useAppDispatch.ts
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, ReduxStateType } from "../redux/store"; // Type of dispatch from your store

export const useAppDispatch = () => useDispatch<AppDispatchType>();

export const useAppSelector = <TSelected>(
  selector: (state: ReduxStateType) => TSelected
): TSelected => useSelector(selector);
