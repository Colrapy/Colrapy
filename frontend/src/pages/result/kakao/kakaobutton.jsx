import React from 'react';
import styles from './kakaobutton.module.css';

const KakaoButton = (props) => {
      const createKakaoButton = () => {
        // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
        if (window.Kakao) {
          const kakao = window.Kakao
    
          // 중복 initialization 방지
          if (!kakao.isInitialized()) {
            // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
            kakao.init(process.env.REACT_APP_KAKAO_KEY)
          }
    
          kakao.Share.sendScrap({
            requestUrl: 'http://127.0.0.1:3000'
          });
        }
      }
    
      return (
        <button className={styles.kakao_box} id='kakao-link-btn' onClick={createKakaoButton}>
          <img src='/images/kakao.png' className={styles.kakao_img}/>
          <span className={styles.kakao_ment}>
            나만의 팔레트 공유하기
          </span>
        </button>
      )
}

export default KakaoButton;