import Global from './Global';
import { cookies } from '../App';

export async function loginUser(loginuserdata) {
    try {
        console.log(loginuserdata);
        const res = await Global.httpPost('/auth/login', {
            email: loginuserdata.email, password: loginuserdata.password
        }, false);
        Global.user = res.data.user;
        Global.token = res.data.token;
        cookies.set("token", res.data.token, { path: '/' });
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}