import Signin from '../../components/sigin'

export default function SignInUser() {
  return (
    <div class="h-auto">
        <div class="w-screen h-[20rem]">
            <p class="text-[48px] font-normal text-center pt-[7rem]">สมัครสมาชิก</p>
            <p class="text-[20px] font-normal text-center pt-2">สำหรับผู้รับอุปการะ</p>
        </div>
        <Signin role={1}/>
    </div>
  )
}