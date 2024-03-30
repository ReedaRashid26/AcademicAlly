import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './LoginPage.module.css';

interface Props {
  className?: string;
}
/* @figmaId 1:3 */
export const LoginPage: FC<Props> = memo(function LoginPage(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.rectangle1}></div>
      <div className={classes.rectangle2}></div>
      <div className={classes.password}>Password</div>
      <div className={classes.rectangle3}></div>
      <div className={classes.logIn}>Log In</div>
      <div className={classes.register}>Register</div>
      <div className={classes.forgotPassword}>Forgot Password?</div>
      <div className={classes.academicAlly}>Academic Ally</div>
      <div className={classes.email}>Email</div>
    </div>
  );
});
