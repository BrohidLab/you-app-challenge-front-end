// lib/axios.js
import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
});

const createHeader = (token ="") => {
  if (token) {
    return {
      headers: {
                "Accept": "*/*",
                "x-access-token": `${token}`,
                "Content-Type": "application/json"
            }
    };
  } else {
    return {
      headers: {
          "Accept": "*/*",
          "Content-Type": "application/json"
      }
    };
  }
};

export { client, createHeader };
