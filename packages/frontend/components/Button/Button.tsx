import { MouseEventHandler, PropsWithChildren, useId } from 'react';

export type ButtonProps = PropsWithChildren<{
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
}>;

export function Button(props: ButtonProps) {
  const { disabled, onClick, className, children, ...rest } = props;

  const buttonId = useId();

  return (
    <button id={buttonId} {...rest} disabled={disabled} onClick={onClick}>
      <span className={'button__content'}>{children}</span>
    </button>
  );
}
