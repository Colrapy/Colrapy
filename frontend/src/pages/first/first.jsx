import { React } from 'react';
import styles from './first.module.css';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Bottom from '../../components/bottom';

const First = () => {
  const navigate = useNavigate();

  const handleGoLogin = () => {
    navigate('/users/login');
  };

  let contents = `오늘, 당신의 기분은 어떠신가요?
    
    컬라피는 감정 일기를 통해
    AI가 사용자의 심리상태를 분석하고
    컬러테라피 서비스를 제공합니다.

    오늘 하루를 살아가는 당신,
    컬라피로 힐링하고 가세요.
    `;

  return (
    <>
      <Header />
      <div className={styles.content}>
        <span className={styles.display_content}>{contents}</span>
        <Button content={'회원가입 / 로그인 하기'} _onClick={handleGoLogin} />
      </div>
      <Bottom />
    </>
  );
};

export default First;
