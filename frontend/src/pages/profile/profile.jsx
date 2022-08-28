import React, { useEffect } from 'react';
import { useState } from 'react';
import InputLabel from '../../components/inputLabel';
import Button from '../../components/button';
import styles from './profile.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { authApi } from '../../shared/axios';
import { authStore, userStore } from '../../shared/store';
import Error from '../error/error';
import AlertBar from '../../components/alertBar';

const Profile = (props) => {
  const navigate = useNavigate();
  const userAccess = authStore((state) => state.userAccess);
  const changeAccess = authStore((state) => state.changeAccess);

  const { username, setsUsername } = userStore((state) => state);
  const { userage, setsAge } = userStore((state) => state);
  const useremail = userStore((state) => state.useremail);

  const [showProfile, setshowProfile] = useState(false);
  // 초기값은 서버로부터 전달받은 사용자 정보여야 함
  const [password, setPassword] = useState('');

  const [alertBar, setAlertBar] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertColor, setAlertColor] = useState('red');

  if(userAccess === false) {
    return <Error accessNot={true} />
  }


  // 입력 값 검사 & state 변경시 발생하는 함수
  const checkNum = /^[0-9]+$/;
  const handleChangeAge = (e) => {
    setsAge(e.target.value);
    if (!checkNum.test(e.target.value)) {
      setAlertText('숫자로 입력해주세요.');
      setAlertColor('red');
      setAlertBar(true);
      setsAge('');
    }
  };
  const handleChangeUsername = (e) => {
    setsUsername(e.target.value);
  };
  const handleChangePw = (e) => {
    setPassword(e.target.value);
  };

  // input값 체크
  const checkInput = (password) => {
    if (password === '') {
      setAlertText('비밀번호를 입력해주세요.');
      setAlertColor('red');
      setAlertBar(true);
      return false;
    }
    return true;
  };

  // 프로필 수정 시
  const updateUserInfo = async (useremail) => {
    if (!checkInput(password)) return;
    await authApi
      .put(`/profile/${useremail}`, {
        age: userage,
        username: username,
        password: password,
      })
      .then((response) => {
        setAlertText('수정이 완료되었습니다.');
        setAlertColor('green');
        setAlertBar(true);
      })
      .catch((error) => {
        setAlertText('오류가 발생했어요. 새로고침 해주세요.');
        setAlertColor('red');
        setAlertBar(true);
      });
  };

  // 임시 코드2
  // const updateUserInfo = async () => {
  //   if (!checkInput(password)) return;
  //   setAlertText('수정이 완료되었습니다.');
  //   setAlertColor('green');
  //   setAlertBar(true);
  //   setPassword(password);
  // };

  const handleLogout = () => {
    if (userAccess === true) {
      changeAccess();
      localStorage.removeItem('token');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <>
      { alertBar && <AlertBar alert_text={alertText} alert_color={alertColor} /> }
      <Header whiteback={true} />
      <div className={styles.content}>
        <div className={styles.click_list}>
          <div className={styles.list_content} onClick={handleLogout}>
            로그아웃
          </div>
          <div
            className={styles.list_content}
            onClick={() => setshowProfile(!showProfile)}
          >
            프로필 수정하기
          </div>
          {showProfile ? (
            <div className={styles.controlbar_accordion}>
              <form>
                <InputLabel
                  label="이메일"
                  name="email"
                  placeholder={useremail}
                  disabled
                />
                <InputLabel
                  label="나이"
                  name="age"
                  value={userage}
                  onChange={handleChangeAge}
                />
                <InputLabel
                  label="사용자이름"
                  name="username"
                  value={username}
                  onChange={handleChangeUsername}
                />
                <InputLabel
                  label="비밀번호"
                  name="password"
                  placeholder="비밀번호를 입력하세요."
                  type="password"
                  onChange={handleChangePw}
                />
              </form>
              <Button
                content={'수정 완료'}
                whiteback={true}
                _onClick={updateUserInfo}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
