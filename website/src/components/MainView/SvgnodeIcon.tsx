import { memo, SVGProps } from 'react';

const SvgnodeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 105 86' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M29.5312 24.1875H75.4688V32.25H29.5312V24.1875ZM29.5312 38.9688H75.4688V47.0312H29.5312V38.9688ZM75.4688 53.75H29.5312V61.8125H75.4688V53.75Z'
      fill='black'
    />
  </svg>
);
const Memo = memo(SvgnodeIcon);
export { Memo as SvgnodeIcon };
