import Image from 'next/image';
import { MetaData } from '../SeoHeader/metata';

export function Logo() {
  return (
    <Image
      src={'/logo/256x256.png'}
      alt={MetaData.title}
      width={36}
      height={36}
    />
  );
}
