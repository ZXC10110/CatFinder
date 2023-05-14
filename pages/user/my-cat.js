import { useSession, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Loading from '../../components/loading'
import catProfile1 from '../../public/index/cat-profile1.png'
import catProfile2 from '../../public/my-cat/cat-profile1.png'
import catProfile3 from '../../public/my-cat/cat-profile2.png'
import petIcon from '../../public/my-cat/pet-icon.png'
import Homecat from '../../components/homecat.js'
import HomecardCatprofile from '../../components/homecardcatprofile'
import Router from 'next/router';
import { supabase } from '../api/supabase'
import useSWR from 'swr'
import { getCookie } from 'cookies-next';
import { setCookie } from 'cookies-next';

const ConditionalWrapper = ({ condition }) => {
  return condition == null? (<></>) : (
    <HomecardCatprofile item={condition} />
  )
}


export default function MyCat() {

  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState(null)
  const [uid,setUid] = useState(null)
  
  useEffect(() => {
    catExample()
  }, [])
  

  const catExample = async () => {

    //fix user_id not stable
    var cookie = getCookie("supabase-auth-token")
    var token = cookie.split('"')[1]
    var{ data: { user:{id} },}= await supabase.auth.getUser(token)
    setUid(id)

    var raw = JSON.stringify({
      "login_id": id,
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
      let response = await fetch("/api/cat/userview/showmyCat", requestOptions);
      let data = await response.json();
      console.log("req : " + JSON.stringify(token));
      console.log("response : " + JSON.stringify(data[0].queue));
      setCat(data[0].queue)
    } finally {
      setLoading(false);
    }
  };

  const searchCat = async (e) => {
    var raw = JSON.stringify({ 
      "login_id" : uid,
      [e.target.searchBy.value] : e.target.searchBar.value,
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
      let response = await fetch("/api/cat/userview/showmyCat", requestOptions);
      let data = await response.json();
      console.log("response search : " + JSON.stringify(data[0].queue));
      setCat(data[0].queue)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <div>
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
            <a href="/user/form-adopt" className="flex rounded-lg bg-iris-80 text-white text-lg ml-[820px] mb-6 px-6 py-2 gap-3">
            <Image src={petIcon} placeholder="blur" />
            ขออุปการะแมว</a>
          </div>
          <div class="w-10/12 h-0.5 bg-gray-200 mt-3 mx-28" />

          <form onSubmit={searchCat} method="POST" class="lg:mx-28 lg:max-w-10/12">
              <div class="flex mt-9">
                <label class="block ml-44">
                  <select
                    type="search"
                    id="search-dropdown"
                    name="searchBy"
                    class="
                        w-[8rem]
                        block
                        rounded-l-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                        text-gray-500 
                        font-normal
                    "
                  >
                    <option value="" selected disabled hidden>โปรดเลือก</option>
                    <option value="status">สถานะ</option>
                    <option value="breed">สายพันธุ์</option>
                    <option value="color"> สี หรือ ลาย</option>
                    <option value="cat_id">รหัสแมว</option>
                  </select>
                </label>
                <div class="relative w-full mr-28">
                  <input
                    type="search"
                    id="search-dropdown"
                    name="searchBar"
                    class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="พิมพ์ค้นหาที่นี่"
                    required
                  />
                  <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-salmon rounded-r-lg border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                    </path>
                    </svg>
                  </button>
                </div>
              </div>  
            </form>

          <div className="grid grid-cols-3 justify-items-center gap-6 ml-24 mr-7 mt-9  lg:mx-auto lg:max-w-7xl">
            
            {cat?.map((item)=>(
              <>
                {/* {console.log(JSON.stringify(item))} */}
                  <ConditionalWrapper condition={item.cat_profile} />
                </>
            ))}
          </div>
        </div>
      )}
    </div>
  )

}
