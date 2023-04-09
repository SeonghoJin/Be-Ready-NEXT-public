import { useSelectedCompanyList } from '../../states/SelectedCompanyList';
import { useCompanyAll } from '../../api';
import { css } from '@emotion/react';
import { CompanyDto } from '@./common';
import Image from 'next/image';
import c from 'classnames';
import { TinkleOpacity } from '../Css';

export const SideCompanyNavigation = () => {
  const { has, remove, add } = useSelectedCompanyList();
  const { data: companyAll } = useCompanyAll();
  return (
    <div>
      <div
        css={css`
          margin-bottom: 30px;
        `}
      >
        <span
          css={css`
            font-size: 30px;
          `}
          className={'font-bold'}
        >
          Company
        </span>
        <div className="text-[12px] font-extralight ">
          기술블로그의 갯수에 따라 크기가 달라져요.
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          max-height: 300px;
          flex-wrap: wrap;
          gap: 10px;
        `}
      >
        {companyAll?.map((company, index) => {
          const isActive = has(company);
          const { count, averageCount } = company;
          return (
            <SideCompanyItem
              large={Math.max(Math.min(2, count / averageCount), 0.75)}
              name={company.name}
              key={index}
              imageUrl={company.imageUrl}
              active={isActive}
              onClick={() => {
                if (isActive) {
                  return remove(company);
                }
                add(company);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

type SideCompanyItemProps = Pick<CompanyDto, 'name' | 'imageUrl'> & {
  onClick: () => void;
  active: boolean;
  large: number;
};
export const SideCompanyItem = (props: SideCompanyItemProps) => {
  return (
    <button
      css={css`
        min-width: fit-content;
        display: flex;
        flex-direction: row;
        gap: 3px;
        font-weight: lighter;
        font-size: calc(20 * ${props.large}px);
        cursor: pointer;
        align-items: center;

        ${TinkleOpacity}
        &.active {
          font-weight: bolder;
        }
      `}
      className={c({ active: props.active })}
      onClick={() => props.onClick()}
    >
      <Image
        src={props.imageUrl}
        alt={props.name}
        width={20 * props.large}
        height={20 * props.large}
      />
      <span css={css``}>{props.name}</span>
    </button>
  );
};
