import create from 'zustand';
import { devtools } from 'zustand/middleware';

// 사용자 정보 저장
export const userStore = create(
    devtools((set) => ({
        email: '',
        username: 'colrapy',
        token: ''
    }))
); 


export let authStore = create(
    devtools((set) => ({
        userAccess: false,
        changeAccess: () => set((state) => ({ userAccess: !state.userAccess })) // 로그인 여부를 바꿔줌
    }))
);
