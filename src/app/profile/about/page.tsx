'use client';
import Cookies from "js-cookie";
import { createProfileAPI, getProfileAPI, updateProfileAPI } from "@/api/profile-api";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ChevronLeftIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TextInput from "@/src/component/InputText";
import InputDatePicker from "@/src/component/InputText/InputDatePicker";
import { Listbox } from "@headlessui/react";
import ZodiacCalculation from "@/src/component/zodiac/ZodiacCalculation";
import {formatDate, parseDateFromString, getAge} from '@/helper/formatDate';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const AboutPage = () => {
    const [profile, setProfile] = useState({});
    const [fields, setFields] = useState({
        name:  "",
        gender: "",
        birthday:  "",
        horoscope:  "",
        zodiac:  "",
        height:  "",
        weight:  "",
        images: '',
    });

    const [dataCookies, setDataCookies] = useState({
        image_profile: '',
        gender: '',
        profile_cookies: '',
    });

    const [selectImage, setSelectImage] = useState(null);
    const router = useRouter();
    const genderOptions = [
            { value: '', label: 'Pilih' },
            { value: 'laki-laki', label: 'Laki-laki' },
            { value: 'perempuan', label: 'Perempuan' },
        ];
    
    const {calculateZodiac} = ZodiacCalculation();

    useEffect(() => {
        const fetchProfile = async () => {
            let token = Cookies.get('token');
            
            try {
                let imageProfile = localStorage.getItem('image_profile');
                let gender = Cookies.get('gender');
                let profileCookies = Cookies.get('profile_cookies');
                const profile = await getProfileAPI(token);
                setProfile(profile.data);
                setDataCookies({
                    ...dataCookies,
                    image_profile: imageProfile,
                    gender: gender,
                    profile_cookies: profileCookies
                });
                setFields({
                    ...fields,
                    name: profile.data?.name || "",
                    gender: gender || "",
                    birthday: parseDateFromString(profile?.data?.birthday) || new Date(),
                    horoscope: profile.data?.horoscope || "",
                    zodiac: profile.data?.zodiac || "",
                    height: profile.data?.height || "",
                    weight: profile.data?.weight || "",
                });
            } catch (error) {
                console.error('Gagal mengambil profil:', error);
            }
        };
        
        fetchProfile();
    },[]);  


    const handleSelectImage = async(e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectImage(URL.createObjectURL(file));   
        }
        const base64 = await toBase64(file);
        localStorage.setItem('image_profile', base64);
    }


    const handleFields = (id, value) => {
        setFields({
            ...fields,
            [id]: value
        });
    }

    const handleSelectBirthday = (id="birthday", data) => {
        const calculation = calculateZodiac(data);
        setFields({
            ...fields,
            birthday: data,
            horoscope: calculation?.horoscope,
            zodiac: calculation?.zodiac
        });
    }

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    };

    const handleSaveOrUpdate = async() => {
        try {
            const birthday = formatDate(fields.birthday);
            const token = Cookies.get('token');
            const dataQuery = {
                name: fields.name,
                birthday: birthday,
                height: parseInt(fields.height),
                weight: parseInt(fields.weight),
                interest: []
            }
            let dataResult = null;
            if(profile?.name === null && profile?.birthday === null){
                 dataResult = await createProfileAPI(token, dataQuery);
            }else{
                 dataResult = await updateProfileAPI(token, dataQuery);
            }
            
            Cookies.set('gender', fields.gender, {expires:7, path: '/'});
            Cookies.set('profile_cookies', profile?.username, {expires:7, path: '/'});
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
                title: "Error!!",
                text: error.response?.data?.message || 'terjadi kesalahan proses...',
                icon: "error", 
            });
        }
    }


    return (
        <div className="bg-[#09141A] w-full h-[100%] overflow-auto flex justify-center py-5 p-3 md:p-8 flex-wrap">
            <div className="w-full flex items-center relative">
                <div className="w-ful flex items-center text-white">
                    <Link 
                    href={'/dashboard'}
                    className="flex text-left w-full flex-row items-center text-sm"
                    >
                        <ChevronLeftIcon width={18} height={18} className="mr-1" color="white" />
                        Back
                    </Link>
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
            <div className="w-full md:w-[70%] h-auto bg-[#0E191F] relative mt-5 rounded-md p-5 md:p-10">
                <p className="text-lg text-white">About</p>
                <p onClick={handleSaveOrUpdate}  className="flex text-white cursor-pointer absolute text-sm right-5 md:right-10 top-6 md:top-10 items-center justify-center">
                    Save & Updated
                </p>
                <div className="mt-3">
                    <div className="flex flex-col">
                        <div className="w-full py-5 flex flex-row aling-center">
                            <label
                                htmlFor="imageUpload"
                                className="flex items-center gap-2 cursor-pointer border rounded-lgs py-2"
                            >
                                {
                                    selectImage ?
                                        <img
                                            src={selectImage}
                                            alt="image"
                                            className="object-cover w-14 h-14 mr-2 rounded-lg"
                                        />
                                    :
                                    <PlusIcon className="w-14 h-14 p-3 mr-2 rounded-lg text-gray-600 border-1 border-gray-600 border-solid" />

                                }
                                
                                <span className="text-gray-700 font-medium">Add Image</span>
                            </label>

                            <input id="imageUpload" type="file" className="hidden" accept="image/*" onChange={handleSelectImage} />
                        </div>
                        <div className="flex flex-row mt-2 items-center justify-center">
                            <div className="text-[#FFFFFF54] w-full flex-1">Nama :</div>
                            <TextInput 
                                type="text" value={fields.name} 
                                id={'name'}
                                onChange={handleFields}
                                className={"w-full md:w-[50%] px-5 flex-2 text-right py-3 text-sm md:text-md bg-[rgba(255,255,255,0.1)] rounded-md text-white"} 
                                placeholder="Enter Name" />
                        </div>
                        <div className="flex flex-row mt-2 items-center justify-center">
                            <div className="text-[#FFFFFF54] w-full flex-1">Gender:</div>
                            <Listbox value={fields.gender} onChange={(val) => handleFields('gender', val)}>
                                <div className="relative w-full flex-2">
                                    <Listbox.Button className="w-full px-5 py-3 text-right text-white bg-[rgba(255,255,255,0.1)] rounded-md">
                                        {genderOptions.find(o => o.value === fields.gender)?.label || 'Pilih'}
                                    </Listbox.Button>
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                                        {genderOptions.map((option) => (
                                            <Listbox.Option
                                            key={option.value}
                                            value={option.value}
                                            className="cursor-pointer text-right px-4 py-2 text-black hover:bg-gray-200"
                                            >
                                            {option.label}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                        <div className="flex flex-row mt-2 items-center justify-center">
                            <div className="text-[#FFFFFF54] w-full flex-1">Birthday:</div>
                            <div className={"w-full flex-2"}>              
                            <InputDatePicker
                                selected={fields.birthday}
                                onChange={handleSelectBirthday}
                                id={"birthday"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row mt-2 items-center justify-center">
                            <div className="text-[#FFFFFF54] w-full flex-1">Horoscope:</div>
                            <TextInput 
                                type="text" 
                                className={"w-full px-5 flex-2 text-right py-3 text-sm md:text-md bg-[rgba(255,255,255,0.1)] rounded-md "} 
                                value={fields.horoscope}
                                readonly={true}
                                placeholder="-" />
                        </div>
                        <div className="flex flex-row mt-2 items-center justify-center">
                            <div className="text-[#FFFFFF54] w-full flex-1">Zodiac:</div>
                            <TextInput 
                                type="text" 
                                className={"w-full px-5 flex-2 text-right py-3 text-sm md:text-md bg-[rgba(255,255,255,0.1)] rounded-md"} 
                                value={fields.zodiac}
                                readonly={true}
                                placeholder="Enter Name" />
                        </div>
                        <div className="flex flex-row mt-2 items-center justify-center">
                            <div className="text-[#FFFFFF54] w-full flex-1">Height:</div>
                            <TextInput 
                                type="number"
                                id={'height'}
                                onChange={handleFields} 
                                className={"w-full px-5 flex-2 text-right py-3 text-sm md:text-md bg-[rgba(255,255,255,0.1)] rounded-md text-white"} 
                                value={fields.height}
                                placeholder="CM" />
                        </div>
                        <div className="flex flex-row mt-2 items-center justify-center">
                            <div className="text-[#FFFFFF54] w-full flex-1">Weight:</div>
                            <TextInput 
                                type="number"
                                id={'weight'} 
                                onChange={handleFields}
                                className={"w-full  px-5 flex-2 text-right py-3 text-sm md:text-md bg-[rgba(255,255,255,0.1)] rounded-md text-white"} 
                                value={fields.weight}
                                placeholder="Kg" />
                        </div>
                    </div>
                    
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

export default AboutPage;