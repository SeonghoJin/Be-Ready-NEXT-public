import { atom, useRecoilState } from 'recoil';
import { Company, CompanyDto } from '@./common';
import { localStorageEffect } from './localStroageEffect';

const selectedCompanyList = atom<CompanyDto[]>({
  key: 'SelectedCompanyList',
  default: [],
  effects: [
    localStorageEffect<CompanyDto[]>({
      key: 'selectedCompanyList',
      defaultValue: () => [],
      validate: (value) => {
        if (!Array.isArray(value)) {
          return false;
        }
        return true;
      },
    }),
  ],
});

export const useSelectedCompanyList = () => {
  const [_selectedCompanyList, setSelectedCompanyList] =
    useRecoilState(selectedCompanyList);

  const add = (company: CompanyDto) => {
    setSelectedCompanyList((_) => _.concat(company));
  };

  const remove = (company: Pick<CompanyDto, 'name'>) => {
    setSelectedCompanyList((_) =>
      _.filter((selectedCompany) => selectedCompany.name !== company.name)
    );
  };

  const has = (company: Pick<CompanyDto, 'name'>) => {
    return _selectedCompanyList.some(
      (selectedCompany) => selectedCompany.name === company.name
    );
  };

  return { add, remove, has, item: _selectedCompanyList };
};
