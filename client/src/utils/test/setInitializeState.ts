import { RecoilState, MutableSnapshot } from 'recoil';

export const setInitializeState =
  <T>(state: RecoilState<T>, initializeState: T) =>
  ({ set }: MutableSnapshot) => {
    set(state, initializeState);
  };
