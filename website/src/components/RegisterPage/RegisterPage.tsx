import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { Rectangle12Icon } from './Rectangle12Icon';
import classes from './RegisterPage.module.css';

interface Props {
  className?: string;
}
/* @figmaId 3:94 */
export const RegisterPage: FC<Props> = memo(function RegisterPage(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.rectangle4}></div>
      <div className={classes.registerAccount}>Register Account</div>
      <div className={classes.rectangle42}></div>
      <div className={classes.rectangle10}></div>
      <div className={classes.rectangle11}></div>
      <div className={classes.rectangle12}>
        <Rectangle12Icon className={classes.icon} />
      </div>
      <div className={classes.rectangle13}></div>
      <div className={classes.rectangle14}></div>
      <div className={classes.rectangle15}></div>
      <div className={classes.confirmPassword}>confirm password</div>
      <div className={classes.securityQuestions}>Security Questions</div>
      <div className={classes.password}>password</div>
      <div className={classes.confirm}>Confirm</div>
      <div className={classes.emailUsername}>email/username</div>
    </div>
  );
});
