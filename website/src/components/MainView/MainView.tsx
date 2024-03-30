import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './MainView.module.css';
import { Rectangle16Icon } from './Rectangle16Icon';
import { SvgnodeIcon } from './SvgnodeIcon';
import { SvgnodeIcon2 } from './SvgnodeIcon2';

interface Props {
  className?: string;
}
/* @figmaId 3:136 */
export const MainView: FC<Props> = memo(function MainView(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.rectangle16}>
        <Rectangle16Icon className={classes.icon} />
      </div>
      <div className={classes.dashboard}>Dashboard</div>
      <div className={classes.svgNode}>
        <SvgnodeIcon className={classes.icon2} />
      </div>
      <div className={classes.svgNode2}>
        <SvgnodeIcon2 className={classes.icon3} />
      </div>
    </div>
  );
});
