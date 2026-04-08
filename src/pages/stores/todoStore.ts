import { create } from 'zustand';

interface StoreState {
  user_id: string;
  setUserId: (user_id:string) => void;
}
const todoStore = create<StoreState>()((set) => ({
  // loginToken: '',
  // setLoginToken: (loginToken) => set({ loginToken: loginToken }),
  
  user_id: '',
  setUserId: (user_id) => set({ user_id: user_id }),
}));

export default todoStore;