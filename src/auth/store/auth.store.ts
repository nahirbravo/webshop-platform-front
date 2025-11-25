import { checkAuthAction } from './../actions/check-auth.action';
import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action';


type AuthStatus = 'authenicated' | 'not-authenicated' | 'checking';


type AuthState = {
//PROPERTIES (solo d electura que ayudan a enteder como se encuentra el estado en ese momento y cuando cambia s epuede redibujar)
user: User | null;
token: string | null;
authStatus: AuthStatus;
//GETTERS  (valores de estado)
isAdmin: () => boolean;
//ACTIONS (modifican nuetro state)
login: (email: string, password: string)=> Promise<boolean> 
logout: () => void;
checkAuthStatus: () => Promise<boolean>,

}

export const useAuthStore = create<AuthState>()((set, get) => ({
 //implementacion del store
 user: null,
 token: null,
 authStatus: 'checking',

//getters
 isAdmin: () => {
   return !!get().user?.roles.includes('admin')

 },



 //actions
 login: async(email: string, password: string) => {
     console.log({email, password})

    try {
        const data = await loginAction(email, password);
              localStorage.setItem('token', data.token);
              set({user: data.user, token: data.token, authStatus: 'authenicated'})
              return true;
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
              localStorage.removeItem('token')
              set({user: null, token: null, authStatus: 'not-authenicated'})
              return false;
    }
 },
 logout: () => {
    localStorage.removeItem('token');
    set({user: null, token: null, authStatus: 'not-authenicated'})
 },

 checkAuthStatus: async() => {
   try {
      const {user, token} = await checkAuthAction();
      set({
         user: user,
         token: token,
         authStatus: 'authenicated'
      })
      return true;
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   } catch (error) {
       set({
         user: undefined,
         token: undefined,
         authStatus: 'not-authenicated'
      })
      return false;
   }
 }
}))


