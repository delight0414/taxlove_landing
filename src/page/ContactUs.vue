<template>
  <CommonHeader />

  <form class="contact" @submit.prevent="handleSubmit">
      <div class="contact-title">
        <h3>도입 문의</h3>
        <p>
          <span class="red">*</span>표시는 필수로 입력해야하는 항목입니다.
        </p>

      </div>

      <div class="first_con">
        <h4>01. 기본정보를 입력해 주세요.<span class="red">*</span></h4>
        <div>
          <label for="name">
            <span>성함</span>
            <input 
            v-model="data.name"
            @keyup="lengthTrue"
            type="text" id="name" name="name" placeholder="성함을 입력해 주세요.">
          </label>

          <label for="num">
            <span>연락처</span>
            <input
            ref="inputNumber" 
            @keyup="checkValue($event,regTel)"
            v-model="data.num"
            type="tel" id="num" name="num" placeholder="연락처를 입력해 주세요. (숫자만 입력)">
            <!-- <span class="check_false">확인 후 다시 입력해 주세요.</span> -->
          </label>

          <label for="mail">
            <span>이메일</span>
            <input 
            @keyup="lengthTrue"
            v-model="data.mail"
            type="text" id="mail" name="mail" placeholder="이메일을 입력해 주세요">
            <!-- <span class="check_false">확인 후 다시 입력해 주세요.</span> -->
          </label>  
          <label for="company">
            <span>회사명</span>
            <input
            @keyup="lengthTrue"
            v-model="data.company"
            type="text" id="company" name = "company" placeholder="회사명을 입력해 주세요."> 
          </label>
        </div>
      </div>
      <div class="second_con">
        <h4>02. 문의내용을 입력해 주세요.<span class="red">*</span></h4>
        <textarea 
          @keyup="lengthTrue"
          v-model="data.content"
        id="content" name="content" placeholder="문의하시고자 하는 내용을 입력해 주세요."></textarea>
      </div>
      <div class="third_con">
        <h4>03. 개인정보처리방침 동의<span class="red">*</span></h4>
        <div class="con_text">
          <pre>
<h6>개인정보처리방침</h6>

<b>1. 개인정보 수집이용에 대한 동의</b>
고객님의 소중한 개인정보는 다음과 같은 정책에 따라 수집 및 이용됩니다.
비즈비에서는 해당 목적에 연관되는 개인정보만을 수집하며, 수집된 정보를 투명하고 안전하게 보호 관리할 것을 약속합니다. 
이에 개인정보 수집 및 이용에 대한 동의를 구합니다.

<b>2. 개인정보의 수집이용 목적</b>
목적: 상담요청에 대한 회신, 상담을 위한 서비스 이용기록 조회
수집항목: 문의종류, 문의사항, 회사, 성명, 연락처, 이메일

<b>3. 보존 이유</b>
회원님의 동의를 통한 정보유지

<b>4. 보존 기간</b>
회원정보 삭제 요청시까지
          </pre>
        </div>
        <div class="con_input">
          <label for="check">
            <input type="checkbox" id="check" v-model="data.privacyInput">
            <label for="check"></label>
            <span>개인정보 제공에 동의합니다.</span>
          </label>
        </div>
        
      </div>
      <div class="con_btn">
        <button 
        type="submit" class="submit_btn" >제출하기</button>
      </div>
    </form>
  <CommonFooter />

</template>
<style scoped lang="scss">

@import "@/assets/styles/_contact.scss"

</style>
<script setup lang="ts">
import CommonHeader from "@/components/CommonHeader.vue";
import CommonFooter from "@/components/CommonFooter.vue";
import { reactive, ref } from "vue"
import { useRouter } from 'vue-router'

const data = reactive({
  name: '',
  num: '',
  mail:'',
  company: '',
  content : '',
  privacyInput : false
})

const router = useRouter()

/* const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; */
const regTel =  /^[0-9]+$/



function lengthTrue(el:KeyboardEvent){
    const target = el.target as HTMLInputElement
    if(target.value.length >0){
      target.classList.add('check_true')
    }
    else{
      target.classList.remove('check_true')
    }
  }

function checkValue(el:KeyboardEvent,reg:RegExp){
    const checkReg = reg
    const target = el.target as HTMLInputElement
    
    if(checkReg.test(target.value)){
      target.classList.add('check_true')
      target.classList.remove('check_false')
      
    }
    else{
      target.classList.add('check_false')
      target.classList.remove('check_true')
    }
    if(target.value.length === 0){
      target.classList.remove('check_false')
      target.classList.remove('check_true')
    }
}

const inputNumber =ref<HTMLElement | null>(null)
const handleSubmit = () => {
  const form = new FormData();
  form.append('name', data.name);
  form.append('num', data.num);
  form.append('mail', data.mail);
  form.append('company', data.company);
  form.append('content', data.content);

    // 유효성 검사
    if(data.name.length=== 0){
      alert('이름을 입력해주세요.')
      return
    }
    else if( data.num.length === 0){
      alert('연락처를 입력해주세요.')
      return
    }
    else if(inputNumber.value?.classList.contains('check_false')){
      alert('연락처 확인 후 입력해주세요.')
      return
    }
    else if(data.mail.length === 0){
      alert('이메일을 입력해주세요.')
      return
    }

    else if(!data.privacyInput){
      alert('개인정보 처리방침에 동의해주세요.')
      return
  }

  const url = createUrl();

  fetch(url, {
    method: 'POST',
    body: form
  })
    .then(response => response.text())
    .then(data => {
      console.log('response data',data)
      if (data === 'send') {
        console.log('send')                 
        alert("문의 메일이 발송되었습니다.")
        router.push('')
        // location.reload()
      }
    })
    .catch(e => {
      console.error(e)       
      alert("문의 메일이 발송 실패")
    }) 
};

const createUrl = () => {
  if (location.origin.includes('localhost')) return 'https://api-www.bizbee.ne.kr/mail/taxlove';

  const keyword = /bizbee.co.kr$/.test(location.origin) ? 'api' : 'api-www';

  return `${location.origin.replace("www", keyword)}/mail/taxlove`;

  // if(/bizbee.co.kr$/.test(location.origin)) {
  //     url = location.origin.replace("www", "api") +'/mail' // www/localhost/mail/sb -> api/localhost/mail/sb
  //   }
  //   else {
  //     url = location.origin.replace("www", "api-www") +'/mail' // api-www/localhost/mail/sb
  //   }
}
</script>