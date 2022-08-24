import { async } from "regenerator-runtime";
import {SECONDS, seconds} from './config';
import { uploadrecipe } from "./module";

export const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  export const getJson = async function(url){
    try{
    const res = await Promise.race([fetch(url),timeout(SECONDS)]) ;
    return res.json();
    if(!res.ok)
    throw new Error (`${errMsg} (${res.status})`);
    }catch(err){
       throw err;
    }
  };
  export const sendJson = async function(url, uploadData){
    try{
      const fetchPro = fetch(url, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(uploadData),
      });
            const res = await Promise.race([fetchPro,timeout(SECONDS)]) ;
            const data= await res.json();
          if(!res.ok)
            throw new Error (`${errMsg} (${res.status})`);
            return data;
    }catch(err){
       throw err;
    }
  };