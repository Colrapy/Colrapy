import create from 'zustand';
import { devtools } from 'zustand/middleware';

// 사용자 정보 저장
export const userStore = create(
    devtools((set) => ({
        useremail: '',
        username: 'colrapy',
        userage: 24,
        usertoken: 'f5q4wq6df5qv13sd',
        setsEmail: (mail) => set((state) => ({ useremail: mail })),
        setsUsername: (name) => set((state) => ({ username: name })),
        setsAge: (age) => set((state) => ({ userage: age })),
        setsToken: (key) => set((state) => ({ usertoken: key }))
    }))
); 


export let authStore = create(
    devtools((set) => ({
        userAccess: false,
        changeAccess: () => set((state) => ({ userAccess: !state.userAccess })) // 로그인 여부를 바꿔줌
    }))
);
