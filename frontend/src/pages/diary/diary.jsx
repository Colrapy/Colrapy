import React from 'react';
import styles from './diary.module.css';
import Button from '../../components/button';
import InputLabel from '../../components/inputLabel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBack from '../../components/headerBack';
import { authApi } from '../../shared/axios';
import { authStore } from '../../shared/store';
import Error from '../error/error';
import AlertBar from '../../components/alertBar';

const Diary = (props) => {
  const navigate = useNavigate();

  const [activity, setActivity] = useState('');
  const [feeling, setFeeling] = useState('');
  const userAccess = authStore((state) => state.userAccess);
  const [alertBar, setAlertBar] = useState(false);
  const [alertText, setAlertText] = useState('');

  if(userAccess === false) {
    return <Error accessNot={true} />
  }

  // activity 값 변경 시 발생하는 함수
  const handleChangeActivity = (e) => {
    setActivity(e.target.value);
  };

  // feeling 값 변경 시 발생하는 함수
  const handleChangeFeeling = (e) => {
    setFeeling(e.target.value);
  };

  // 유효성 및 길이 체크
  const checkInput = (activity, feeling) => {
    if (activity === '' || feeling === '') {
      setAlertText('모든 칸을 채워주세요.');
      setAlertBar(true);
      return false;
    }
    if (feeling.length < 30) {
      setAlertText('기분에 대해 좀 더 상세하게 작성해주세요.');
      setAlertBar(true);
      return false;
    }
    return true;
  };

  // button 클릭시 submit 하는 함수, 서버에게 데이터 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    // input 검사
    if(!checkInput(activity, feeling)) return;
    try {
      await authApi.post('/diary/', {
        activity: activity,
        feeling: feeling
      })
      .then((response) => {
        console.log('o');
      });
    } catch (error) {
      setAlertText('오류가 발생했어요. 다시 시도해주세요.');
      setAlertBar(true);      
    }
    navigate('/diary/loading');
  }

  // 테스트 코드 - 연결 시 삭제 필요
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // input 검사
  //   if (!checkInput(activity, feeling)) return;
  //   setTimeout(() => {
  //     navigate('/diary/result');
  //   }, 1000);
  // };

  return (
    <>
      { alertBar && <AlertBar alert_text={alertText} alert_color={'red'} />}
      <HeaderBack />
      <div className={styles.content}>
        <form>
          <div className={styles.act_choice_box}>
            <h2>오늘, 무엇을 하셨나요?</h2>
            <p className={styles.detail_text}>
              당신이 한 사소한 활동, 그 무엇을 작성해도 괜찮아요. 생각나는 만큼
              간단히 작성해주세요.
            </p>
            <InputLabel
              name={'activity'}
              placeholder={'데이트, 쇼핑 등 단어로 작성해주세요.'}
              onChange={handleChangeActivity}
            />
            <div className={styles.length_count}>{activity.length}/20</div>
          </div>
          <div className={styles.write_box}>
            <h2>기분은 어떠셨나요?</h2>
            <p className={styles.detail_text}>
              오늘 하루를 지내며 느낀 감정에 대해 자유롭게 작성해주세요. 길게
              작성할수록 컬라피가 당신의 심리상태를 상세하게 분석할 수 있어요!{' '}
            </p>
            <InputLabel
              name={'feeling'}
              placeholder={
                '오늘의 감정을 자유롭게 작성해주세요. 최소 30자이상은 작성하셔야해요.'
              }
              onChange={handleChangeFeeling}
            />
            <div className={styles.length_count}>{feeling.length}/100</div>
          </div>
          <Button
            content={'계속하기'}
            whiteback={true}
            _onClick={handleSubmit}
          />
        </form>
      </div>
    </>
  );
};

export default Diary;
