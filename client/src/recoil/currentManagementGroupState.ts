import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { ManagementGroup } from 'src/openapi-generator';
import { RecoilAtomKeys } from 'src/recoil/keys';
import { recoilPersist } from 'recoil-persist';

export type CurrentManagementGroupState =
  | {
      state: 'existence';
      data: ManagementGroup;
    }
  | {
      state: 'not_existence';
    };

export const currentManagementGroupState = atom<CurrentManagementGroupState>({
  key: RecoilAtomKeys.CURRENT_MANAGEMENT_GROUP_STATE,
  default: { state: 'not_existence' },
  effects_UNSTABLE: [recoilPersist().persistAtom],
});

export const useGetCurrentManagementGroup = () => {
  const currentManagementGroup = useRecoilValue(currentManagementGroupState);

  return currentManagementGroup;
};

export const useSetCurrentManagementGroup = () => {
  const setCurrentManagementGroup = useSetRecoilState(
    currentManagementGroupState
  );

  return setCurrentManagementGroup;
};
