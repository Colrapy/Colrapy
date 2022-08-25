import create from 'zustand';
import { devtools } from 'zustand/middleware';

// 사용자 정보 저장
export const userStore = create(
  devtools((set) => ({
    useremail: '',
    username: 'colrapy',
    userage: 0,
    // usertoken: 'f5q4wq6df5qv13sd',
    setsEmail: (mail) => set((state) => ({ useremail: mail })),
    setsUsername: (name) => set((state) => ({ username: name })),
    setsAge: (age) => set((state) => ({ userage: age })),
    // setsToken: (key) => set((state) => ({ usertoken: key })),
  }))
);

// 로그인 유무에 따른 접근 관리
export const authStore = create(
  devtools((set) => ({
    userAccess: false,
    changeAccess: () => set((state) => ({ userAccess: !state.userAccess })), // 로그인 여부를 바꿔줌
  }))
);

// 색상 관련 정보 저장
export const colorStore = create(
  devtools((set) => ({
    colors: [],
    baseImgs: [],
    lineImgs: [],
    setsColors: (colors) => set((state) => ({ colors: colors })),
    setsBaseImgs: (imagesList) => {
      let objToImgs = Object.entries(...imagesList);
      let images = [];
      for (let [key, value] of objToImgs) {
        images.push(value);
      }
      set((state) => ({ baseImgs: images }));
    },
    setsLineImgs: (imagesList) => {
      let objToImgs = Object.entries(...imagesList);
      let images = [];
      for (let [key, value] of objToImgs) {
        images.push(value);
      }
      set((state) => ({ lineImgs: images }));
    },
  }))
);
