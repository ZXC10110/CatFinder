export default function List(){
    return(
        <div class="container mx-auto h-auto my-36 flex justify-center">
            <div class="grid h-96 my-auto list-disc">
            <h1>Link ภายในเว็บ</h1>
            <li><a class="text-iris" href="/">หน้าแรก</a></li>
            <li><a class="text-iris" href="/all-cat">/all-cat</a> ค้นหาแมว</li>
            <li><a class="text-iris" href="/cat/1">/cat/id</a> ดูรายละเอียดแมวโดยคนที่ยังไม่เข้าสู่ระบบ</li>
            <h1>สำหรับคนที่ยังไม่เข้าสู่ระบบ</h1>
            <li><a class="text-iris" href="/signin/user">/signin/user</a> สมัครสมาชิกผู้อุปการะ</li>
            <li><a class="text-iris" href="/signin/shelter">/signin/shelter</a> สมัครสมาชิกมูลนิธิ</li>
            <h1>สำหรับมูลนิธิ</h1>
            <li><a class="text-iris" href="/shelter/shelter-form">/shelter/shelter-form</a> อัพเดทข้อมูลมูลนิธิ</li>
            <li><a class="text-iris" href="/shelter/add-cat">/shelter/add-cat</a> เพิ่มแมวโดยมูลนิธิ</li>
            <li><a class="text-iris" href="/shelter/my-cat">/shelter/my-cat</a> แมวของมูลนิธิ</li>
            <li><a class="text-iris" href="/shelter/cat/1">/shelter/cat/1</a> อัพเดทสถานะแมวโดยมูลนิธิ</li>
            <li><a class="text-iris" href="/shelter/report-all">/shelter/report-all</a> รายงานการอุปการะแมวทั้งหมด</li>
            <li><a class="text-iris" href="/shelter/report-daily">/shelter/report-daily</a> รายงานการอุปการะแมวรายวัน</li>
            <li><a class="text-iris" href="/shelter/report-month">/shelter/report-month</a> รายงานการอุปการะแมวรายเดือน</li>
            <h1>สำหรับผู้ใช้</h1>
            <li><a class="text-iris" href="/user/cat/1">/user/cat/1</a> ดูรายละเอียดแมวและคิวของแมวโดยผู้ใช้</li>
            <li><a class="text-iris" href="http://localhost:3000/user/queue?id=143&name=%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%99&shelter=%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B9%81%E0%B8%A1%E0%B8%A7">/user/queue</a> จองคิวแมวโดยผู้ใช้</li>
            <li><a class="text-iris" href="/user/my-cat">/user/my-cat</a> ดูแมวที่จองคิวไว้ของผู้ใช้</li>
            <li><a class="text-iris" href="/user/form-adopt">/user/form-adopt</a> ขออุปการะแมว</li>
            <h1>เพิ่มเติม</h1>
            <li><a class="text-iris" href="/api-doc">/api-doc</a> swagger api document</li>
            </div>
        </div>
    )
}