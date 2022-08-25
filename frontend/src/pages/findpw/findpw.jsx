import React from 'react';
import { useState } from 'react';
import InputLabel from '../../components/auth/inputLabel';
import Button from '../../components/button';
import styles from './findpw.module.css';

const Findpw = ({ email }) => {
  return (
    <div className={styles.find_password_box}>
      <h2 className={styles.page_title}> 비밀번호 찾기 </h2>
      <div className={styles.email_box}>
        <label htmlFor="user_email">
          가입한 이메일로 인증메일을 보낸 후, <br /> 메일함에서 인증해주세요.
        </label>{' '}
        <p />
        <InputLabel name="send_email" />
        <Button content={'인증메일 보내기'} />
      </div>
    </div>
  );
};

export default Findpw;
