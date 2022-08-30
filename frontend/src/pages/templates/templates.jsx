import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './templates.module.css';
import HeaderBack from '../../components/headerBack';
import { authStore, colorStore } from '../../shared/store';
import Error from '../error/error';

const ChooseTemplates = () => {
  const navigate = useNavigate();
  const baseImgs = colorStore((state) => state.baseImgs);
  const userAccess = authStore((state) => state.userAccess);

  // if(userAccess === false) {
  //   return <Error accessNot={true} />
  // }

  // 특정 템플릿 클릭 시 라우팅과 함께 클릭한 템플릿 주소 state로 넘기기
  const handleRouting = (e) => {
    let src = e.target.alt;
    navigate('/canvas/painting', {
      state: {
        imgSrc: src,
      },
    });
  };

  // 템플릿 없이 글 선택 시 빈 값 state로 넘기기
  const handleNone = (e) => {
    navigate('/canvas/painting', {
      state: {
        imgSrc: 'none',
      },
    });
  };

  // UI 생성
  const templateList = baseImgs.map((img, index) => {
    return (
      <li key={img + index} className={styles.templates_item}>
        <img
          className={styles.templates_image}
          src={img}
          alt={index}
          onClick={handleRouting}
        />
      </li>
    );
  });

  return (
    <>
      <HeaderBack />
      <div className={styles.content}>
        <h2 className={styles.page_title}>템플릿 선택</h2>
        <p className={styles.page_info}>
          컬러링을 원하는 템플릿을 선택해 색칠하세요.
        </p>
        <ul className={styles.templates_list}>
          {templateList}
          <li className={styles.templates_item}>
            <div className={styles.none_template} onClick={handleNone}>
              + 템플릿 없이 자유롭게 그리기
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ChooseTemplates;
