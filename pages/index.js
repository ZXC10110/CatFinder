import Head from 'next/head'
import Image from 'next/image'
import profilePic from '../public/index/cat.png'
import catpaws from '../public/index/cat-paws.png'
import tickSquare from '../public/index/tick-square.png'
import vectorHome from '../public/index/vector-home.png'
import group1 from '../public/index/group-1.png'
import group2 from '../public/index/group-2.png'
import group3 from '../public/index/group-3.png'
import vectorArrow from '../public/index/vector-arrow.png'
import heart from '../public/index/heart.png'
import catProfileAdopt1 from '../public/index/cat-profile-adopt1.png'
import catProfileAdopt2 from '../public/index/cat-profile-adopt2.png'
import catProfileAdopt3 from '../public/index/cat-profile-adopt3.png'
import catProfileAdopt4 from '../public/index/cat-profile-adopt4.png'
import catProfileAdopt5 from '../public/index/cat-profile-adopt5.png'
import catProfileAdopt6 from '../public/index/cat-profile-adopt6.png'
import Homecard from '../components/homecard'
import HomecardCatprofile from '../components/homecardcatprofile.js'
import { useEffect, useState } from 'react'
import Loading from '../components/loading'
import Router from 'next/router';

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState([1, 2, 3])
  useEffect(() => {
    catExample()
    setLoading(false)
  }, [])

  const catExample = async () => {
    var raw = JSON.stringify({
      "number": 3

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
      let response = await fetch("/api/cat/homepageCat", requestOptions);
      let data = await response.json();
      console.log("response : " + JSON.stringify(data));
      setCat(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container">
      <Head>
        <title>Cat Finder</title>
        <meta name="description" content="create by eleven" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <div class="container">

          {/*section 1*/}
          <div class="w-screen h-[35rem] text-zinc-700">
            <p class="absolute pt-[131px] ml-[84px] text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-bright-salmon via-bright-salmon to-salmon">Cat Finder</p>
            <div class="flex pt-[208px] ml-[85px]  font-medium ">
              <p class="text-[36px] mt-3"> ร่วมเป็น</p>
              <p class="px-5 text-[48px]  mt-0 text-transparent bg-clip-text bg-gradient-to-b from-bright-salmon to-salmon">1</p>
              <p class="text-[36px] mt-3">ในการช่วยเหลือ</p>
            </div>
            <div class="flex ml-[85px] text-[36px] font-medium">
              <p>อุปการะ</p>
              <p class="text-salmon">น้องแมว</p>
              <p>จากมูลนิธิหรือสถานสงเคราะห์</p>
            </div>
            <div class="mx-[85px] mt-[50px] text-zinc-500">
              <table class="table-auto mb-20">
                <tr class="flex ">
                  <td class="flex border border-transparent pr-1">
                    <Image class="mr-5 " src={tickSquare} placeholder="blur" />
                    รวมมูลนิธิและสถานสงเคราะห์มากมาย
                  </td>
                  <td class="flex border border-transparent pl-1 pr-1">
                    <Image class="mx-5 " src={tickSquare} placeholder="blur" />
                    บริจาคกับมูลนิธิหรือสถานสงเคราะห์ได้โดยตรง
                  </td>
                </tr>
                <tr class="flex">
                  <td class="flex border border-transparent pr-[55px]">
                    <Image class="mr-5 " src={tickSquare} placeholder="blur" />
                    ไม่มีค่าใช้จ่ายในการขออุปการะ
                  </td>
                  <td class="flex border border-transparent pl-1 pr-1">
                    <Image class="mx-5 " src={tickSquare} placeholder="blur" />
                    จองคิวดูน้องแมวกับทางมูลนิธิเพื่อขออุปการะ
                  </td>
                </tr>
              </table>
              <a href="/signin/user" class="rounded-lg bg-salmon text-white text-2xl mt-[52px] px-20 py-[8px]">สมัครสมาชิก</a>
            </div>
          </div>

          {/*section 2*/}
          <div class="w-screen h-[33rem]">
            <p class="text-center text-[36px] text-salmon pt-[24px]">ขั้นตอนรับเลี้ยง</p>
            <div class="flex space-x-10 place-content-center mt-6">
              <Homecard img={group1} topic="ค้นหา" detail="ค้นหาน้องแมวที่คุณต้องการช่วยเหลือจากมูลนิธิ" />
              <Homecard img={group2} topic="จองคิว" detail="จองคิวเพื่อนัดดูน้องแมวของคุณกับทางมูลนิธิหรือสงเคราะห์" />
              <Homecard img={group3} topic="รับเลี้ยง" detail="กรอกแบบฟอร์มเพื่อขอรับอุปการะโดยไม่มีค่าใช้จ่ายใดๆ" />
            </div>
          </div>

          {/*section 3*/}
          <div class="w-screen h-[43rem]">
            <div class="flex front-normal justify-evenly">
              <p class="text-[36px] text-gray-600 pt-[24px]">น้องแมวหาบ้าน</p>
              <a href="/all-cat" class="text-[24px] text-black mt-3 ml-[940px]">ค้นหาแมว</a>
              <a href="/all-cat"><Image class="w-[16px] h-[9.99px] mt-7 ml-[12px]" src={vectorArrow} placeholder="blur" /></a>
            </div>
            <div class="w-[1325px] h-[0.5px] bg-gray-200 opacity-75 mx-[100px] mt-[24px]" />
            <div class="w-[20px] h-[24px] opacity-75 mt-[24px]" />
            <div class="flex space-x-40 place-content-center ">
              {cat.map((item) => (
                <HomecardCatprofile item={item} />
              ))}
            </div>
          </div>

          {/*section 4*/}
          <div class="w-screen h-[28rem] grid grid-cols-2 divide-x-[3px] divide-salmon border-t-4 border-b-4 outline-[3px] border-salmon text-[36px] font-normal text-salmon text-center">
            <td class="pt-16">มูลนิธิที่ร่วมกับเรา
              <p class="text-8xl py-24">30</p>
            </td>
            <td class="pt-16">น้องแมวที่ได้รับการช่วยเหลือ
              <p class="text-8xl py-24">238</p>
            </td>
          </div>

          {/*section 5*/}
          <div class="w-screen h-[38rem] bg-light-salmon">
            <div class="flex">
              <td class="border border-transparent">
                <p class="text-[48px] text-normal text-transparent bg-clip-text bg-gradient-to-b from-bright-salmon via-bright-salmon to-salmon mx-[245px] pt-[107px]">ขอบคุณจากใจ</p>
                <p class="text-[20px] text-normal text-gray-500 mx-[175px] pt-[5px]">หนึ่งความช่วยเหลือของคุณหมายถึงชีวิตใหม่ของน้อง</p>
                <Image class="mx-[233px] pt-[35px]" src={heart} placeholder="blur" />
              </td>
              <div class="w-[508px] h-[38px] rounded-t-lg bg-gray-50 mx-20 mt-[65px] border-b border-gray-200">
                <div class="flex text-gray-500 font-normal pt-3">
                  <p class="text-[12px] pl-7">ชื่อแมว</p>
                  <p class="text-[14px] pl-[330px]">ผู้รับเลี้ยง</p>
                </div>
                <div class="flex w-[508px] h-[72px] bg-white border-b border-gray-200 font-normal text-[14px]">
                  <Image class="mx-7 my-4" src={catProfileAdopt1} placeholder="blur" />
                  <div class="py-4">
                    <p class="text-gray-900">ข้าวต้ม (#1203)</p>
                    <p class="text-gray-500">มูลนิธิคุณผึ้ง</p>
                  </div>
                  <p class="text-gray-500 pl-[200px] py-7">รวิ**</p>
                </div>
                <div class="flex w-[508px] h-[72px] bg-white border-b border-gray-200 font-normal text-[14px]">
                  <Image class="mx-7 my-4" src={catProfileAdopt2} placeholder="blur" />
                  <div class="py-4">
                    <p class="text-gray-900">สามสี (#1103)</p>
                    <p class="text-gray-500">มูลนิธิบ้านรักแมว</p>
                  </div>
                  <p class="text-gray-500 pl-[202px] py-7">สม**</p>
                </div>
                <div class="flex w-[508px] h-[72px] bg-white border-b border-gray-200 font-normal text-[14px]">
                  <Image class="mx-7 my-4" src={catProfileAdopt3} placeholder="blur" />
                  <div class="py-4">
                    <p class="text-gray-900">ผิงผิง (#903)</p>
                    <p class="text-gray-500">มูลนิธิบ้านรักแมว</p>
                  </div>
                  <p class="text-gray-500 pl-[206px] py-7">วิ**</p>
                </div>
                <div class="flex w-[508px] h-[72px] bg-white border-b border-gray-200 font-normal text-[14px]">
                  <Image class="mx-7 my-4" src={catProfileAdopt4} placeholder="blur" />
                  <div class="py-4">
                    <p class="text-gray-900">วันดี (#1123)</p>
                    <p class="text-gray-500">มูลนิธิคุณผึ้ง</p>
                  </div>
                  <p class="text-gray-500 pl-[220px] py-7">ภา**</p>
                </div>
                <div class="flex w-[508px] h-[72px] bg-white border-b border-gray-200 font-normal text-[14px]">
                  <Image class="mx-7 my-4" src={catProfileAdopt5} placeholder="blur" />
                  <div class="py-4">
                    <p class="text-gray-900">สำลี (#1920)</p>
                    <p class="text-gray-500">มูลนิธิแมวจรโชคด</p>
                  </div>
                  <p class="text-gray-500 pl-[200px] py-7">พิ**</p>
                </div>
                <div class="flex w-[508px] h-[72px] rounded-b-lg bg-white border-b border-gray-200 font-normal text-[14px]">
                  <Image class="mx-7 my-4" src={catProfileAdopt6} placeholder="blur" />
                  <div class="py-4">
                    <p class="text-gray-900">เจ้านาย (#1495)</p>
                    <p class="text-gray-500">มูลนิธิ Mister จร</p>
                  </div>
                  <p class="text-gray-500 pl-[200px] py-7">อร**</p>
                </div>
              </div>
            </div>
          </div>

          {/*section 6*/}
          <div class="w-screen h-[35rem] flex flex-col items-center">
            <p class="text-[40px] text-black/[0.8] font-medium text-center pt-[200px]">ยังมีน้องแมวที่ต้องการความรักจากคุณ</p>
            <a href="/signin/user" class="rounded-lg bg-salmon text-white text-2xl mt-[48px]  mx-auto px-20 py-[8px]">สมัครสมาชิก</a>
          </div>

          {/*img backgroud*/}
          <div class="w-screen">
            <Image class="absolute mt-24 top-20 left-0 -z-40 " src={vectorHome} placeholder="blur" />
            <Image class="absolute top-20 right-0 -z-50" src={profilePic} placeholder="blur" />
            <Image class="absolute w-28 h-36 top-[920px] left-48 -z-50" src={catpaws} placeholder="blur" />
            <Image class="absolute w-28 h-36 top-[920px] right-48 -z-50" src={catpaws} placeholder="blur" />
          </div>
        </div>
      )}
    </div>
  )
}
