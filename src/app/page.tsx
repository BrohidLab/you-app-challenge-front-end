'use client';
import React, {useCallback, useState, useEffect} from "react";
import TextInput from "@/src/component/InputText";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "@/src/component/Button/ButtonPrimary";
import Link from "next/link";
import { loginAPI } from "@/api/auth-api";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";


export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    password: ""
  });

  const router = useRouter();
  
  const [isFormComplete, setIsFormComplete] = useState(false);
  useEffect(() => {
      const allFilled = Object.values(fields).every(value => value.trim() !== "");
      setIsFormComplete(allFilled);
    }, [fields]);
  

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleFields = useCallback((id="", data="") => {
    setFields({
      ...fields,
      [id]: data
    })
  }, [fields]);

  const handleLogin = async() => {
    let data = {
      email: fields.username,
      username: fields.username,
      password: fields.password
    }
    let dataLogin = await loginAPI(data);
    setCookie(null, "token", dataLogin.access_token, {
      maxAge: 2 * 24 * 30 * 30
    });
    router.push("/dashboard");
  }
  
  return (
    <div
    className="text-white px-7 md:px-10 flex flex-col md:items-center py-20 w-full h-[100vh]"
    style={{
      background: 'radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)'
    }}
  >
    <p className="text-2xl">Login</p>
    <TextInput 
      className={"w-full md:w-[50%] mt-5 px-5 py-3 text-sm md:text-md bg-[rgba(255,255,255,0.1)] rounded-md text-white"} 
      value={fields.username} 
      onChange={handleFields}
      id={"username"}
      placeholder="Enter Email"/>
      
      <div className="w-full md:w-[50%] flex justify-center px-2 py-3 mt-2 bg-[rgba(255,255,255,0.1)] rounded-md">
        
        <TextInput 
          className={"w-full md:w-[50%] px-3 text-sm md:text-md text-white rounded-md border-none"} 
          value={fields.password} 
          onChange={handleFields}
          id={"password"}
          type={showPassword ? "text" :"password"}
          placeholder="Enter Password"/>
          {
            showPassword ?
              <EyeSlashIcon onClick={handleShowPassword} className="ml-3" width={24} color="white" />
            : <EyeIcon onClick={handleShowPassword} width={24} className="ml-3" color="white"/>
          }
      </div>

      <ButtonPrimary onChange={handleLogin} title={"Login"} disabled={!isFormComplete}/>
      <p className="mt-10 w-full text-center text-xs md:text-md">No account? <Link className="underline text-[#F3EDA6]" href={"/auth/register"}>Register Here</Link></p>
  </div>

  );
}
