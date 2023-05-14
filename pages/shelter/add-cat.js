import Head from 'next/head'
import Image from 'next/image'
import addProfile from '../../public/add-cat/add-profile.png'
import changeProfile from '../../public/add-cat/change-profile.png'
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import Router from 'next/router';
import { getCookie } from 'cookies-next';


export default function AddCat() {
    //setup 
    const session = useSession()
    const [loading, setLoading] = useState(true)
    const [cat, setCat] = useState(null)
    const [catpicture, setCatpicture] = useState(null)
    const [uid, setUid] = useState(null);

    useEffect(() => {
        getUid()
    }, [])

    const getUid = async () => {
        var cookie = getCookie("supabase-auth-token")
        var token = cookie.split('"')[1]
        var { data: { user: { id } }, } = await supabase.auth.getUser(token)
        setUid(id)
    }

    const handleUpload = async (e) => {
        let file;
        file = e.target.files[0];
        setCatpicture("" + file?.name)

        console.log("set path Name");
    }

    const handleUpload2 = async (e) => {
        let file;
        file = e.target.cat_picture.files[0];

        console.log("upload");

        const { data, error } = await supabase.storage.from("add-cat-images").upload("" + file?.name, file, { cacheControl: '3600', upsert: false });
        if (data) {
            console.log("upload" + JSON.stringify(data));
            setCatpicture(data.path)
        } else if (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        handleUpload2(e)
        catExample(e)
        Router.push({
            pathname: "/shelter/add-cat-success",
        })
    }

    const catExample = async (e) => {

        var raw = JSON.stringify({
            "login_id": uid,
            "cat_name": e.target.cat_name.value,
            "sex": e.target.sex.value,
            "breed": e.target.breed.value,
            "color": e.target.color.value,
            "sterile": e.target.sterile.value,
            "vaccine": e.target.vaccine.value,
            "detail": e.target.detail.value,
            "cat_picture": "https://rcfbscerwcqpvvvpspba.supabase.co/storage/v1/object/public/add-cat-images/" + catpicture,
            "status": true,
            "age": e.target.age.value,
            "age_unit": e.target.age_unit.value,
            "congenital_disease": e.target.congenital_disease.value
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


        let response = await fetch("/api/cat/shelterview/addCat", requestOptions);
        let dataCat = await response.json();
        console.log("response : " + JSON.stringify(dataCat));

    };




    return (
        <div class="container min-h-[87vh] h-auto mx-auto max-w-6xl px-5 xl:px-0 ">
            <Head>
                <title>Cat Finder</title>
                <meta name="description" content="create by eleven" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav class="flex my-8 breadcrumb" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                            หน้าแรก
                        </a>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <a href="/shelter/my-cat" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <span class="ml-1 text-sm font-medium text-gray-700 md:ml-2 ">แมวของฉัน</span>
                            </a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <a class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 ">ลงทะเบียนแมว</span>
                            </a>
                        </div>
                    </li>
                </ol>
            </nav>

            <div class="button-hidden flex mt-8">
                <p class="text-4xl text-black font-normal mb-8">ลงทะเบียนแมว</p>
            </div>

            <hr class="button-hidden border-1 border-gray-200 mb-8" />

            {/*section 2*/}

            <div class="bg-light-salmon py-6">
                <div class="flex">
                    <div class="ml-28">
                        <div class="text-2xl font-normal text-transparent bg-clip-text bg-gradient-to-b from-bright-salmon to-salmon">ข้อมูลแมว</div>
                        <div class="text-sm font-light text-gray-600 pt-1.5">ข้อมูลเบื้องต้นของแมว</div>
                        <div class="text-sm font-light text-gray-600">สำหรับแสดงส่วนของโปรไฟล์</div>
                    </div>

                    <form method="POST" onSubmit={handleSubmit}>
                        <div class="h-auto bg-white rounded-t shadow-md px-7 py-6 space-y-3 ml-28">
                            <label class="block w-2/3">
                                <span class=" flex text-gray-700">ชื่อน้องแมว
                                    <span class="text-error font-light">*</span>
                                </span>
                                <input
                                    id="cat_name"
                                    name="cat_name"
                                    type="text"
                                    class="
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                            font-normal
                                            placeholder-gray-300
                                        "
                                    placeholder="โปรดระบุชื่อ"
                                    required
                                />
                            </label>
                            <div class="flex">
                                <label class="block w-2/12">
                                    <span class=" flex text-gray-700">อายุ
                                        <span class="text-error font-light">*</span>
                                    </span>
                                    <input
                                        id="age"
                                        name="age"
                                        type="text"
                                        class="
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                            font-normal
                                            placeholder-gray-500
                                        "
                                        required
                                    />
                                </label>
                                <label class="block pl-5 pt-5">
                                    <select
                                        id="age_unit"
                                        name="age_unit"
                                        class="
                                            block
                                            w-full
                                            mt-1
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                            text-gray-900 
                                            font-normal
                                        "
                                    >
                                        <option value="ปี">ปี</option>
                                        <option value="เดือน">เดือน</option>
                                    </select>
                                </label>
                            </div>
                            <label class="block w-3/6">
                                <span class=" flex text-gray-700">เพศ
                                    <span class="text-error font-light">*</span>
                                </span>
                                <select
                                    id="sex"
                                    name="sex"
                                    class="
                                            block
                                            w-full
                                            mt-1
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                            text-gray-500 
                                            font-normal
                                        "
                                    required
                                >
                                    <option value="" selected disabled hidden>เลือกเพศ</option>
                                    <option value="ผู้">เพศผู้</option>
                                    <option value="เมีย">เพศเมีย</option>
                                </select>
                            </label>
                            <label class="block w-3/6">
                                <span class=" flex text-gray-700">สายพันธุ์
                                    <span class="text-error font-light">*</span>
                                </span>
                                <select
                                    id="breed"
                                    name="breed"
                                    class="
                                            block
                                            w-full
                                            mt-1
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                            text-gray-500
                                            font-normal
                                        "
                                    required
                                >
                                    <option value="" selected disabled hidden>เลือกสายพันธุ์</option>
                                    <option value="ไทย">ไทย</option>
                                    <option value="ผสม">ผสม</option>
                                    <option value="สีสวาด">สีสวาด</option>
                                    <option value="ขาวมณี">ขาวมณี</option>
                                    <option value="วิเชียรมาศ">วิเชียรมาศ</option>
                                    <option value="สก็อตติช โฟลด์">สก็อตติช โฟลด์</option>
                                    <option value="อเมริกัน ชอร์ตแฮร์">อเมริกัน ชอร์ตแฮร์</option>
                                    <option value="บริติช ชอร์ตแฮร์">บริติช ชอร์ตแฮร์</option>
                                    <option value="เอ็กโซติก ชอร์ตแฮร์">เอ็กโซติก ชอร์ตแฮร์</option>
                                    <option value="เปอร์เซีย">เปอร์เซีย</option>
                                    <option value="แร็กดอลล์">แร็กดอลล์</option>
                                    <option value="สฟิงซ์">สฟิงซ์</option>
                                </select>
                            </label>
                            <label class="block w-3/6">
                                <span class=" flex text-gray-700">สี หรือ ลาย
                                    <span class="text-error font-light">*</span>
                                </span>
                                <select
                                    id="color"
                                    name="color"
                                    class="
                                            block
                                            w-full
                                            mt-1
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                            text-gray-500
                                            font-normal
                                        "
                                    required
                                >
                                    <option value="" selected disabled hidden>เลือกสี หรือ ลาย</option>
                                    <option value="ดำ">ดำ</option>
                                    <option value="ส้ม">ส้ม</option>
                                    <option value="ขาว">ขาว</option>
                                    <option value="ครีม">ครีม</option>
                                    <option value="เทา">เทา</option>
                                    <option value="น้ำตาล">น้ำตาล</option>
                                    <option value="ทองแดง">ทองแดง</option>
                                    <option value="ขาวดำ">ขาวดำ</option>
                                    <option value="ขาวส้ม">ขาวส้ม</option>
                                    <option value="ขาวเทา">ขาวเทา</option>
                                    <option value="ขาวครีม">ขาวครีม</option>
                                    <option value="สองสี">สองสี</option>
                                    <option value="สลิด">สลิด</option>
                                    <option value="สามสี">สามสี</option>
                                    <option value="เปรอะ">เปรอะ</option>
                                    <option value="แต้ม">แต้ม</option>
                                    <option value="แต้มเปรอะ">แต้มเปรอะ</option>
                                </select>
                            </label>
                            <label class="block w-3/6">
                                <span class=" flex text-gray-700">การฉีดวัคซีน
                                    <span class="text-error font-light">*</span>
                                </span>
                                <select
                                    id="vaccine"
                                    name="vaccine"
                                    class="
                                            block
                                            w-full
                                            mt-1
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                            text-gray-500
                                            font-normal
                                        "
                                    required
                                >
                                    <option value="" selected disabled hidden>เลือกประวัติ</option>
                                    <option value={true}>ฉีดวัคซีนแล้ว</option>
                                    <option value={false}>ยังไม่ซีดวัคซีน</option>
                                </select>
                            </label>
                            <label class="block w-3/6">
                                <span class=" flex text-gray-700">ประวัติการทำหมัน
                                    <span class="text-error font-light">*</span>
                                </span>
                                <select
                                    id="sterile"
                                    name="sterile"
                                    class="
                                            block
                                            w-full
                                            mt-1
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                            text-gray-500
                                            font-normal
                                        "
                                    required
                                >
                                    <option value="" selected disabled hidden>เลือกประวัติ</option>
                                    <option value={true}>ทำหมันแล้ว</option>
                                    <option value={false}>ยังไม่ทำหมัน</option>
                                </select>
                            </label>
                            <label class="block w-3/6">
                                <span class=" flex text-gray-700">โรคประจำตัว
                                    <span class="text-error font-light">*</span>
                                </span>
                                <select
                                    id="congenital_disease"
                                    name="congenital_disease"
                                    class="
                                            block
                                            w-full
                                            mt-1
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                            text-gray-500
                                            font-normal
                                        "
                                    required
                                >
                                    <option value="" selected disabled hidden>เลือกโรคประจำตัว</option>
                                    <option value="ไม่มี">ไม่มี</option>
                                    <option value="โรคติดเชื้อไวรัส(หวัดแมว)">โรคติดเชื้อไวรัส(หวัดแมว)</option>
                                    <option value="โรคไข้หัดแมว">โรคไข้หัดแมว</option>
                                    <option value="โรคมะเร็งเม็ดโลหิตขาว(FeLV)">โรคมะเร็งเม็ดโลหิตขาว(FeLV)</option>
                                    <option value="โรคเอดส์แมว(FIV)">โรคเอดส์แมว(FIV)</option>
                                    <option value="โรคเยื่อบุช่องท้องอักเสบ(FIP)">โรคเยื่อบุช่องท้องอักเสบ(FIP)</option>
                                    <option value="โรคปอดบวม">โรคปอดบวม</option>
                                    <option value="โรคผิวหนัง">โรคผิวหนัง</option>
                                    <option value="อื่นๆ (ระบุในประวัติ)">อื่นๆ (กรุณาระบุในประวัติ)</option>
                                </select>
                            </label>

                            <label class="block w-full">

                                <label for="message" class="block mb-2 text-base font-normal text-gray-700">ประวัติโดยย่อ</label>
                                <textarea
                                    id="detail"
                                    name="detail"
                                    type="text"
                                    class="block
                                    w-full
                                    h-20
                                    rounded-md
                                    border-gray-300
                                    shadow-sm
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                    font-normal
                                    placeholder-gray-900" >

                                </textarea>
                            </label>
                            <span class="text-sm text-gray-500 font-light">เล่าเกี่ยวกับน้องแมวตัวนี้ เช่น นิสัย ของชอบ อาการบาดเจ็บ ประวัติการถ่ายพยาธิ เป็นต้น</span>
                            <span class="flex text-gray-700 text-sm text-normal pt-3">รูปภาพแมว
                                <span class="text-error pl-2">ขนาด 331 * 390 px</span>
                            </span>
                            <div class="flex w-full">
                                <Image class="pt-1 pb-1" src={changeProfile} placeholder="blur" />
                                <div class="flex flex-col items-center justify-center bg-white font-normal border border-gray-300 text-gray-700 text-center rounded-md h-[36px] text-sm py-2 px-5 mx-6 my-2">
                                    Change
                                </div>
                                {/* <input id="cat_picture" name="cat_picture" type="file" accept="image/*" class="hidden"
                                        onChange={(e) => { handleUpload(e) }} /> */}
                                {/* {catpicture ? (<span class="font-normal text-sm text-gray-900 my-auto">{catpicture}</span>) : (<></>)}  */}
                            </div>
                            <div class="flex items-center justify-center w-full">
                                <label for="cat_picture" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <Image class="mx-auto pt-5" src={addProfile} placeholder="blur" />
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="text-indigo-600">Upload a file</span> or drag and drop</p>
                                        <span class="text-gray-500 text-xs font-light">PNG, JPG, GIF up to 10MB</span>
                                    </div>
                                    <input id="cat_picture" name="cat_picture" type="file" accept="image/*" class="hidden"
                                        onChange={(e) => { handleUpload(e) }}
                                    />
                                    {catpicture ? (<span class="font-normal text-sm text-gray-900 my-auto">{catpicture}</span>) : (<></>)}
                                </label>
                            </div>
                        </div>
                        <div class="w-[803px] h-[56px] bg-gray-50 rounded-b shadow-md ml-28">
                            <div class="h-[30rem] py-3">
                                <button type="submit" class="flex rounded-lg bg-salmon text-white text-xs font-normal px-6 py-2.5 ml-[700px]"
                                    onClick={(e) => { handleSubmit(e) }}
                                >
                                    ยืนยัน
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
                <div class="w-10/12 h-0.5 bg-gray-200 mx-28 my-7" />
            </div>
            <div class="h-[20rem]" />
        </div >
    )
}


