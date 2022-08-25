import React from 'react';
import styles from './headerBack.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HeaderBack = (props) => {
  const navigate = useNavigate();

  // 뒤로가기 구현
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <nav className={styles.header}>
      <span onClick={handleGoBack}>
        <FontAwesomeIcon
          className={styles.back_icon}
          icon={faArrowLeftLong}
        ></FontAwesomeIcon>
      </span>
    </nav>
  );
};

export default HeaderBack;
