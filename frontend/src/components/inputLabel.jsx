import React from 'react';
import styles from './inputLabel.module.css';

const InputLabel = ({ label, name, ...rest }) => {
  return (
    <div className={styles.label_box}>
      {label ? <label className={styles.label_name}>{label}</label> : ''}
      <br />
      {name === 'feeling' ? (
        <textarea className={styles.text_box} {...rest} />
      ) : (
        <input className={styles.input_box} {...rest} />
      )}
    </div>
  );
};

export default InputLabel;
