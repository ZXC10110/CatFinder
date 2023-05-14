import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Loading from "../../../components/loading";
import Catprofile from "../../../components/catprofile";
import Catdetail from "../../../components/catdetail";
import Router from 'next/router';
import { supabase } from '../../api/supabase'
import { getCookie } from 'cookies-next';

const ConditionalWrapper = ({ condition, id, name, shelter, day, time, place, queue_id, uid }) => {

    const delQueue = async() => {
      var raw = JSON.stringify({
        "queue_id":queue_id,
        "login_id": uid
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
 
      let response = await fetch("/api/queue/deleteQueue", requestOptions);
      let data = await response.json();
      console.log("response : " + JSON.stringify(data));
    }

    return condition == null? (
        <div class="grid mb-8 md:place-content-end md:mr-20">
          <button type="button" onClick={()=>Router.push({
              pathname: '/user/queue',
              query: { id: id, name: name, shelter: shelter },
          })}  
          class="rounded-[4px] bg-salmon text-[18px] text-white font-normal text-center py-2.5 px-5 mt-8 mr-7">
            จองคิวดูแมว
          </button>
        </div>
    ) : (
        <div class="grid mb-8 md:place-content-end md:mr-20">
          <h4 class="text-iris pb-1">รายละเอียดการจอง</h4>
          <h5>วัน : {day}</h5>
          <h5>เวลา : {time}</h5>
          <h5>สถานที่ : {place}</h5>
          <button type="button" class="rounded-[4px] bg-gray-400 text-[18px] text-white font-normal text-center py-2.5 px-5 mt-8 mr-7">จองคิวดูแมว</button>
          <button type="button" onClick={()=>delQueue()} class="text-[18px] text-error underline font-normal text-center py-0 px-5 mt-2 mr-7">ยกเลิกคิว</button>
        </div>
    )
};

export default function CatProfile() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const user = useUser()
  const session = useSession()
  const [cat, setCat] = useState(null)
  const [uid, setUid] = useState(null);
  
  const mock = { 
    name:"มะลิ", pic:"https://images.unsplash.com/photo-1615789591457-74a63395c990", vaccine:true, sterile:true,bank:["กสิกร 999-999-9999","กรุงไทย 888-888-888"],
    id: 1210, map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.810927024412!2d100.77565737605752!3d13.729894097798276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d664988a1bedf%3A0xcc678f180e221cd0!2sKing%20Mongkut&#39;s%20Institute%20of%20Technology%20Ladkrabang!5e0!3m2!1sen!2sth!4v1671191115547!5m2!1sen!2sth",
    detail:"แมวจรลายสลิดที่ชอบกินขนมแมวเลียเป็นชีวิตจิตใจ มีอาการบาดเจ็บที่ขาข้างซ้าย ชอบทำหน้าแปลกๆ และนอนกลิ้งไปมา", status:true,
    age:4.5, sex:"เพศเมีย", breed:"ไทย", color:"ขาวดำ", disease:"ไม่มี", hold:true, shelter:"มูลนิธิบ้านรักแมว",day: "22/12/2022", time : "10.00-11.00 น.", สถานที่ : "มูลนิธิบ้านรักแมว",queue_id :1,
  }

  
  useEffect(() => {
    console.log("login_id: "+user?.id)
    console.log("rout: "+JSON.stringify(router.query.id))
    catExample()
  }, [])


  const catExample = async () => {
    var cookie = getCookie("supabase-auth-token")
    var token = cookie.split('"')[1]
    var{ data: { user:{id} },}= await supabase.auth.getUser(token)
    setUid(id)

    var raw = JSON.stringify({
      "cat_id": router.query.id,
      "login_id": id
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
      let response = await fetch("/api/cat/userview/profileCat", requestOptions);
      let data = await response.json();
      console.log("response : " + JSON.stringify(data));
      setCat(data);
    } finally {
      setLoading(false);
    }
  }

  return (
  <div>
    {loading ? (
        <Loading/>
      ):(
      <div class="container min-h-[87vh] h-auto mx-auto max-w-6xl px-5 xl:px-0">
        <nav class="flex my-8" aria-label="Breadcrumb">
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
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">ค้นหาแมว</span>
              </div>
            </li>
          </ol>
        </nav>
        <hr class="border-1 border-gray-200"/>
        <Catprofile
          pic={cat[0].cat_picture}
          map = {mock.map}
          vaccine={cat[0].vaccine}
          sterile={cat[0].sterile}
          bank1={cat[0].shelter_profile?.donate_name1}
          donate_number1={cat[0].shelter_profile?.donate_number1}
          bank2={cat[0].shelter_profile?.donate_name2}
          donate_number2={cat[0].shelter_profile?.donate_number2}
        />

        {/*section2*/}
        <div class="flex flex-col max-w-md md:max-w-full mx-auto md:mx-0 md:flex-row justify-between text-gray-600">
          <Catdetail
            name = {cat[0].cat_name}
            id={cat[0].cat_id}
            detail={cat[0].detail} 
            age={cat[0].age}
            sex={cat[0].sex}
            breed={cat[0].breed}
            color={cat[0].color}
            disease={cat[0].congenital_disease}
          />
          <div class="md:basis-2/5 lg:border-l-2 lg:px-6">
            {!cat[0].status?(<></>):(
                <ConditionalWrapper condition={cat[0].queue[0]} id={cat[0].cat_id} name={cat[0].cat_name} shelter={cat[0].shelter_profile?.shelter_name} day={cat[0].queue[0]?.queue_date} time={cat[0].queue[0]?.queue_time} place={cat[0].shelter_profile?.address} queue_id={cat[0].queue[0]?.queue_id} uid={uid}/>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
