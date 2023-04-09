import { c } from '../../util';
import { ToastOption, useUnsafeWaitingToasts } from './util';

type Props = {
  toastOption: ToastOption;
};

function Toast({ toastOption }: Props) {
  const { removeAllToast } = useUnsafeWaitingToasts();
  return (
    <button
      onClick={() => {
        console.log('clicked');
        removeAllToast();
      }}
      className={c(`fixed top-[75vh]
         left-[50%] 
        z-50
        m-[auto_0]
        flex
        max-w-[300px]
        -translate-x-1/2
        transform
        items-center
        justify-center 
        overflow-hidden
        rounded-[14px]
        [backdrop-filter:blur(20px);]
        `)}
      style={{
        width: toastOption.width ?? 'initial',
      }}
    >
      <div className={'absolute h-full w-full bg-black  opacity-40'}></div>
      <div
        className={c(
          'z-[1] overflow-hidden text-ellipsis whitespace-nowrap p-[10px_16px] text-center',
          'font-light text-white'
        )}
      >
        {toastOption.text}
      </div>
    </button>
  );
}

export default Toast;
