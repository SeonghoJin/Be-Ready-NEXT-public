import styled from '@emotion/styled';

export const InterativeHeaderSpan = styled.span`
  border-radius: 8px;
  padding: 12px 10px;

  &:hover {
    background-color: rgba(2, 32, 71, 0.05);
    opacity: 1;
  }

  &.active {
    opacity: 1;
  }
`;
