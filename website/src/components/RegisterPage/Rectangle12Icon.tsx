import { memo, SVGProps } from 'react';

const Rectangle12Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 849 51' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0 0H849V51H0V0Z' fill='#D0CCB9' stroke='black' strokeWidth={5} />
  </svg>
);
const Memo = memo(Rectangle12Icon);
export { Memo as Rectangle12Icon };
