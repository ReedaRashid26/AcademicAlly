import { memo, SVGProps } from 'react';

const SvgnodeIcon2 = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 86 86' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M41.6562 41.6562V28.2188H44.3438V41.6562H57.7812V44.3438H44.3438V57.7812H41.6562V44.3438H28.2188V41.6562H41.6562Z'
      fill='black'
    />
  </svg>
);
const Memo = memo(SvgnodeIcon2);
export { Memo as SvgnodeIcon2 };
