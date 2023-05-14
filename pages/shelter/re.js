import { useSession, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import catProfileAdopt1 from '../../public/index/cat-profile-adopt1.png'
import catProfileAdopt2 from '../../public/index/cat-profile-adopt2.png'
import catProfileAdopt3 from '../../public/index/cat-profile-adopt3.png'
import catProfileAdopt4 from '../../public/index/cat-profile-adopt4.png'
import catProfileAdopt5 from '../../public/index/cat-profile-adopt5.png'
import catProfileAdopt6 from '../../public/index/cat-profile-adopt6.png'
import previousIcon from '../../public/my-cat/previous-icon.png'
import nextIcon from '../../public/my-cat/next-icon.png'
import vectorprinter from '../../public/my-cat/printer.png'
import line1 from '../../public/my-cat/line.png'
import Router from 'next/router';



export default function MyCat() {
  const user = useUser()
  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState(null)
  // const [id, setId] = useState(0)

  useEffect(() => {
    catExample()
  }, [])


  const catExample = async () => {
    var raw = JSON.stringify({
      "login_id": "fadadb65-080e-4be8-a3dc-163df80e0918",
      "page_number": 1

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
      setLoading(true);
      let response = await fetch("/api/cat/shelterview/myCatShelterview", requestOptions);
      let data = await response.json();
      console.log("response : " + JSON.stringify(data));
      setCat(data)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container mx-auto">
      <nav class="flex mx-28 mt-9" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              หน้าแรก
            </a>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">แมวของฉัน</span>
            </div>
          </li>
        </ol>
      </nav>
      <div class="flex mt-8">
        <p class="text-4xl text-black font-normal mx-28">แมวของฉัน</p>
        <div>
          <a href="/shelter/add-cat" className="rounded-lg bg-salmon text-white text-lg ml-[890px] mb-7 px-6 py-2 gap-3">
            + เพิ่มแมว</a>
        </div>
      </div>
      <div class="w-10/12 h-0.5 bg-gray-200 mt-3 mx-28" />

      <form>
        <div class="flex mt-9">
          <label class="block ml-44">
            <select
              type="search"
              id="search-dropdown"
              class="
                block
                rounded-l-md
                border-gray-300
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                text-gray-500 
                font-normal
            "
            >
              <option value="สถานะ">สถานะ</option>
              <option value="สายพันธุ์">สายพันธุ์</option>
              <option value="สี หรือ ลาย"> สี หรือ ลาย</option>
              <option value="รหัสแมว">รหัสแมว</option>
            </select>
          </label>
          <div class="relative w-full mr-28">
            <input
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="พิมพ์ค้นหาที่นี่"
              required
            />
            <button type="submit"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-salmon rounded-r-lg border 
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
              </path>
              </svg>
            </button>
          </div>
        </div>
      </form>

      <a href="/user/form-adopt" className="flex rounded-lg bg-iris-20 border-iris-60 border-2 text-iris-100 text-sm font-normal mt-7 ml-[82rem] pt-2 pb-2 px-3 w-32 h-10">
        <Image class="my-auto pr-1" src={vectorprinter} placeholder="blur" />
        พิมพ์เอกสาร</a>

      <div class="h-[35rem]">
        <div class="h-auto rounded-lg drop-shadow-md bg-gray-50 ml-28 mr-28 mt-5 border-2 border-gray-200 ">
          {/*<div class="flex text-gray-500 font-normal pt-3 pl-7 space-x-[28rem]">*/}
          <div class="flex text-gray-500 text-sm font-normal pt-2 pb-1">
            <div class="w-[30rem] pl-7">
              <p class=" ">ชื่อ</p>
            </div>
            <div class="w-[28rem]">
              <p>สายพันธุ์</p>
            </div>
            <div class="w-[3rem]">
              <p>สถานะ</p>
            </div>
            <div class="w-[10rem]"></div>
          </div>

          {cat?.map((item) => (
            <div class="flex h-auto">
              <div class="flex w-[30rem] bg-white border-b border-gray-200 font-normal text-sm">
                <Image class="mt-auto mb-auto ml-4" src={catProfileAdopt2} placeholder="blur" />
                <div class="py-3 pl-2">
                  <p class="text-gray-900 text-base">{item.cat_name} <>(#</>{item.cat_id}<>)</></p>
                  <p class="text-gray-500 text-xs">วันเข้าระบบ : {item.create_date}</p>
                </div>
              </div>
              <div class="flex w-[28rem] bg-white border-gray-200 border-b font-normal text-sm">
                <div class="my-auto">
                  <p class="text-gray-900 text-base">{item.breed}</p>
                  <p class="text-gray-500 text-xs">{item.sex}</p>
                </div>
              </div>
              <div class="flex w-[3rem] bg-white border-gray-200 border-b">
                {
                  item.status ? (<p class="w-9 h-7 bg-green-200 rounded-[32px] my-auto text-sm text-green-600 font-medium text-center pt-1">ว่าง</p>) :
                    (<p class="w-9 h-7 bg-red-200 rounded-[32px] my-auto text-sm text-red-600 font-medium text-center pt-1">มีบ้าน</p>)
                }
              </div>
              <div class="flex w-[20rem] bg-white border-b border-gray-200">
                <button type="button" onClick={() => Router.push({ pathname: "/shelter/cat/" + item.cat_id, })} class="text-sm text-indigo-600 font-normal ml-48">Edit</button>
              </div>
            </div>
          ))}
          {/* <div class="flex h-auto drop-shadow-md bg-white border-b border-gray-200 font-normal">
            <Image class="mx-7 my-4" src={catProfileAdopt1} placeholder="blur" />
            <div class="py-4">
              <p class="text-gray-900 text-base">กีต้า (#1255)</p>
              <p class="text-gray-500 text-xs">วันเข้าระบบ : 12/01/65</p>
            </div>
            <div class="py-4 pl-20 ">
              <p class="text-gray-900 pl-[200px] text-base">ไทย</p>
              <p class="text-gray-500 pl-[200px] text-xs">เพศผู้</p>
            </div>
            <p class="w-9 h-7 bg-green-200 rounded-[32px] ml-[29rem] mt-6 text-[12px] text-green-600 font-medium text-center pt-1">ว่าง</p>
            <a href="/shelter/cat/3" className="text-sm text-indigo-600 font-normal ml-48 pt-7">
              Edit</a>
          </div>
          <div class="flex h-auto drop-shadow-md bg-white border-b border-gray-200 font-normal text-sm">
            <Image class="mx-7 my-4" src={catProfileAdopt2} placeholder="blur" />
            <div class="py-4">
              <p class="text-gray-900 text-base">กีต้า (#1255)</p>
              <p class="text-gray-500 text-xs">วันเข้าระบบ : 12/01/65</p>
            </div>
            <div class="py-4 pl-20">
              <p class="text-gray-900 pl-[200px] text-base">ไทย</p>
              <p class="text-gray-500 pl-[200px] text-xs">เพศผู้</p>
            </div>
            <p class="w-9 h-7 bg-green-200 rounded-[32px] ml-[29rem] mt-6 text-[12px] text-green-600 font-medium text-center pt-1">ว่าง</p>
            <button class="text-sm text-indigo-600 font-normal ml-48">Edit</button>
          </div>
          <div class="flex h-auto drop-shadow-md bg-white border-b border-gray-200 font-normal text-sm">
            <Image class="mx-7 my-4" src={catProfileAdopt3} placeholder="blur" />
            <div class="py-4">
              <p class="text-gray-900 text-base">กีต้า (#1255)</p>
              <p class="text-gray-500 text-xs">วันเข้าระบบ : 12/01/65</p>
            </div>
            <div class="py-4 pl-20">
              <p class="text-gray-900 pl-[200px] text-base">ไทย</p>
              <p class="text-gray-500 pl-[200px] text-xs">เพศผู้</p>
            </div>
            <p class="w-9 h-7 bg-green-200 rounded-[32px] ml-[29rem] mt-6 text-[12px] text-green-600 font-medium text-center pt-1">ว่าง</p>
            <button class="text-sm text-indigo-600 font-normal ml-48">Edit</button>
          </div>
          <div class="flex h-auto drop-shadow-md bg-white border-b border-gray-200 font-normal text-sm">
            <Image class="mx-7 my-4" src={catProfileAdopt4} placeholder="blur" />
            <div class="py-4">
              <p class="text-gray-900 text-base">กีต้า (#1255)</p>
              <p class="text-gray-500 text-xs">วันเข้าระบบ : 12/01/65</p>
            </div>
            <div class="py-4 pl-20">
              <p class="text-gray-900 pl-[200px] text-base">ไทย</p>
              <p class="text-gray-500 pl-[200px] text-xs">เพศผู้</p>
            </div>
            <p class="w-9 h-7 bg-green-200 rounded-[32px] ml-[29rem] mt-6 text-[12px] text-green-600 font-medium text-center pt-1">ว่าง</p>
            <button class="text-sm text-indigo-600 font-normal ml-48">Edit</button>
          </div>
          <div class="flex h-auto drop-shadow-md bg-white border-b border-gray-200 font-normal text-sm">
            <Image class="mx-7 my-4" src={catProfileAdopt5} placeholder="blur" />
            <div class="py-4">
              <p class="text-gray-900 text-base">กีต้า (#1255)</p>
              <p class="text-gray-500 text-xs">วันเข้าระบบ : 12/01/65</p>
            </div>
            <div class="py-4 pl-20">
              <p class="text-gray-900 pl-[200px] text-base">ไทย</p>
              <p class="text-gray-500 pl-[200px] text-xs">เพศผู้</p>
            </div>
            <p class="w-9 h-7 bg-red-200 rounded-[32px] ml-[29rem] mt-6 text-[12px] text-red-600 font-medium text-center pt-1">มีบ้าน</p>
            <button class="text-sm text-indigo-600 font-normal ml-48">Edit</button>
          </div>
          <div class="flex h-auto drop-shadow-md rounded-b-lg bg-white border-b border-gray-200 font-normal text-sm">
            <Image class="mx-7 my-4" src={catProfileAdopt6} placeholder="blur" />
            <div class="py-4">
              <p class="text-gray-900 text-base">กีต้า (#1255)</p>
              <p class="text-gray-500 text-xs">วันเข้าระบบ : 12/01/65</p>
            </div>
            <div class="py-4 pl-20">
              <p class="text-gray-900 pl-[200px] text-base">ไทย</p>
              <p class="text-gray-500 pl-[200px] text-xs">เพศผู้</p>
            </div>
            <p class="w-9 h-7 bg-red-200 rounded-[32px] ml-[29rem] mt-6 text-[12px] text-red-600 font-medium text-center pt-1">มีบ้าน</p>
            <button class="text-sm text-indigo-600 font-normal ml-48">Edit</button>
          </div> */}
        </div>
      </div>

      <div class="flex w-[20rem] h-12 rounded-lg border-2 border-paw font-normal text-base text-paw mx-auto px-4 space-x-5">
        <button type="button "
          class="flex">
          <Image class="pt-3" src={previousIcon} placeholder="blur"></Image>
          <p class="pl-3 pt-3"> Previous   </p>
        </button>
        <p class="pt-3"> 1 </p>
        <p class="pt-3"> 2 </p>
        <p class="pt-3"> 3 </p>
        <button type="button "
          class="flex">
          <p class="pr-3 pt-3">   Next </p>
          <Image class="pt-4" src={nextIcon} placeholder="blur"></Image>
        </button>
      </div>

      <div class="h-96"></div>


    </div >

  )

}









