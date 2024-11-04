function onLoad() {
  carousel();
  pattern_search();
  function carousel() {
    let slideshow = document.querySelector(".slideshow");
    let slideshow_slides = document.querySelector(".slides");
    let slidesArray = document.querySelectorAll(".slides a");
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let indicatorArray = document.querySelectorAll(".slideshow_indicator a");

    let currentIndex = 0;
    let timerID = null;
    let slideCount = slidesArray.length;

    for (let i = 0; i < slideCount; i++) {
      let newLeft = `${i * 100}%`;
      slidesArray[i].style.left = newLeft;
    }

    function gotoslide(index) {
      currentIndex = index;
      let newLeft = `${index * -100}%`;
      slideshow_slides.style.left = newLeft;

      for (let i = 0; i < slideCount; i++) {
        indicatorArray[i].classList.remove("active");
      }
      indicatorArray[index].classList.add("active");
    }

    gotoslide(0);

    function startTimer() {
      timerID = setInterval(() => {
        let index = (currentIndex + 1) % slideCount;
        currentIndex = index;
        gotoslide(index);
      }, 3000);
    }
    startTimer();

    slideshow_slides.addEventListener("mouseenter", (event) => {
      clearInterval(timerID);
    });
    slideshow_slides.addEventListener("mouseleave", (event) => {
      startTimer();
    });
    prev.addEventListener("mouseenter", (event) => {
      clearInterval(timerID);
    });
    prev.addEventListener("mouseleave", (event) => {
      startTimer();
    });
    next.addEventListener("mouseenter", (event) => {
      clearInterval(timerID);
    });
    next.addEventListener("mouseleave", (event) => {
      startTimer();
    });

    prev.addEventListener("click", (event) => {
      event.preventDefault();
      currentIndex = currentIndex - 1;
      if (currentIndex < 0) {
        currentIndex = slideCount - 1;
      }
      gotoslide(currentIndex);
    });
    next.addEventListener("click", (event) => {
      event.preventDefault();
      currentIndex = currentIndex + 1;
      if (currentIndex > slideCount - 1) {
        currentIndex = 0;
      }
      gotoslide(currentIndex);
    });

    for (let i = 0; i < slideCount; i++) {
      indicatorArray[i].addEventListener("click", (event) => {
        event.preventDefault();
        gotoslide(i);
      });
    }

    indicatorArray.forEach((obj) => {
      obj.addEventListener("mouseenter", (event) => {
        clearInterval(timerID);
      });
    });

    for (let i = 0; i < slideCount; i++) {
      indicatorArray[i].addEventListener("mouseleave", (event) => {
        startTimer();
      });
    }
  }
  function patternSearch() {
    // 정규식 패턴 정의
    const idPattern = /^[\w]{3,}$/;
    const pwdPattern = /^[\w]{6,10}$/;
    const namePattern = /^[가-힣]{2,4}|[A-Z]{1}[a-zA-Z\x20]{1,19}$/;
    const emailPattern = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    const mobilePattern = /^010-(?:[\d]{3}|[\d]{4})-[\d]{4}$/;

    // 입력 필드 객체 찾기
    const inputID = document.querySelector("#id");
    const inputPW1 = document.querySelector("#pwd");
    const inputPW2 = document.querySelector("#re_pwd");
    const inputName = document.querySelector("#name");
    const inputEmail = document.querySelector("#confirm_mail");
    const inputMobile = document.querySelector("#confirm_mail");
    const myForm = document.querySelector(".account_info");

    // 검증 함수 정의
    function validate(input, pattern, message) {
      const errorMessage = input.nextElementSibling;
      if (pattern.test(input.value)) {
        errorMessage.textContent = "";
        return true;
      } else {
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
        return false;
      }
    }

    // 패스워드 재확인 검증
    function validatePasswordConfirmation() {
      const errorMessage = inputPW2.nextElementSibling;
      if (inputPW1.value === inputPW2.value) {
        errorMessage.textContent = "";
        return true;
      } else {
        errorMessage.textContent = "패스워드가 일치하지 않습니다.";
        errorMessage.style.color = "red";
        return false;
      }
    }

    // 폼 제출 이벤트 핸들러
    myForm.addEventListener("submit", (event) => {
      event.preventDefault(); // 폼 제출 방지

      // 각 필드에 대해 검증 수행
      const isIDValid = validate(
        inputID,
        idPattern,
        "아이디는 영문자, 숫자, _ 만 입력 가능하며 최소 3자 이상이어야 합니다."
      );
      const isPW1Valid = validate(
        inputPW1,
        pwdPattern,
        "비밀번호는 영문자, 숫자, _ 포함 6~10자 여야 합니다."
      );
      const isPW2Valid = validatePasswordConfirmation();
      const isNameValid = validate(
        inputName,
        namePattern,
        "이름은 한글 2~4자, 영문 2~10자 (첫 글자 대문자) 여야 합니다."
      );
      const isEmailValid = validate(
        inputEmail,
        emailPattern,
        "이메일 형식이 맞지 않습니다."
      );
      const isMobileValid = validate(
        inputMobile,
        mobilePattern,
        "휴대전화 번호 형식이 맞지 않습니다."
      );

      // 모든 필드가 유효할 때만 폼 제출
      if (
        isIDValid &&
        isPW1Valid &&
        isPW2Valid &&
        isNameValid &&
        isEmailValid &&
        isMobileValid
      ) {
        alert("모든 정보가 유효합니다. 폼을 제출합니다.");
        myForm.submit();
      }
    });
  }
}
