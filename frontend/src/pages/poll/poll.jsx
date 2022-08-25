import React from 'react';
import Button from '../../components/button';
import styles from './poll.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';

const Poll = () => {
  const navigate = useNavigate();

  const handleGoTemplates = () => {
    navigate('/canvas/templates');
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
            content={'다른 템플릿으로도 컬러링하기'}
            _onClick={handleGoTemplates}
          />
          <Button content={'메인페이지로 가기'} _onClick={handleGoMain} />
        </div>
      </div>
    </>
  );
};

export default Poll;
