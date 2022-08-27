import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './loding.module.css';
import { authApi } from '../../shared/axios';
import { LeapFrog } from '@uiball/loaders';

const Loading = (props) => {
  let navigate = useNavigate();
    
  const getResult = async() => {
    await authApi.get('/diary/loading/')
    .then((response) => {
        navigate('/diary/result');
    })
    .catch((error) => {
        console.log(error);
    });
  }

  useEffect(() => {
    getResult();
  });

    return(
      <div className={styles.content}>
        <div className={styles.ment}>
            <LeapFrog size={70} speed={2.5} color='white' />
        </div>
      </div>
    )
}

export default Loading;