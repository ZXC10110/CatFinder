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
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Loading from '../../components/loading'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function MyCat() {
  const [cat, setCat] = useState(null)
  const [currentpage, setCurrentpage] = useState([0, 1, 2]);
  const [searchBy, setSearchBy] = useState(null);
  const [searchBar, setSearchBar] = useState(null);
  const [uid,setUid] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    catExample()
  }, [])

  const catExample = async () => {

    var cookie = getCookie("supabase-auth-token")
    var token = cookie.split('"')[1]
    var{ data: { user:{id} },}= await supabase.auth.getUser(token)
    setUid(id)

    var raw = JSON.stringify({
      // "login_id": "fadadb65-080e-4be8-a3dc-163df80e0918",
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
      let response = await fetch("/api/cat/shelterview/myCatShelterview", requestOptions);
      let data = await response.json();
      console.log("response : " + JSON.stringify(data));
      setCat(data)
    } finally {
      setLoading(false);
    }
  };

  const searchCat = async (e) => {
    setSearchBy(e.target.searchBy.value)
    setSearchBar(e.target.searchBar.value)
    setCurrentpage([0,1,2])
    var raw = JSON.stringify({ 
      "login_id": uid,
      "page_number" : 1,
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
      let response = await fetch("/api/cat/shelterview/myCatShelterview", requestOptions);
      let data = await response.json();
      console.log("response : " + JSON.stringify(data));
      setCat(data)
    } finally {
      setLoading(false);
    }
  };

  const searchPage = async (nextPage) => {
    if (nextPage == 0) {
      nextPage = 1;
    }

    setCurrentpage([nextPage - 1, nextPage, nextPage + 1])

    var raw = JSON.stringify({ 
      "login_id": uid,
      "page_number" : nextPage,
      [searchBy] : searchBar,
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
    <div>
      {loading ? (
        <Loading />
      ) : (
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
              <a class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 ">แมวของฉัน</span>
              </a>
            </div>
          </li>
        </ol>
      </nav>


      <div class="button-hidden flex mt-8">

        <p class="text-4xl text-black font-normal mb-8">แมวของฉัน</p>

        <Menu as="div" className="
        relative 
        inline-block 
        text-left 
        md:ml-auto
        lg:ml-auto
        px-8
        ">
          <div>
            <Menu.Button className="inline-flex 
            w-full 
            justify-center
             rounded-md 
             border border-gray-300 
             bg-iris-20
             px-3 py-2
             text-sm text-iris
             shadow-sm hover:bg-iris-20
             hover:border hover:border-iris
             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="3 0 30 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>

              เลือกดูรายงาน
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/shelter/report-all"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      ยอดทั้งหมด
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/shelter/report-month"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      ยอดรายเดือน
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/shelter/report-daily"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      ยอดรายวัน
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>


        <a href="/shelter/add-cat">
          <button
            type="button"
            class="
                button-hidden 
                h-10
                md:ml-auto
                lg:ml-auto
                bg-salmon hover:bg-red-300
                text-white font-medium 
                py-2 px-4 gap-3 
                rounded inline-flex items-center"
            style={{ '@media print': { display: 'none' } }}>
            <span>+ เพิ่มแมว</span>
          </button></a>


      </div>

      <hr class="button-hidden border-1 border-gray-200 mb-8" />


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



      <div class="h-[35rem]">
        <div class="h-auto rounded-lg drop-shadow-md bg-gray-50 ml-28 mr-28 mt-5 border-2 border-gray-200 ">
          {/*<div class="flex text-gray-500 font-normal pt-3 pl-7 space-x-[28rem]">*/}
          <div class="flex text-gray-500 text-sm font-normal pt-2 pb-1">
            <div class="w-[25rem] pl-7">
              <p class=" ">ชื่อ</p>
            </div>
            <div class="w-[15em]">
              <p>สายพันธุ์</p>
            </div>
            <div class="w-[5rem] ml-7">
              <p>สถานะ</p>
            </div>
            <div class="w-[13rem]"></div>
          </div>
          
          {cat?.map((item) => (
            <div class="flex h-auto">
              <div class="flex w-[25rem] bg-white border-b border-gray-200 font-normal text-sm">
                <div class="mt-auto mb-auto ml-4 w-10 h-10 bg-center bg-cover rounded-full" style={{ "background-image": "url(" + item.cat_picture + ")" }} />
                <div class="py-3 pl-2">
                  <p class="text-gray-900 text-base">{item.cat_name} <>(#</>{item.cat_id}<>)</></p>
                  <p class="text-gray-500 text-xs">วันเข้าระบบ : {item.create_date}</p>
                </div>
              </div>
              <div class="flex w-[15rem] bg-white border-gray-200 border-b font-normal text-sm">
                <div class="">
                  <p class="text-gray-900 text-base">{item.breed}</p>
                  <p class="text-gray-500 text-xs">{item.sex}</p>
                </div>
              </div>
              <div class="flex w-[5rem] bg-white border-gray-200 border-b">
                {
                  item.status ? (<p class="w-9 h-7 bg-green-200 rounded-[32px] my-auto text-sm text-green-600 font-medium text-center pt-1">ว่าง</p>) :
                    (<p class="w-9 h-7 bg-red-200 rounded-[32px] my-auto text-sm text-red-600 font-medium text-center pt-1">มีบ้าน</p>)
                }
              </div>
              <div class="flex w-[13rem] bg-white border-b border-gray-200 ">
                <button type="button" onClick={() => Router.push({ pathname: "/shelter/cat/" + item.cat_id, })} class="text-sm text-indigo-600 font-normal ml-28">Edit</button>
              </div>
            </div>
          ))}

        </div>
      </div>

      <div class="flex w-[20rem] h-12 my-24 rounded-lg border-2 border-paw font-normal text-base text-paw mx-auto px-4 space-x-5">
        <button type="button" class="flex" onClick={() => searchPage(currentpage[0])}>
          <Image class="pt-3" src={previousIcon} placeholder="blur"></Image>
          <p class="pl-3 pt-3"> Previous   </p>
        </button>
        <p class="pt-3"> {(currentpage[0] != 0) ? (<>{currentpage[0]}</>) : (<></>)} </p>
        <p class="pt-3 text-salmon"> {currentpage[1]} </p>
        <p class="pt-3"> {currentpage[2]} </p>
        <button type="button" class="flex" onClick={() => searchPage(currentpage[2])}>
          <p class="pr-3 pt-3">   Next </p>
          <Image class="pt-4" src={nextIcon} placeholder="blur"></Image>
        </button>
      </div>
    </div >
      )}
    </div>
  )
}








