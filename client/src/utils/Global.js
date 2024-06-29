import axios from 'axios';
import { cookies } from "../App";
const serverUrl = import.meta.env.VITE_BACKEND_URL;

export default class Global {
    static axios = axios.create({
        baseURL: serverUrl,
        withCredentials: true,
    })
    static user;
    static token;
    static isVerified;

    static async getUser() {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await this.httpGet("/auth/me");
                resolve(data.user);
            } catch (err) {
                Global.httpPut("/auth/logout").then(_ => {
                    Global.user = null;
                    Global.token = null;
                    cookies.remove("token", { path: '/' });
                }).catch(_ => {
                    Global.user = null;
                    Global.token = null;
                    cookies.remove("token", { path: '/' });
                })
                reject("No user found.")
            }
        })
    }

    static httpGet(endPoint, tokenRequired = true, params = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.token && tokenRequired) {
                    if (cookies.get("token"))
                        this.token = cookies.get("token");
                    else
                        return reject("Token not found");
                }
                if (this.token)
                    cookies.set("token", this.token, { path: '/' });
                try {
                    let output = await this.axios.get(endPoint, {
                        params,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: 'Bearer ' + this.token
                        }
                    });
                    resolve(output);
                } catch (err) {
                    reject(err?.response?.data?.error || "Something went wrong");
                }
            } catch (err) {
                console.error("F-Error", endPoint, err);
                reject("Something went wrong");
            }
        });
    }

    static httpPost(endPoint, body, tokenRequired = true, isFormData = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.token && tokenRequired) {
                    if (cookies.get("token"))
                        this.token = cookies.get("token");
                    else
                        return reject("Token not found");
                }
                if (this.token)
                    cookies.set("token", this.token, { path: '/' });
                let res;
                try {
                    res = await this.axios.post(endPoint, body, {
                        headers: {
                            "Content-Type": isFormData ? "multipart/form-data" : "application/json",
                            Authorization: 'Bearer ' + this.token
                        }
                    });
                    resolve(res);
                } catch (err) {
                    console.log(err)
                    reject(err?.response?.data?.message || "Something went wrong");
                }
            } catch (err) {
                console.log(err)
                reject("Something went wrong");
            }
        });
    }

    static httpPut(endPoint, body = {}, tokenRequired = true) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.token && tokenRequired) {
                    if (cookies.get("token"))
                        this.token = cookies.get("token");
                    else
                        return reject("Token not found");
                }
                if (this.token)
                    cookies.set("token", this.token, { path: '/' });
                try {
                    const headers = {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + this.token
                    };

                    const res = await this.axios.put(endPoint, body, { headers });
                    resolve(res);
                } catch (err) {
                    reject(err?.response?.data?.error || "Something went wrong");
                }
            } catch (err) {
                console.error("F-Error", endPoint, err);
                reject("Something went wrong");
            }
        });
    }
}

// module.exports = Global;