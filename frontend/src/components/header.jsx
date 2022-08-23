import React from 'react';
import styles from './header.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { authStore } from '../shared/store';

const Header = ({ whiteback }) => {
    const navigate = useNavigate();
    const userAccess = authStore((state) => state.userAccess);
    
    // 홈으로 가기
    const handleGoHome = () => {
        if(userAccess === false) {
            navigate('/');
        } else {
            navigate('/colrapy');
        }
    }

    // 프로필로 가기
    const handleGoProfile = () => {
        if(userAccess === false) {
            alert('회원가입 및 로그인을 해주세요. 😚');
            setTimeout(() => {
                navigate('/users/login');
            }, 1000);
        } else {
            navigate('/profile');
        }
    }

    return (
        <nav className={ whiteback ? styles.whiteback : styles.header }>
            <h1 className={styles.title} onClick={handleGoHome}>
                Colrapy
            </h1>
            <span onClick={handleGoProfile}>
                <FontAwesomeIcon 
                    className={styles.user_icon}
                    icon={faCircleUser}>
                </FontAwesomeIcon>
            </span>
        </nav>
    )
}

Header.defaultProps = {
    whiteback: false
}

export default Header;
