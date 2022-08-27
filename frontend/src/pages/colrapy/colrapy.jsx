import React from 'react';
import styles from './colrapy.module.css';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../../components/header';
import Bottom from '../../components/bottom';
import { authApi } from '../../shared/axios';
import { authStore, userStore } from '../../shared/store';
import Error from '../error/error';

const Colrapy = () => {
  const navigate = useNavigate();
  const userAccess = authStore((state) => state.userAccess);
  const { setsEmail } = userStore((state) => state);
  const { username, setsUsername } = userStore((state) => state);
  let [userGreeting, setUserGreeting] = useState('');

  // 서버로부터 사용자명 받아오기
  const getUsername = async () => {
    await authApi
      .get('/colrapy/')
      .then((response) => {
        setsUsername(response.data.username);
        setsEmail(response.data.email);
        setUserGreeting(`안녕하세요, ${username}님!
              오늘의 기분은 어떠신가요?

              감정 일기를 작성하고
              컬라피에서 제공하는 컬러테라피로
              오늘 하루를 마무리해보세요.`);
      })
      .catch((error) => {
        alert('데이터 로드에 실패했어요. 😥');
      });
  };

  // 임시 코드
  // const getUsername = () => {
  //   setsUsername('누구겡');
  //   setsEmail('testers@daum.net');
  //   setUserGreeting(`안녕하세요, ${username}님!
  //       오늘의 기분은 어떠신가요?

  //       감정 일기를 작성하고
  //       컬라피에서 제공하는 컬러테라피로
  //       오늘 하루를 마무리해보세요.`);
  // };

  useEffect(() => {
    getUsername();
  }, [username]); // 컴포넌트가 실행될 때 한번만 데이터 가져오기

  if(userAccess === false) {
    return <Error accessNot={true} />
  }

  // 일기 작성페이지로 이동
  const handleGoDiary = () => {
    navigate('/diary');
  };

  return (
    <>
      <Header />
      <div className={styles.content}>
        <span className={styles.intro_content}>{userGreeting}</span>
        <Button content={'일기 작성하기'} _onClick={handleGoDiary} />
      </div>
      <Bottom />
    </>
  );
};

export default Colrapy;
