import axios from "axios";

export function login(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/session`,
        data,
        {
          withCredentials: true,
        }
      );
      const result = await response.data;
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
export function register(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user`,
        data,
        {
          withCredentials: true,
        }
      );
      const result = await response.data;
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
