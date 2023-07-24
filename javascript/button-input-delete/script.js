/**
 * FUNCTIONS
 */
/**
 * PC, Mobile, Tablet 에서 실행
 * input에 글 쓸 때 오른쪽 삭제 X버튼
    - input에 글 쓸 때 X버튼 활성
    - X버튼 클릭 시 X버튼이 위치한 input의 내용 제거
    - 내용 제거 후 X버튼 사라짐
 * input 의 parent element에 .ipt-type-del 클래스 추가 필요
 * @returns : null
 */
const inputTypeDel = {
  variable: { pc: 24, notPc: 18 },
  returnComn: () => {
    const IPT_DEL = document.querySelectorAll(".ipt-type-del");
    if (!IPT_DEL || IPT_DEL.length < 1) return false;
    return IPT_DEL;
  },
  delclickEvt: (_iptEl) => {
    if (_iptEl.value.length === 0) return;
    _iptEl.value = "";
    _iptEl.focus();
  },
  delState: (_this, _btnDel) => {
    const CURRENT_VAL = _this.value;
    if (CURRENT_VAL.length > 0) {
      _btnDel.classList.add("show");
      _btnDel.onclick = inputTypeDel.delclickEvt.bind(null, _this);
    } else {
      _btnDel.classList.remove("show");
    }
  },
  init: () => {
    if (!inputTypeDel.returnComn) return;
    const IPT_DEL = inputTypeDel.returnComn();

    for (let i = 0; i < IPT_DEL.length; i++) {
      const IPT = IPT_DEL[i].querySelector("input");
      const BTN_DEL = IPT_DEL[i].querySelector("button.del");
      if (IPT && BTN_DEL) {
        const POS_Y = IPT.offsetTop + IPT.clientHeight / 2 - (deviceState === "pc" ? inputTypeDel.variable.pc : inputTypeDel.variable.notPc) / 2;
        BTN_DEL.style.top = `${POS_Y}px`;
        IPT.onfocus = (_event) => {
          inputTypeDel.delState(_event.target, BTN_DEL);
        };
        IPT.oninput =
          IPT.onpaste =
          IPT.onchange =
            (_event) => {
              inputTypeDel.delState(_event.target, BTN_DEL);
            };
      }
    }
  },
  resize: () => {
    inputTypeDel.init();
  },
};

/**
 * DOCUMENT READY COMMON
 */
const comnInit = () => {
  inputTypeDel.init();
};
/**
 * DOCUMENT READY
 */
const readyComn = () => {
  if (document.readyState === "complete") comnInit();
};
document.onreadystatechange = readyComn;

/**
 * WINDOW RESIZE
 */
window.addEventListener("resize", () => {
  inputTypeDel.init();
});
