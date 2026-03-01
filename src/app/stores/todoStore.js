import { create } from 'zustand';

const todoStore = create((set) => ({
  // loginToken: '',
  // setLoginToken: (loginToken) => set({ loginToken: loginToken }),
  
  user_id: '',
  setUserId: (user_id) => set({ user_id: user_id }),
}));

export default todoStore;