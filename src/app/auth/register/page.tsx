'use client';
import React, {useCallback, useEffect, useState} from "react";
import TextInput from "@/src/component/InputText";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "@/src/component/Button/ButtonPrimary";
import Swal from "sweetalert2";
import { registerAPI } from "@/api/auth-api";
import { useRouter } from "next/navigation";


export default function Home() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const allFilled = Object.values(fields).every(value => value.trim() !== "");
    setIsFormComplete(allFilled);
  }, [fields]);

  const handleShowPassword = useCallback((id) => {
      setShowPassword((showPassword) => ({
          ...showPassword,
          [id]: !showPassword[id]
      }));
  }, []);

  const handleFields = useCallback((id="", data="") => {
    setFields({
      ...fields,
      [id]: data
    })
  }, [fields]);

  const handleRegister = async () => {
    try {
      if (fields.password !== fields.confirmPassword) {
        Swal.fire({
            title: "Gagal",
            text: "Password & konfirmasi password tidak sama",
            icon: "error"
        });
      } else {
        const data = {
            email: fields.email,
            username: fields.username,
            password: fields.password
        };

        let response = await registerAPI(data);
        response = response.data;
        Swal.fire({
            title: "Berhasil!",
            text: response?.message,
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {
              router.push('/');
          }
        });

      }  
    } catch (error) {
      Swal.fire({
          title: "Gagal!",
          text: error?.response?.data?.message || "Gagal mendaftar user",
          icon: "error"
      });
    }
    
  };

  return (
    <div
    className="text-white px-7 md:px-10 flex flex-col md:items-center py-20 w-full h-[100vh]"
    style={{
      background: 'radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)'
    }}
  >
    <p className="text-2xl">Register</p>
    <TextInput 
      className={"w-full md:w-[50%] mt-5 px-5 py-3 text-sm md:text-md bg-[rgba(255,255,255,0.1)] rounded-md text-white"} 
      value={fields.email} 
      onChange={handleFields}
      id={"email"}
      type="email"
      placeholder="Enter Email"/>
    <TextInput 
      className={"w-full md:w-[50%] mt-2 px-5 py-3 text-sm md:text-md bg-[rgba(255,255,255,0.1)] rounded-md text-white"} 
      value={fields.username} 
      onChange={handleFields}
      id={"username"}
      placeholder="Create Username"/>
      
    <div className="w-full  md:w-[50%] flex items-center justify-center  mt-2 bg-[rgba(255,255,255,0.1)] rounded-md">
        
        <TextInput 
          className={"w-full px-5 py-3 text-sm md:text-md text-white rounded-md border-none"} 
          value={fields.password} 
          onChange={handleFields}
          id={"password"}
          type={showPassword.password ? "text" :"password"}
          placeholder="Enter Password"/>
          {
            showPassword.password ?
              <EyeSlashIcon onClick={() =>handleShowPassword("password")} className="mx-3" width={24} color="white" />
            : <EyeIcon onClick={() =>handleShowPassword("password")} width={24} className="mx-3" color="white"/>
          }
    </div>
    <div className="w-full md:w-[50%] flex justify-center mt-2 bg-[rgba(255,255,255,0.1)] rounded-md">
        
        <TextInput 
          className={"w-full  px-5 py-3 text-sm md:text-md text-white rounded-md border-none"} 
          value={fields.confirmPassword} 
          onChange={handleFields}
          id={"confirmPassword"}
          type={showPassword.confirmPassword ? "text" :"password"}
          placeholder="Confirm Password"/>
          {
            showPassword.confirmPassword ?
              <EyeSlashIcon onClick={() =>handleShowPassword("confirmPassword")} className="mx-3" width={24} color="white" />
            : <EyeIcon onClick={() =>handleShowPassword("confirmPassword")} width={24} className="mx-3" color="white"/>
          }
      </div>
      <div className="w-full md:w-[50%]">
        <ButtonPrimary onChange={handleRegister} title={"Register"} disabled={!isFormComplete}/>
      </div>
      <p className="mt-10 w-full text-center text-xs md:text-md">Have an account? <a className="underline text-[#F3EDA6]" href="/">Login</a></p>
  </div>

  );
}
