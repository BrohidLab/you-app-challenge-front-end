'use client';
import Cookies from "js-cookie";
import { getProfileAPI } from "@/api/profile-api";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { formatBirthdayWithAge, getAge } from "@/helper/formatDate";

const DashboardPage = () => {
    const [profile, setProfile] = useState({});
    const [dataCookies, setDataCookies] = useState({
        image_profile: '',
        gender: '',
        profile_cookies: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let token = Cookies.get('token');
                let imageProfile = localStorage.getItem('image_profile');
                let gender = Cookies.get('gender');
                let profileCookies = Cookies.get('profile_cookies');
                const profile = await getProfileAPI(token);
                setDataCookies({
                    ...dataCookies,
                    image_profile: imageProfile,
                    gender: gender,
                    profile_cookies: profileCookies
                });
                setProfile(profile.data);
            } catch (error) {
                console.error('Gagal mengambil profil:', error);
            }
        };
        
        fetchProfile();
    },[]); 


    return (
        <div className="bg-[#09141A] w-full h-[100vh] flex flex-wrap justify-center px-3 py-10 md:px-8 md:py-12 overflow-auto">
            <div className="w-full flex items-center relative">
                <div className="w-ful flex align-center text-white">
                    <button
                        className="flex text-left w-full flex-row items-center text-sm"
                    >
                        <ChevronLeftIcon width={18} height={18} className="mr-1" color="white" />
                        Logout
                    </button>
                </div>
            </div>
            <p className="w-full text-center text-white mt-5">@{profile?.username || ""}</p>
            <div 
                className="w-full md:w-[70%] h-100 md:h-[300px] relative text-white bg-[#162329] mt-5 rounded-lg overflow-hidden">
                {
                    dataCookies.profile_cookies === profile?.username && dataCookies.image_profile != undefined || dataCookies.image_profile != '' ?
                    <div className="w-full h-[300px] absolute top-0 left-0">
                        <div 
                            style={{
                                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0) 45.83%, #000000 100%)'
                            }} 
                            className="w-full h-44 md:h-[300px] absolute left-0 top-0 p-0 z-10">
                        </div>
                    
                        <img src={dataCookies.image_profile} className="absolute rounded-lg left-0 top-0 w-full h-44 md:h-[300px] object-cover" />
                    </div>
                    : null
                }
                    
                    <div className="absolute bottom-5 text-md left-3 md:left-10 md:bottom-5 font-bold z-20">
                        <p>@{profile?.username || ""}, {getAge(profile?.birthday || new Date())}</p>
                        {
                            dataCookies.gender ?
                                <p className="text-sm mt-1 text-gray-500 capitalize">{dataCookies.gender}</p> 
                            :null
                        }
                        {
                            profile?.horoscope != '' || profile?.zodiac != '' ?
                                <div className="flex flex-row items-center gap-1 mt-1">
                                    <span className="py-2 px-5 rounded-lg bg-[#162329] text-xs  text-white">{profile.horoscope}</span>
                                    <span className="py-2 px-5 rounded-lg bg-[#162329] text-xs  text-white">{profile.zodiac}</span>
                                </div>
                            :null
                        }
                        
                    </div>
                    
            </div>
            <div className="w-full md:w-[70%] md:h-auto bg-[#0E191F] relative mt-5 rounded-md p-5 md:p-10">
                <p className="text-lg text-white">About</p>
                <Link href={'/profile/about'} className="flex absolute right-5 top-6 align-center justify-center">
                    <PencilIcon width={18} color="white" />
                </Link>
                <div className="mt-3">
                    {
                        profile?.name === undefined && profile?.height === undefined ?
                            <p className="text-[#FFFFFF85]">Add in your your to help others know you better</p>    
                        :
                        <div className="flex flex-col">
                            <p className="text-[#FFFFFF54] mt-1">Birthday: <span className="text-white">{formatBirthdayWithAge(profile?.birthday || new Date())}</span></p>
                            <p className="text-[#FFFFFF54] mt-1">Horoscope: <span className="text-white">{profile?.horoscope}</span></p>
                            <p className="text-[#FFFFFF54] mt-1">Zodiac: <span className="text-white">{profile?.zodiac}</span></p>
                            <p className="text-[#FFFFFF54] mt-1">Height: <span className="text-white">{profile?.height}</span></p>
                            <p className="text-[#FFFFFF54] mt-1">Weight: <span className="text-white">{profile?.weight}</span></p>
                        </div>
                    }
                    </div>
            </div>
            <div className="w-full md:w-[70%] md:h-auto bg-[#0E191F] relative mt-5 rounded-md p-5 md:p-10">
                <p className="text-lg text-white">Interest</p>
                <Link href={'/profile/interest'} className="flex absolute right-5 top-6 align-center justify-center">
                    <PencilIcon width={18} color="white" />
                </Link>
                    
                <div className="mt-5">
                    {
                        profile?.interests?.length > 0 ?
                            <div className="w-full">
                                {
                                    profile.interests.map((items, index) => {
                                        return <span key={index} className="py-2 px-5 rounded-lg bg-[#162329] text-sm  text-white">{items}</span>
                                    })
                                }    
                            </div>
                            :
                            <p className="text-[#FFFFFF85]">Add in your your to help others know you better</p>    
                    }
                </div>
            </div>

        </div>
    )
}

export default DashboardPage;