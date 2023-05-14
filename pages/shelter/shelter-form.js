import { useSession, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Router from 'next/router';
import { supabase } from '../api/supabase'
import { getCookie } from 'cookies-next';

export default function ShelterForm() {

    const ShelterForm = async (e) => {
        var cookie = getCookie("supabase-auth-token")
        var token = cookie.split('"')[1]
        var{ data: { user:{id} },}= await supabase.auth.getUser(token)

        var raw = JSON.stringify({
            "login_id": id,
            "shelter_name": e.target.shelter_name.value,
            "website_url": e.target.website_url.value,
            "email": e.target.email.value,
            "address": e.target.address1.value+" "+e.target.address2.value+" "+e.target.address3.value+" "+e.target.address4.value,
            "location_url": e.target.location_url.value,
            "contact_name": e.target.contact_name.value,
            "contact_lastname": e.target.contact_lastname.value,
            "contact_phone": e.target.contact_phone.value,
            "donate_name1": e.target.donate_name1.value,
            "donate_number1": e.target.donate_number1.value,
            "donate_name2": e.target.donate_name2.value,
            "donate_number2": e.target.donate_number2.value
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

        try {
            let response = await fetch("/api/shelter/editShelter", requestOptions);
            let data = await response.json();
            console.log("response : " + JSON.stringify(data));
        } finally {
            Router.push({
                pathname: '/'
            })
        }
    };

    return (
        <div class="h-auto">
            <div class="w-screen h-[20rem]">
                <p class="text-[48px] font-normal text-center pt-[7rem]">สมัครสมาชิก</p>
                <p class="text-[20px] font-normal text-center pt-2 text-iris">สำหรับมูลนิธิ</p>
            </div>

            <form onSubmit={ShelterForm} method="POST">
                <div class="bg-gray-200">
                    <div class="container mx-auto flex justify-around">

                        <div class="w-1/3 pt-9">
                            <h4 class="font-medium">ข้อมูลมูลนิธิ</h4>
                            <h6 class="font-light pt-2">ข้อมูลเบื้องต้นของมูลนิธิเพื่อให้ทางทีมงาน Cat Finder และ ผู้ใช้งานทั่วไปสามารถอ่านข้อมูล</h6>
                        </div>

                        <div class="w-3/5 my-8 bg-white shadow rounded-t-md">
                            <div class="p-7 max-w-lg">
                                <div class="grid grid-cols-1 gap-6 pb-5">
                                    <label for="shelter-website" class="block">
                                        <span class="text-gray-700">ชื่อมูลนิธิ</span>

                                        <div class="flex">
                                            <span class="inline-flex items-center px-3 mt-1 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 ">
                                                มูลนิธิ
                                            </span>
                                            <input
                                                id="shelter_name"
                                                name="shelter_name"
                                                type="text"
                                                class="
                                                mt-1
                                                block
                                                w-full
                                                rounded-none
                                                rounded-r-md
                                                border-gray-300
                                                shadow-sm
                                                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                placeholder=""
                                            />
                                        </div>
                                    </label>
                                    <label for="shelter-website" class="block">
                                        <span class="text-gray-700">เว็บไซต์</span>

                                        <div class="flex">
                                            <span class="inline-flex items-center px-3 mt-1 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 ">
                                                http://
                                            </span>
                                            <input
                                                id="website_url"
                                                name="website_url"
                                                type="text"
                                                class="
                                                mt-1
                                                block
                                                w-full
                                                rounded-none
                                                rounded-r-md
                                                border-gray-300
                                                shadow-sm
                                                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                placeholder=""
                                            />
                                        </div>
                                    </label>

                                    <span class="text-gray-700">ช่องทางการรับบริจาค</span>
                                    <div class="grid md:grid-cols-2 md:gap-6 ">
                                        <div class="flex w-full group">
                                            <label for="firstname" class="text-sm col-span-6 sm:col-span-3">ชื่อธนาคาร (1)
                                                <input
                                                    id="donate_name1"
                                                    name="donate_name1"
                                                    type="text"
                                                    class="
                                                    mt-1
                                                    block
                                                    w-full
                                                    rounded-md
                                                    border-gray-300
                        
                                                    shadow-sm
                                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                    placeholder=""
                                                />
                                            </label>
                                        </div>
                                        <div class="flex w-full group">
                                            <label for="firstname" class="text-sm col-span-6 sm:col-span-3">หมายเลขบัญชี (1)
                                                <input
                                                    id="donate_number1"
                                                    name="donate_number1"
                                                    type="text"
                                                    class="
                                                    mt-1
                                                    block
                                                    w-full
                                                    rounded-md
                                                    border-gray-300
                                                    shadow-sm
                                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                    placeholder=""
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <div class="grid md:grid-cols-2 md:gap-6 ">
                                        <div class="relative z-0 mb-6 w-full group">
                                            <label for="firstname" class="text-sm col-span-6 sm:col-span-3">ชื่อธนาคาร (2)
                                                <input
                                                    id="donate_name2"
                                                    name="donate_name2"
                                                    type="text"
                                                    class="
                                                    mt-1
                                                    block
                                                    w-full
                                                    rounded-md
                                                    border-gray-300
                                                    shadow-sm
                                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                    placeholder=""
                                                />
                                            </label>
                                        </div>
                                        <div class="relative z-0 mb-6 w-full group">
                                            <label for="firstname" class="text-sm col-span-6 sm:col-span-3">หมายเลขบัญชี (2)
                                                <input
                                                    id="donate_number2"
                                                    name="donate_number2"
                                                    type="text"
                                                    class="
                                                    mt-1
                                                    block
                                                    w-full
                                                    rounded-md
                                                    border-gray-300
                                                    shadow-sm
                                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                    placeholder=""
                                                />
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hidden xs:block bg-gray-200" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-300"></div>
                    </div>
                </div>

                <div class="bg-gray-200">
                    <div class="container mx-auto flex justify-around">

                        <div class="w-1/3 pt-9">
                            <h4 class="font-medium">ข้อมูลสำหรับติดต่อ</h4>
                            <h6 class="font-light pt-2">ข้อมูลสำหรับให้ทางทีมงาน cat Finder ติดต่อกับทางมูลนิธิ</h6>
                        </div>

                        <div class="w-3/5 my-8 bg-white shadow rounded-t-md">
                            <div class="p-7 max-w-lg">
                                <div class="grid grid-cols-1 gap-6 pb-5">

                                    <div class="grid md:grid-cols-2 md:gap-6 ">
                                        <div class="flex w-full group">
                                            <label for="firstname" class="text-sm col-span-6 sm:col-span-3">ชื่อ
                                                <input
                                                    id="contact_name"
                                                    name="contact_name"
                                                    type="text"
                                                    class="
                                                    mt-1
                                                    block
                                                    w-full
                                                    rounded-md
                                                    border-gray-300
                                                    shadow-sm
                                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                    placeholder=""
                                                />
                                            </label>
                                        </div>
                                        <div class="flex w-full group">
                                            <label for="firstname" class="text-sm col-span-6 sm:col-span-3">นามสกุล
                                                <input
                                                    id="contact_lastname"
                                                    name="contact_lastname"
                                                    type="text"
                                                    class="
                                                    mt-1
                                                    block
                                                    w-full
                                                    rounded-md
                                                    border-gray-300
                                                    shadow-sm
                                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                    placeholder=""
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <label class="block">
                                        <span class="text-gray-700">Email address</span>
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
                                            class="
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                            placeholder=""
                                        />
                                    </label>
                                    <label class="block">
                                        <span class="text-gray-700">เบอร์ติดต่อ</span>
                                        <input
                                            id="contact_phone"
                                            name="contact_phone"
                                            type="text"
                                            class="
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                            placeholder=""
                                        />
                                    </label>
                                    <label class="block">
                                        <span class="text-gray-700">ที่อยู่มูลนิธิ</span>
                                        <input
                                            id="address1"
                                            name="address1"
                                            type="text"
                                            class="
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                            placeholder=""
                                        />
                                    </label>

                                    <div class="grid md:grid-cols-3 md:gap-6 ">
                                        <div class="flex w-full group">
                                            <label for="firstname" class="text-sm col-span-6 sm:col-span-3">อำเภอ
                                                <input
                                                    id="address2"
                                                    name="address2"
                                                    type="text"
                                                    class="
                                                    mt-1
                                                    block
                                                    w-full
                                                    rounded-md
                                                    border-gray-300
                                                    shadow-sm
                                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                    placeholder=""
                                                />
                                            </label>
                                        </div>
                                        <div class="flex w-full group">
                                            <label for="firstname" class="text-sm col-span-6 sm:col-span-3">จังหวัด
                                                <input
                                                    id="address3"
                                                    name="address3"
                                                    type="text"
                                                    class="
                                                    mt-1
                                                    block
                                                    w-full
                                                    rounded-md
                                                    border-gray-300
                                                    shadow-sm
                                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                    placeholder=""
                                                />
                                            </label>
                                        </div>
                                        <div class="flex w-full group">
                                            <label for="firstname" class="text-sm col-span-6 sm:col-span-3">รหัสไปรษณีย์
                                                <input
                                                    id="address4"
                                                    name="address4"
                                                    type="text"
                                                    class="
                                                    mt-1
                                                    block
                                                    w-full
                                                    rounded-md
                                                    border-gray-300
                                                    shadow-sm
                                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                                    placeholder=""
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <label class="block">
                                        <span class="text-gray-700">ลิงก์ google map (https://)</span>
                                        <input
                                            id="location_url"
                                            name="location_url"
                                            type="text"
                                            class="
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                            placeholder=""
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container mx-auto flex justify-end">
                    <button type="submit" class="rounded-[4px] bg-salmon text-[18px] text-white font-normal text-center py-2.5 px-5 mt-8 mr-7">ยืนยัน</button>
                </div>


            </form>
        </div>
    )
}