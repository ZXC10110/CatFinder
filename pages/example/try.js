import Image from 'next/image'
import profilePic from '../public/index/cat.png'
import tickSquare from '../public/index/tick-square.png'
import vectorHome from '../public/index/vector-home.png'
import group1 from '../public/index/group-1.png'
import Homecard from '../../components/homecard'
import { useEffect, useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(true)
  useEffect(() => setLoading(false), [])
  
  return (
    <div class="container">
      {loading ? (
        <div>loading</div>
      ):(
        <div class="container">

          {/*section 1*/}
          <div class="w-screen h-[35rem] text-zinc-700">
            <p class="absolute pt-[131px] ml-[84px] text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-bright-salmon via-bright-salmon to-bright-light-salmon">Cat Fider</p>
            <div class="flex pt-[208px] ml-[85px]  font-medium ">
              <p class="text-[36px] mt-3"> ร่วมเป็น</p>
              <p class="px-5 text-[48px]  mt-0 text-transparent bg-clip-text bg-gradient-to-b from-bright-salmon to-bright-light-salmon">1</p>
              <p class="text-[36px] mt-3">ในการช่วยเหลือ</p>
            </div>
            <div class="flex ml-[85px] text-[36px] font-medium">
              <p>อุปการะ</p>
              <p class="text-bright-light-salmon">น้องแมว</p>
              <p>จากมูลนิธิหรือสถานสงเคราะห์</p>
            </div>
            <div class="mx-[85px] mt-[50px] text-zinc-500">
              <table class="table-auto">
                <tr class="flex ">
                  <td class="flex border border-transparent pr-1">
                    <Image class="mr-5 " src={tickSquare} placeholder="blur"/>
                    รวมมูลนิธิและสถานสงเคราะห์มากมาย
                  </td>
                  <td class="flex border border-transparent pl-1 pr-1">
                    <Image class="mx-5 " src={tickSquare} placeholder="blur"/>
                    บริจาคกับมูลนิธิหรือสถานสงเคราะห์ได้โดยตรง
                  </td>
                </tr>
                <tr class="flex">
                  <td class="flex border border-transparent pr-[55px]">
                    <Image class="mr-5 " src={tickSquare} placeholder="blur"/>
                    ไม่มีค่าใช้จ่ายในการขออุปการะ
                  </td>
                  <td class="flex border border-transparent pl-1 pr-1">
                    <Image class="mx-5 " src={tickSquare} placeholder="blur"/>
                    จองคิวดูน้องแมวกับทางมูลนิธิเพื่อขออุปการะ
                  </td>
                </tr>
              </table>
              <button class="rounded-lg bg-bright-light-salmon text-white text-2xl mt-[52px] px-20 py-[8px]">สมัครสมาชิก</button>
            </div>
          </div>

          {/*section 2*/}
          <div class="w-screen h-[32rem]">
            <p class="text-center text-[36px] text-bright-light-salmon pt-[24px]">ขั้นตอนรับเลี้ยง</p>
            <div class="flex space-x-10 place-content-center mt-6">
              <Homecard img={group1} topic="ค้นหา" detail="ค้นหาน้องแมวที่คุณต้องการช่วยเหลือจากมูลนิธิ" />
              <Homecard img={group1} topic="จองคิว" detail="จองคิวเพื่อนัดดูน้องแมวของคุณกับทางมูลนิธิหรือสงเคราะห์" />
              <Homecard img={group1} topic="รับเลี้ยง" detail="กรอกแบบฟอร์มเพื่อขอรับอุปการะโดยไม่มีค่าใช้จ่ายใดๆ" />
            </div>
          </div>

          <div class="w-screen h-[32rem] bg-slate-400">03</div>
          <div class="w-screen h-[32rem]">04</div>
          <div class="w-screen h-[32rem] bg-slate-400">05</div>
          <div class="w-screen h-[32rem]">06</div>
          <div class="w-screen h-[32rem] bg-slate-400">07</div>

          {/*img backgroud*/}
          <div class="w-screen">
            <Image class="absolute mt-24 top-20 left-0 -z-40 object-none object-right" src={vectorHome} placeholder="blur"></Image>
            <Image class="absolute top-20 right-0 object-none object-right -z-50" src={profilePic} placeholder="blur"></Image>
          </div>
        </div>  
      )}
    </div>
  )
}