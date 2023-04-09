import { atom, useRecoilState } from 'recoil';
import { ContentHeaderItem } from '@./common';
import { localStorageEffect } from './localStroageEffect';

export const newHeaderItem: ContentHeaderItem = {
  name: '최신',
  img: '',
};

export const popularHeaderItem: ContentHeaderItem = {
  name: '인기',
  img: '',
};

export const headerItemList: ContentHeaderItem[] = [
  newHeaderItem,
  popularHeaderItem,
];

const selectedHeaderItem = atom<ContentHeaderItem['name']>({
  key: 'SelectedHeaderItem',
  default: '최신',
  effects: [
    localStorageEffect({
      key: 'SelectedHeaderItem',
      defaultValue: () => '최신',
      validate: (newValue) => {
        return newValue === '최신' || newValue === '인기';
      },
    }),
  ],
});

export const useSelectedHeaderItem = () => {
  const [_selectedHeaderItem, setSelectedHeaderItem] =
    useRecoilState(selectedHeaderItem);
  return {
    item: _selectedHeaderItem,
    set: setSelectedHeaderItem,
  };
};
