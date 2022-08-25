import React from 'react';
import styles from './button.module.css';

const Button = (props) => {
  const { domain_name, content, whiteback, _onClick } = props;

  function find_color(domain_name) {
    if (domain_name) {
      if (domain_name === 'kakao') {
        return <button className={styles.kakao}> {content} </button>;
      } else if (domain_name === 'naver') {
        return <button className={styles.naver}> {content} </button>;
      }
    } else {
      if (whiteback) {
        return <button className={styles.whiteback}> {content} </button>;
      } else {
        return <button> {content} </button>;
      }
    }
  }

  return (
    <div className={styles.button_box} onClick={_onClick}>
      {find_color(domain_name)}
    </div>
  );
};

export default Button;
