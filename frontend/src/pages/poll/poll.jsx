import React from 'react';
import Button from '../../components/button';
import styles from './poll.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { authStore } from '../../shared/store';
import Error from '../error/error';

const Poll = () => {
  const navigate = useNavigate();
  const userAccess = authStore((state) => state.userAccess);
  if(userAccess === false) {
    return <Error accessNot={true} />
  }

  const handleGoTemplates = () => {
    navigate('/canvas/');
  };

  const handleGoMain = () => {
    navigate('/colrapy');
  };

  return (
    <>
      <Header />
      <div className={styles.content}>
        <div className={styles.button_box}>
          <Button
            content={'다른 템플릿으로 컬러링하기'}
            _onClick={handleGoTemplates}
          />
          <Button content={'메인페이지로 가기'} _onClick={handleGoMain} />
        </div>
      </div>
    </>
  );
};

export default Poll;
