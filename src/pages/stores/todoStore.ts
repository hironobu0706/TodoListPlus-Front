import { create } from 'zustand';

interface StoreState {
  user_id: string;
  user_name: string;

  setUserId: (user_id:string) => void;
  setUserName: (user_name:string) => void;
}
const todoStore = create<StoreState>()((set) => ({
  user_id: '',
  user_name: '',
  setUserId: (user_id) => set({ user_id: user_id }),
  setUserName: (user_name) => set({ user_name: user_name }),
}));

export default todoStore;