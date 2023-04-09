import { useCompanyAll } from '../../api';
import Image from 'next/image';
import { css } from '@emotion/react';
import { useSelectedCompanyList } from '../../states/SelectedCompanyList';
import c from 'classnames';

type Props = {};

export const CompanyNavigation = (props: Props) => {
  const { data: companyAll } = useCompanyAll();
  const {
    add: addCompany,
    has: hasCompany,
    remove: removeCompany,
  } = useSelectedCompanyList();
  return (
    <div
      css={css`
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: center;
        background-color: var(--grey50);
        padding: 20px 0;
        border-bottom: 1px solid var(--grey200);
        top: 60px;
      `}
    >
      {companyAll?.map((company) => {
        const isActive = hasCompany(company);
        return (
          <div
            key={company.name}
            className={c({
              active: isActive,
            })}
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              transition: color 0.1s ease-in 0s;
              min-width: fit-content;
              gap: 5px;
              opacity: 0.5;

              &:hover {
                opacity: 0.7;
              }

              &.active {
                opacity: 1;
              }

              &:hover > span {
                font-weight: bold;
              }

              &:hover div {
                opacity: 0.7;
              }

              &.active div {
                opacity: 1;
              }
            `}
            onClick={() => {
              if (isActive) {
                return removeCompany(company);
              }
              addCompany(company);
            }}
          >
            <Image
              src={company.imageUrl}
              alt={company.name}
              width={35}
              height={35}
            />
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 7px;
                align-items: center;
              `}
            >
              <span
                className={c({
                  active: isActive,
                })}
                css={css`
                  &.active {
                    font-weight: bold;
                  }
                `}
              >
                {company.name}
              </span>
              <div
                css={css`
                  width: calc(100% - 10px);
                  height: 2px;
                  border-radius: 4px;
                  background-color: black;
                  opacity: 0;
                `}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
