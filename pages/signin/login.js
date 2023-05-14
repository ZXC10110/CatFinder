// import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

// const SignIn = () => {
//   const session = useSession()
//   const supabase = useSupabaseClient()

//   return (
//     <div class="grid h-screen place-items-center">
//       {!session ? (
//         <div class="h-64 w-80 -mt-24">
//           <Auth supabaseClient={supabase} appearance={{
//             theme: ThemeSupa,
//             variables: {
//               default: {
//                 colors: {
//                   brand: '#FA8072',
//                   brandAccent: '#FA8072',
//                 }
//               },
//             },
//           }} />
//         </div>
//       ) : (
//         <h1>เข้าสู่ระบบแล้ว</h1>
//       )}
//     </div>
//   )
// }

// export default SignIn

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
//import { supabase } from '../api/supabase'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const LogIn = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [color,setColor]=useState("h-[87vh] bg-white")
  const router = useRouter();
  
  const signin = async(e) => {
    // setColor("h-[87vh] bg-green-600")
    // var email = "63050146@kmitl.ac.th"
    // var password = "pill146"
    var email = e.target.email.value
    var password = e.target.password.value

    let { data, error } = await supabase.auth.signInWithPassword({
      // email: e.target.email.value,
      // password: e.target.password.value
      // "email" : "63050146@kmitl.ac.th",
      // "password" : "pill146",
      email,password
    })

    setCookie('input email', email);
    setCookie('input password', password);

    if(data){
      console.log("data:"+JSON.stringify(data))
      setCookie('supabase-auth-token', data.session);
      setCookie('ok-supabase-auth-token', data);
      // setColor("h-[87vh] bg-yellow-600")
    }

    if(error){
      console.log("error:"+JSON.stringify(error))
      setCookie('err-supabase-auth-token', error);
      // setColor("h-[87vh] bg-error")
    }

  }

  //น่าจะทำใหม่แบบเขียนเอง
  return (
    <div class={color}>
      {!session ? (
      <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div>
            <img
              class="mx-auto h-12 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/763/763704.png"
              alt="Cat "
            />
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              เข้าสู่ระบบ
            </h2>

          </div>

          <form class="mt-8 space-y-6" onSubmit={signin} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div class="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  class="
                  relative block 
                  w-full 
                  appearance-none 
                  rounded-none rounded-t-md 
                  border border-gray-300 
                  px-3 py-2 
                  text-gray-900 
                  placeholder-gray-400 
                  focus:z-10 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  class="
                mb-0
                relative block
                w-full
                rounded-none rounded-b-md
                border-gray-300
                shadow-sm
                placeholder-gray-400 
                focus:z-10 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 sm:text-sm
                "
                  placeholder="Password"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-salmon focus:ring-bright-salmon"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  จดจำรหัสผ่าน
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-salmon hover:text-bright-salmon">
                  ลืมรหัสผ่าน
                </a>
              </div>
            </div>

            <div>
              <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-salmon py-2 px-4 text-sm font-light text-white hover:bg-bright-salmon focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon class="h-5 w-5 text-bright-salmon group-hover:text-light-salmon" aria-hidden="true" />
                </span>
                เข้าสู่ระบบ
              </button>
            </div>

            <div class="flex text-sm">
              <span html="remember-me" class="ml-2 block text-sm text-gray-900">
                ยังไม่มีบัญชี?
              </span>
              <a href="/signin/user" class="font-medium text-salmon hover:text-bright-salmon mx-1">
                สมัครสมาชิก
              </a>
            </div>
          </form>
        </div>
      </div >
      ) : (
        <div class="grid place-items-center h-[87vh]">
          <h1>เข้าสู่ระบบแล้ว</h1>
        </div>
      )}
    </div >
  )
}

export default LogIn
