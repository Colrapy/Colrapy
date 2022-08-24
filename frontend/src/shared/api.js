import axios from 'axios';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

// 사용자 정보 저장
const useUsers = create(
    devtools((set) => ({
        userList: [],
        fetch: async (url) => {
            const response = await axios.get(url);
            console.log(`----response----`, response);
            set({ userList: await response.data })
        },
    }))
)

export default useUsers;