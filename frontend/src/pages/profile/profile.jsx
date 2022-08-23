import React, { useEffect } from 'react';
import { useState } from 'react';
import InputLabel from '../../components/inputLabel';
import Button from '../../components/button';
import styles from './profile.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import data from '../../data/profile.json';
import { authApi } from '../../shared/axios';
import { authStore } from '../../shared/store';

const Profile = (props) => {
    const navigate = useNavigate();
    const userAccess = authStore((state) => state.userAccess);
    const changeAccess = authStore((state) => state.changeAccess);

    const [showProfile, setshowProfile] = useState(false);
    // 초기값은 서버로부터 전달받은 사용자 정보여야 함
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // state 변경 시 발생하는 함수
    const handleChangeAge = (e) => {
        setAge(e.target.value);
    }
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleChangePw = (e) => {
        setPassword(e.target.value);
    }

    // 서버로부터 사용자 정보 받아오기
    const getUserInfo = async() => {
        await authApi.get('/profile/',{
            params: {email: email}
        })
            .then((response) => {
                setEmail(response.data.email);
                setAge(response.data.age);
                setUsername(response.data.username);
                // setPassword(response.data.password);
            })
            .catch((error) => {
                alert('오류가 발생했어요. 새로고침 해주세요.😥');
            })
    }

    // 임시 코드
    // const getUserInfo = () => {
    //     setEmail(data.email);
    //     setAge(data.age);
    //     setUsername(data.username);
    // }


    useEffect(() => {
        getUserInfo();
    }, []);

    // input값 체크
    const checkInput = (password) => {
        if(password === '') {
            alert('비밀번호를 입력해주세요!');
            return false;
        }
        return true;
    }

    // 프로필 수정 시
    const updateUserInfo = async() => {
        if(!checkInput(password)) return;
        await authApi.put('/profile/', {
            age: age,
            username: username,
            password: password
        },{
            params: {email: email}
        })
            .then((response) => {
                alert('수정이 완료되었어요! 잠시 후 메인으로 이동합니다.');
                setTimeout(() => {
                    navigate('/colrapy');
                }, 2000);
            })
            .catch((error) => {
                alert('오류가 발생했어요. 새로고침 해주세요.😥');
            })
    }

    // 임시 코드2
    // const updateUserInfo = async() => {
    //     if(!checkInput(password)) return;
    //     setAge(age);
    //     setUsername(username);
    //     setPassword(password);
        
    //     alert('수정이 완료되었어요! 잠시 후 메인으로 이동합니다.');
    //     setTimeout(() => {
    //         navigate('/colrapy');
    //     }, 2000);
    // }

    const handleLogout = () => {
        if(userAccess === true) {
            changeAccess();
            alert('로그아웃 되었습니다. 😚');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
        // localStorage.removeItem('token');
    }

    return (
        <>
            <Header whiteback={true} />
            <div className={styles.content}>
                <div className={styles.click_list}>
                    <div className={styles.list_content} onClick={handleLogout} >
                        로그아웃
                    </div>
                    <div className={styles.list_content} onClick={() => setshowProfile(!showProfile)} >
                        프로필 수정하기
                    </div>
                    { showProfile 
                    ? <div className={styles.controlbar_accordion} >
                            <form> 
                                <InputLabel label='이메일' name='email' placeholder={email} disabled/>
                                <InputLabel label='나이' name='age' value={age} onChange={handleChangeAge}/>
                                <InputLabel label='사용자이름' name='username' value={username} onChange={handleChangeUsername}/>
                                <InputLabel label='비밀번호' name='password' placeholder='비밀번호를 입력하세요.' type='password' onChange={handleChangePw}/>
                            </form>
                            <Button content={'수정 완료'} whiteback={true} _onClick={updateUserInfo} />
                        </div>
                    : ''}
                </div>
            </div>
        </>
    )
}

export default Profile;