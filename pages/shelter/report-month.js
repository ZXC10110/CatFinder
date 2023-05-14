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
import { supabase } from '../api/supabase'
import { getCookie } from 'cookies-next';

function getFormattedDate(options) {
  const today = new Date();
  return new Intl.DateTimeFormat('en-US', options).format(today);
}

export default function MyCat() {
  const user = useUser()
  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState(null)
  const [month, setMonth] = useState(null)
  // const [id, setId] = useState(0)

  const formatTimestamp = (timestamp) => {
    const date = timestamp.split("T")[0]
    const time_tz = timestamp.split("T")[1]
    const time = time_tz.split("+")[0]
    return `${date} ${time}`
  }

  const date = getFormattedDate({ year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    catExample()
  }, [])


  const catExample = async () => {
    var cookie = getCookie("supabase-auth-token")
    var token = cookie.split('"')[1]
    var { data: { user: { id } }, } = await supabase.auth.getUser(token)

    var raw = JSON.stringify({
      "login_id": id,
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
      let response = await fetch("/api/adopt/getReport", requestOptions);
      let data = await response.json();
      console.log("response : " + JSON.stringify(data));
      setCat(data)
      setMonth(data.perMonth?.data)
      console.log("response : " + JSON.stringify(data.perMonth));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container min-h-[87vh] h-auto mx-auto max-w-6xl px-5 xl:px-0">

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
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">รายงานยอดการอุปการะ</span>
            </div>
          </li>
        </ol>
      </nav>


      <div class="button-hidden flex mt-8">

        <p class="text-4xl text-black font-normal mb-8">รายงานยอดการอุปการะ</p>

        <button
          type="button"
          onClick={() => window.print()}
          class="
          button-hidden 
          h-10
          md:ml-auto
          lg:ml-auto
          bg-iris hover:bg-indigo-400
          text-white font-medium 
          py-2 px-4 gap-3 
          rounded inline-flex items-center"
          style={{ '@media print': { display: 'none' } }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7.25 7h9.5V5c0-2-.75-3-3-3h-3.5c-2.25 0-3 1-3 3v2ZM16 15v4c0 2-1 3-3 3h-2c-2 0-3-1-3-3v-4h8Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 10v5c0 2-1 3-3 3h-2v-3H8v3H6c-2 0-3-1-3-3v-5c0-2 1-3 3-3h12c2 0 3 1 3 3ZM17 15H7M7 11h3" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <span>พิมพ์รายงาน</span>
        </button>

      </div>

      <hr class="button-hidden border-1 border-gray-200 mb-8" />

      <script src="js/paged.polyfill.js"></script>
      <div class="page-number"></div>



      <div clss="flex">
        <div><p class="flex justify-between text-base text-black font-normal">รายงานยอดการอุปการะแมวผ่านแพลตฟอร์ม Cat finder</p></div>
        <div><p class="flex justify-end text-sm text-black font-normal">ชื่อมูลนิธิ : {cat?.perMonth?.data[0].shelter_profile?.shelter_name}</p></div>
        <div><p class="flex justify-end text-sm text-black font-normal">วันที่ออกรายงาน : {date}</p></div>
        <p class="flex text-3xl text-iris font-normal">ยอดรายเดือน</p>
      </div>






      <div class="overflow-x-hidden w-full mt-5 rounded md:rounded-lg shadow-md  md:w-auto">
        {month && Array.isArray(month) && (


          <table class=" w-full text-sm text-left font-light text-black ">
            <thead class="text-base text-gray-500 bg-gray-300">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ลำดับ
                </th>
                <th scope="col" class="py-3 px-6">
                  รหัสแมว
                </th>
                <th scope="col" class="py-3 px-6">
                  ชื่อแมว
                </th>
                <th scope="col" class="py-3 px-6">
                  สายพันธุ์
                </th>
                <th scope="col" class="py-3 px-6">
                  เพศ
                </th>
                <th scope="col" class="py-3 px-6">
                  วันเข้าระบบ
                </th>
                <th scope="col" class="py-3 px-6">
                  วันที่ออก(ถูกรับเลี้ยง)
                </th>
                <th scope="col" class="py-3 px-6">
                  อีเมลผู้อุปการะ
                </th>
              </tr>
            </thead>

            {month?.map((item, index) => (

              <tbody>
                <tr class="bg-gray-100 border-g border-gray-200">
                  <th scope="row" class="py-4 px-6 font-light text-black whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td class="py-4 px-6">
                    <>#</>{item.cat_id}<></>
                  </td>
                  <td class="py-4 px-6">
                    {item.cat_profile.cat_name}
                  </td>
                  <td class="py-4 px-6">
                    {item.cat_profile.breed}
                  </td>
                  <td class="py-4 px-6">
                    {item.cat_profile.sex}
                  </td>
                  <td class="py-4 px-6">
                    {formatTimestamp(item.cat_profile.create_date)}
                  </td>
                  <td class="py-4 px-6">
                    {item.adopt_date}
                  </td>
                  <td class="py-4 px-6">
                    {item.user_profile.email}
                  </td>
                </tr>
              </tbody>



            ))}


            <tfoot>
              <tr class="font-medium text-base text-gray-900 ">
                <th scope="row" class="py-3 px-6 text-base"> </th>
                <td class="py-4 px-6"> </td>
                <td class="py-4 px-6"> </td>
                <td class="py-4 px-6"> </td>
                <td class="py-4 px-6"> </td>
                <td class="py-4 px-6">จำนวนทั้งหมด</td>
                <td class="py-4 px-6"> {cat.perMonth?.count} </td>
                <td class="py-4 px-6">ตัว</td>
              </tr>
            </tfoot>



          </table>
        )}

      </div>


    </div >

  )

}









