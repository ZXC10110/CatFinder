import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Signin from '../../components/sigin'
import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function SignInShelter() {
  const user = useUser()

  const createProfile = async () => {
      var raw = JSON.stringify({"login_id" : user.id});

      var myheader = {
        'Content-Type': 'application/json'
      };

      var requestOptions = {
        method: 'POST',
        headers: myheader,
        body: raw,
        redirect: 'follow'
      };

      try {
        setLoading(true);
        let response = await fetch("/api/shelter/createShelter", requestOptions);
        let data = await response.json();
        console.log("response : " + JSON.stringify(data));
      } finally {
        setLoading(false);
      }
    };

  return (
    <div class="h-auto">
      <div>
        <div class="w-screen h-[20rem]">
          <p class="text-[48px] font-normal text-center pt-[7rem]">สมัครสมาชิก</p>
          <p class="text-iris text-[20px] font-normal text-center pt-2">สำหรับมูลนิธิ</p>
        </div>
        <Signin role={2} />
      </div>
    </div>
  )
}