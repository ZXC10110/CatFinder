import Image from 'next/image'
import vectorLocation from '../public/index/vector-location.png'
import Router from 'next/router';
import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react';
import { supabase } from '../pages/api/supabase'
import { getCookie } from 'cookies-next';

export default function HomecardCatprofile({ item }) {
    //const user = useUser()
    const imgcat= item.cat_picture
    const statuscat=item.status
    const namecat=item.cat_name
    const idcat=item.cat_id
    const detail=item.detail
    const tagbreed=item.breed 
    const tagcolor=item.color
    const tagsex=item.sex 
    const fund=item.shelter_profile?.shelter_name
    const [path,setPath]=useState("/cat/")

    useEffect(() => {
        checkPath()
    }, [])
    
    const checkPath = async () => {
        var cookie = getCookie("supabase-auth-token")
        if(cookie){
            var token = cookie.split('"')[1]
            var{ data: { user },}= await supabase.auth.getUser(token)
            
            if(user?.user_metadata?.role == 1){
                setPath("/user/cat/")
            }
        }
    }
    
    return (
        <div class="cursor-pointer" type="button" onClick={()=>Router.push({
              pathname: path+idcat,
          })} >

            <div class="rounded-t-lg box-border shadow-md shadow-gray-300 w-[297px] h-[415.08px] bg-white">
                <div class="w-full h-[234px] rounded-t-lg bg-cover" style={{"background-image": "url("+imgcat+")"}} />
                { statuscat? (
                    <div class="max-w-[36px] h-[26px] bg-green-200 rounded-[32px] mx-6 mt-3">
                        <p class="text-[12px] text-green-600 font-medium text-center pt-1"> ว่าง </p>
                    </div>
                ):(
                    <div class="max-w-[48px] h-[26px] bg-red-200 rounded-[32px] mx-6 mt-3">
                        <p class="text-[12px] text-red-600 font-medium text-center pt-1"> มีบ้าน </p>
                    </div>
                )}

                <p class="text-[20px] text-salmon font-medium px-6 pt-2">{namecat} <>(#</>{idcat}<>)</></p>
                <p class="text-[12px] text-gray-500 font-normal px-6 pt-2">{detail}</p>
                <div class="flex space-x-4 justify-center font-normal">
                    <div class="px-5 h-[28px] bg-light-salmon rounded-[32px] mt-3">
                        <p class="text-[12px] text-gray-600 font-medium text-center pt-1">{tagbreed}</p>
                    </div>
                    <div class="px-5 h-[28px] bg-light-salmon rounded-[32px] mt-3">
                        <p class="text-[12px] text-gray-600 font-medium text-center pt-1 ">{tagcolor}</p>
                    </div>
                    <div class="px-5 h-[28px] bg-light-salmon rounded-[32px] mt-3">
                        <p class="text-[12px] text-gray-600 font-medium text-center pt-1 ">{tagsex}</p>
                    </div>
                </div>
            </div>
            <div class="w-[297px] h-[50px] bg-white rounded-b-lg box-border shadow-lg border-[1px] border-white-light font-normal">
                <div class="flex">
                    <Image class="w-[17px] pt-4 ml-5 " src={vectorLocation} placeholder="blur" />
                    <p class="text-[14px] text-gray-400 font-normal pl-2 pt-4">{fund}</p>
                </div>
            </div>
        </div>
    );
}