import React from 'react';
import styles from './bottom.module.css';

const Bottom = (props) => {
  return (
    <div className={styles.bottom}>
      <p className={styles.copyrights}>
        Copyright 2022. Colrapy All rights reserved.
      </p>
    </div>
  );
};

export default Bottom;
