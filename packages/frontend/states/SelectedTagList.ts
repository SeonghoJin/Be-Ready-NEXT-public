import { atom, useRecoilState } from 'recoil';
import { Tag } from '@./common';
import { localStorageEffect } from './localStroageEffect';

const selectedTagList = atom<Tag[]>({
  key: 'SelectedTagList',
  default: [],
  effects: [
    localStorageEffect({
      key: 'SelectedTagList',
      defaultValue: () => [],
      validate: (newValue) => {
        return Array.isArray(newValue);
      },
    }),
  ],
});

export const useSelectedTagList = () => {
  const [_selectedTagList, setSelectedTagList] =
    useRecoilState(selectedTagList);

  const add = (tag: Tag) => {
    setSelectedTagList((_) => _.concat(tag));
  };

  const remove = (tag: Pick<Tag, 'name'>) => {
    setSelectedTagList((_) =>
      _.filter((selectedTag) => selectedTag.name !== tag.name)
    );
  };

  const has = (tag: Pick<Tag, 'name'>) => {
    return _selectedTagList.some(
      (selectedTag) => selectedTag.name === tag.name
    );
  };

  return { add, remove, has, item: _selectedTagList };
};
