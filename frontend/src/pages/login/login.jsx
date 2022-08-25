import React, { useEffect } from 'react';
import styles from './login.module.css';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';
import InputLabel from '../../components/inputLabel';
import { useState } from 'react';
import HeaderBack from '../../components/headerBack';
import { api } from '../../shared/axios';
import response from '../../data/login.json';
import { authStore, userStore } from '../../shared/store';

const Login = (props) => {
  const navigate = useNavigate();
  const { userAccess, changeAccess } = authStore((state) => state);
  const { setsToken } = userStore((state) => state.setsToken);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 유효성 체크1: 이메일 형식 체크
  const userIdCheck = (userId) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(userId);
  };

  // 유효성 체크2: 빈 값 체크
  const checkInputValue = (userId, password) => {
    if (userId === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요. 🤒');
      return false;
    }
    if (!userIdCheck(userId)) {
      alert('이메일 형식이 맞지 않습니다. 😱');
      return false;
    }
    return true;
  };

  // login 버튼 클릭 시 api호출
  // const login = async (e) => {
  //   e.preventDefault();

  //   // email, password 칸 검사
  //   if (!checkInputValue(userId, password)) return;

  //   try {
  //     await api
  //       .post('/users/login/', {
  //         email: userId,
  //         password: password,
  //       })
  //       .then((response) => {
  //         setsToken(response.data.token);
  //         // localStorage.setItem('token', response.data.token);
  //         alert('로그인에 성공했습니다. 🥰');
  //         if (userAccess === false) {
  //           changeAccess();
  //           setTimeout(() => {
  //             navigate('/colrapy');
  //           }, 1000);
  //         }
  //       });
  //   } catch (error) {
  //     alert('아이디와 비밀번호를 확인해주세요. 😥');
  //   }
  // };

  // 테스트용 코드
  const login = (e) => {
    e.preventDefault();
    // email, password 칸 검사
    if (!checkInputValue(userId, password)) return;
    setUserId(userId);
    // localStorage.setItem('token', response.data.token);
    alert('로그인에 성공했습니다. 🥰');
    if (userAccess === false) {
      changeAccess();
      navigate('/colrapy');
    }
  };

  // 카카오 로그인 버튼 클릭 시 api호출 - 서버 연결 시 주석 풀기
  const kakaoLogin = async (e) => {
    e.preventDefault();

    await api
      .get('/users/login/kakao/')
      .then((response) => {
        navigate('/users/login/kakao/');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 네이버 로그인 버튼 클릭 시 api호출 - 서버 연결 시 주석 풀기
  const naverLogin = async (e) => {
    e.preventDefault();

    await api
      .get('/users/login/naver/')
      .then((response) => {
        navigate('/users/login/naver/');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const page_title = `컬라피 진단받고
    힐링하러 가볼까요?`;
  return (
    <>
      <HeaderBack />
      <div className={styles.content}>
        <h2 className={styles.page_title}>{page_title}</h2>
        <div className={styles.login_box}>
          <form className={styles.login_form}>
            <InputLabel
              label="아이디"
              name="email"
              placeholder="이메일을 입력해 주세요."
              type="email"
              required
              onChange={(e) => setUserId(e.target.value)}
            />
            <InputLabel
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력해 주세요."
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button content={'로그인'} whiteback={true} _onClick={login} />
          </form>
        </div>
        <div className={styles.join_box}>
          <p className={styles.join_text}>아직 회원가입 전인가요?</p>
          <Button
            content={'카카오로 가입하기'}
            domain_name={'kakao'}
            _onClick={kakaoLogin}
          />
          <Button
            content={'네이버로 가입하기'}
            domain_name={'naver'}
            _onClick={naverLogin}
          />
        </div>
        {/* <div className={styles.find_box}>
                <Link to='/user/findpw'>비밀번호 찾기</Link>
            </div> */}
      </div>
    </>
  );
};

export default Login;
