import axiosOriginal from "axios";

export const axios = axiosOriginal.create({
  baseURL: "https://cl.michaelilyin.ru/index-api"
});
