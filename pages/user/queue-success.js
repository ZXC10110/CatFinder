import Head from 'next/head'
import Image from 'next/image'
import iconCheck from '../../public/queue/icon-check.png'

export default function QueueSuccess() {
    return (
        <div class="container">
            <Head>
                <title>Cat Finder</title>
                <meta name="description" content="create by eleven" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/*section 1*/}
            <div class="w-screen h-[171px]">
                <div class="flex my-8 mx-28">
                    <nav class="flex" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    หน้าแรก
                                </a>
                            </li>
                            <li aria-label="Breadcrumb">
                                <div class="flex items-center">
                                    <a href="/all-cat" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                        ค้นหาแมว
                                    </a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">จองคิวแมว</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
                <p class="text-4xl text-black font-normal mt-8 mx-28">จองคิวแมว</p>
                <div class="w-10/12 h-0.5 bg-gray-200 mt-8 mx-28" />
            </div>

            {/*section 2 */}
            <div class="w-screen h-[40rem] bg-light-salmon">
                <Image class="mx-auto pt-32" src={iconCheck} placeholder="blur" />
                <p class="text-gray-500 text-normal text-2xl text-center pt-9">จองคิวดูแมวเรียบร้อยแล้ว</p>
                <a href="/user/my-cat" className="flex rounded-full bg-salmon text-white font-normal text-lg mt-9 ml-[44rem] pt-2 pl-5 w-36 h-12">
                    ออกจากหน้านี้</a>
            </div>
            <div class="w-screen h-[15rem]"></div>
        </div>
    )
}