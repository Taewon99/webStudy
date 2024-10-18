// id가 box인 객체 가져오기
let box = window.document.getElementById("box");
let position = 0;

function moveBox() {
  if (position < 200) {
    position += 1;
    box.style.left = position + "px";
  } else {
    position = 0;
    box.style.left = position + "px";
  }
  // 계속해서 moveBox() 불러주는 콜백함수 구현
  window.requestAnimationFrame(moveBox);
}

moveBox();
