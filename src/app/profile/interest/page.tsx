'use client';

import InputMultiTags from "@/src/component/InputText/InputMultiTags";
import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { createProfileAPI, getProfileAPI, updateProfileAPI } from "@/api/profile-api";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const InterestPage = () => {
  const [profile, setProfile] = useState({});
  const [interest, setInterest] = useState([]);
  
  const router = useRouter();

  useEffect(() => {
    const getLoadData = async() => {
      try {
        const token = Cookies.get('token');
        let dataProfile = await getProfileAPI(token);
        dataProfile = dataProfile.data;
        setProfile(dataProfile);
        let converInterest = [];
        dataProfile?.interests.forEach(items => {
          converInterest.push({
            id: items,
            text: items,
            className: ''
          });
        });
        setInterest(converInterest);
      } catch (error) {
        return console.log('gagal mengambil data');
      }

    }

    getLoadData();
  },[]);

  const handleDelete = (index: number) => {
    setInterest(interest.filter((_, i) => i !== index));
    document.querySelector(".ReactTags__tagInput input")?.focus();
  };

  const handleAddition = (data) => {
    setInterest([
      ...interest,
      data
    ])
  };

  const handleSaveInterest = async() => {
    try {
      const token = Cookies.get('token');
      let getInterest = [];
      interest.forEach(items => {
        getInterest.push(items.text);
      });

      let dataQuery = {
        name: profile?.name || '',
        birthday: profile?.birthday || '',
        height: profile?.height || 0,
        weight: profile?.weight || 0,
        interests: getInterest
      }

      let dataResult = null;

      if(profile?.name === null && profile?.birthday === null){
            dataResult = await createProfileAPI(token, dataQuery);
      }else{
            dataResult = await updateProfileAPI(token, dataQuery);
      }

      Swal.fire({
          title: "Berhasil!",
          text: dataResult?.data?.message,
          icon: "success",
          confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
            router.push('/dashboard');
        }
      });

    } catch (error) {
      Swal.fire({
          title: "Gagal!",
          text: error?.response?.data?.message || 'Gagal Simpan data',
          icon: "error",
      });
    }
  }

  return(
    <>
      <div
        className="text-white px-5 md:px-10 flex flex-col md:items-center py-5 w-full h-[100vh]"
        style={{
          background: 'radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)'
        }}
      >
        <div className="w-full flex align-center relative">
          <div className="w-ful flex items-center">
          <Link 
            href={'/dashboard'}
            className="flex text-left w-full flex-row items-center text-sm"
          >
            <ChevronLeftIcon width={18} height={18} className="mr-1" color="white" />
            Back
          </Link>
          </div>
          <p onClick={handleSaveInterest} className="w-full text-blue-400 text-sm text-right">Save</p>
        </div>
        <p 
          className="text-sm md:text-md mt-16 bg-[linear-gradient(74.08deg,#94783E_-6.8%,#F3EDA6_16.76%,#F8FAE5_30.5%,#FFE2BE_49.6%,#D5BE88_78.56%,#F8FAE5_89.01%,#D5BE88_100.43%)] bg-clip-text text-transparent"
        >
          Tell everyone about your self</p>
        <h2 className="text-xl">What interest you?</h2>
        <div className="w-full md:w-[50%] mt-7">
          <InputMultiTags tags={interest} handleDelete={handleDelete} handleAddition={handleAddition} />
        </div>
          
      </div>
    </>
  )
}

export default InterestPage;