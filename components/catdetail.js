export default function Catdetail({ name, id, detail, age, sex, breed, color, disease}) {
    return (
        <div class="md:basis-3/5">
            <p class="text-[30px] text-salmon font-medium">{name} (#{id})</p>
            <div class="max-w-xl my-8">
              <h4>{detail}</h4>
            </div>
            <p class="text-[20px] font-medium">รายละเอียด</p>
            <div class="m-5">
              <h4>อายุ : {age} ปี</h4>
              <h4>เพศ : {sex}</h4>
              <h4>สายพันธุ์ : {breed}</h4>
              <h4>สี หรือ ลาย : {color}</h4>
              <h4>โรคประจำตัว : {disease}</h4>
            </div>
        </div>
    )
}