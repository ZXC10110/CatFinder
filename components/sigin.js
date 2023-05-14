import { useState } from 'react';
import Router from 'next/router';
import { supabase } from '../pages/api/supabase'
import { create } from 'domain';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Signin({ role }) {
    const [color,setColor]=useState("h-auto bg-white")
    const [input,setInput] = useState({email:"",password:0,confirmPassword:1});


    const updateInput = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = async(e) =>{
        signup(e);
        setRole(e);
        if(role==2){
            createProfile();
            ()=>Router.push({
                pathname: '/shelter/shelter-form'
            })
        }else{
            ()=>Router.push({
                pathname: '/'
            }) 
        }
    }

    //func call Auth Signin Supabase
    const signup = async (e) => {
        let { data, error } = supabase.auth.signUp({
            email: e.target.email.value,
            password: e.target.password.value
        })

        if(data){
            console.log("data:"+JSON.stringify(data))
            setCookie('supabase-auth-token', data.session);
            // setCookie('ok-supabase-auth-token', data);
        }

        if(error){
            console.log("error:"+JSON.stringify(error))
            // setCookie('err-supabase-auth-token', error);
        }
        return 0;
    }

    const setRole = async(e) => {
        // setColor("h-auto bg-green-600")
        console.log(e.target.email.value + e.target.password.value + role)
        let { data, error } = supabase.auth.updateUser({
            email: e.target.email.value,
            password: e.target.password.value,
            data:{
                role: role
            }
        })

        if(data){
            console.log("data:"+JSON.stringify(data))
            setCookie('supabase-auth-token', data.session);
            // setCookie('ok-supabase-auth-token', data);
            // setColor("h-auto bg-yellow-600")
        }

        if(error){
            console.log("error:"+JSON.stringify(error))
            // setCookie('err-supabase-auth-token', error);
            // setColor("h-auto bg-red-600")
        }

        return 0;
    }

    const createProfile = async() =>{
        //fix user_id not stable
        var cookie = getCookie("supabase-auth-token")
        var token = cookie.split('"')[1]
        var{ data: { user:{id} },}= await supabase.auth.getUser(token)

        var raw = JSON.stringify({
            "login_id": id ,
        });

        var myheader = {
            'Content-Type': 'application/json'
        };

        var requestOptions = {
            method: 'POST',
            headers: myheader,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch("/api/shelter/createShelter", requestOptions);
        let data = await response.json();
        console.log("response : " + JSON.stringify(data));

        return 0;
    }

    return (
        <div class={color}>
            <form onSubmit={handleSignup} method="POST">
                <div class="bg-gray-200">
                    <div class="container mx-auto flex justify-around">
                        <div class="w-1/3 pt-9">
                            <h4 class="font-inter font-medium">User and Password</h4>
                            <h6 class="font-light pt-2">email และ password สำหรับเข้าสู่ระบบ</h6>
                        </div>
                        <div class="w-3/5 my-8 bg-white shadow rounded-t-md">
                            <div class="p-7 max-w-lg">
                                <div class="grid grid-cols-1 gap-6 pb-5">
                                    <label class="block">
                                        <span class="font-inter text-gray-700">Email address</span>
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
                                            onChange={updateInput}
                                            class={classNames(
                                                (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(input.email)))
                                                    ? "border-error"
                                                    : "border-gray-300",
                                                "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            )}
                                            placeholder=""
                                        />
                                    </label>
                                    <label class="block">
                                        <span class="font-inter text-gray-700">Password</span>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={updateInput}
                                            class={classNames(
                                                (input.password!=""&&input.password!=input.confirmPassword)
                                                    ? "border-error"
                                                    : "border-gray-300",
                                                "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            )}
                                            placeholder=""
                                        />
                                    </label>
                                    <label class="block">
                                        <span class="font-inter text-gray-700">Confirm Password</span>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            onChange={updateInput}
                                            class={classNames(
                                                (input.password!=""&&input.password!=input.confirmPassword)
                                                    ? "border-error"
                                                    : "border-gray-300",
                                                "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            )}
                                            placeholder=""
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container mx-auto flex justify-end">
                    <button type="submit" class="rounded-[4px] bg-iris text-[18px] text-white font-normal text-center py-2.5 px-5 mt-8 mr-7">ถัดไป</button>
                </div>
            </form>
        </div>
    );
}