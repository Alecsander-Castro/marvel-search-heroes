import axios from "axios";
import CryptoJS from "crypto-js";

const publicKey = import.meta.env.VITE_PUBLIC_KEY || "";
const privateKey = import.meta.env.VITE_PRIVATE_KEY || "";

const ts = Date.now().toString();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

export const marvelAPI = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  params: {
    ts,
    apikey: publicKey,
    hash,
  },
});
