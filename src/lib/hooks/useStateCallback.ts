import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Callback<T> = (value?: T) => void;
type DispatchWithCallback<T> = (value: T, callback?: Callback<T>) => void;

/**
 * This hook mimcs the setState behaviour of class components. An optional callback can be passed
 * as the second parameter of setState to be called when the state has been changed
 *
 * @param initialState
 */
export function useStateCallback<T>(
  initialState: T | (() => T)
): [T, DispatchWithCallback<SetStateAction<T>>] {
  const [state, _setState] = useState(initialState);

  const callbackRef = useRef<Callback<T>>();
  const isFirstCallbackCall = useRef(true);

  const setState = useCallback(
    (setStateAction: SetStateAction<T>, callback?: Callback<T>): void => {
      _setState(setStateAction);
      if (typeof callback === "function") callback(state);
      callbackRef.current = callback;
    },
    []
  );

  useEffect(() => {
    if (isFirstCallbackCall.current) {
      isFirstCallbackCall.current = false;
      return;
    }
    typeof callbackRef.current === "function" && callbackRef.current(state);
  }, [state]);

  return [state, setState];
}
