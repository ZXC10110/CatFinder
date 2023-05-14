import Head from 'next/head'
import Image from 'next/image'
import printer from '../../public/print-formadopt/printer-success.png'

export default function PrintFormAdopt() {
    return (
        <div class="container">
            <Head>
                <title>Cat Finder</title>
                <meta name="description" content="create by eleven" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/*section 1*/}
            <div class="w-screen h-[18rem]">
                <p class="text-black text-[48px] font-normal text-center pt-[97px]">แบบฟอร์มขอรับอุปการะแมว</p>
                <p class="text-salmon text-[24px] font-normal text-center pt-[29px]">กรุณากด print เอกสารเพื่อไปยื่นกับทางเจ้าหน้าที่มูลนิธิ</p>
            </div>

            {/*section 2 */}
            <div class="w-screen h-[45rem] bg-light-salmon">
                <Image class="mx-auto pt-20" src={printer} placeholder="blur" />
                <p class="text-gray-500 text-normal text-2xl text-center pt-9">สร้างเอกสารสำเร็จ</p>
                <a href="/user/my-cat" className="flex rounded-full bg-salmon text-white font-normal text-lg mt-9 mx-auto pt-2 pl-5 w-36 h-12">
                    ออกจากหน้านี้</a>
            </div>
            <div class="w-screen h-[15rem]"></div>
        </div>
    )
}