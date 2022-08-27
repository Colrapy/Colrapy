import React from 'react';
import HeaderBack from '../../components/headerBack';
import styles from './error.module.css';

const Error = ({ accessNot }) => {
  if(accessNot) {
    return (
      <>
        <HeaderBack transparent={true} />
        <div className={styles.content}>
          <p className={styles.accessnot}>로그인 후 이용 가능합니다. 😥</p>
        </div>
      </>
    )
  }
  return (
    <>
      <HeaderBack transparent={true} />
      <div className={styles.content}>
        <p className={styles.errorment}>404 NOT FOUND</p>
      </div>
    </>
  )
};

Error.defaultProps = {
  accessNot: false
};
export default Error;
