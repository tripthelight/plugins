/**
 * FUNCTIONS
 */
const SIZE_EVENT = {
  returnComn: () => {
    const FLEX_BOX = document.querySelector(".flex-layout");
    if (!FLEX_BOX) return false;
    const BOX_INNER = FLEX_BOX.querySelector("ul");
    if (!BOX_INNER) return false;
    const LISTS = BOX_INNER.querySelectorAll("li");
    if (!LISTS || LISTS.length < 1) return false;
    return { FLEX_BOX, BOX_INNER, LISTS };
  },
  init: () => {
    if (!SIZE_EVENT.returnComn()) return;
    const { FLEX_BOX, BOX_INNER, LISTS } = SIZE_EVENT.returnComn();
    let res = 0;
    let tagArr = [];
    let cnt = 0;
    const TAG_LOOP = (_arr) => {
      // for (let j = 0; j < _arr.length; j++) {
      //   // _arr[j].style.flexGrow = 1;
      //   _arr[j].classList.add("flex");
      // }
      [..._arr].map((_list) => _list.classList.add("flex"));
    };
    for (let i = 0; i < LISTS.length; i++) {
      const W = LISTS[i].getBoundingClientRect().width;
      const ML = parseInt(getComputedStyle(LISTS[i]).marginLeft);
      const MR = parseInt(getComputedStyle(LISTS[i]).marginRight);
      const SIZE = W + ML + MR;
      res += SIZE;
      tagArr.push(LISTS[i]);
      if (res >= BOX_INNER.getBoundingClientRect().width) {
        tagArr.splice(tagArr.length - 1);
        TAG_LOOP(tagArr);
        res = SIZE;
        tagArr = [LISTS[i]];
        cnt += 1;
      }
      // tag의 총 width가 .faqTagBox의 width를 넘지 않을 경우
      if (i === LISTS.length - 1) {
        if (cnt === 0) {
          TAG_LOOP(tagArr);
        }
      }
    }
  },
  resize: () => {
    if (!SIZE_EVENT.returnComn()) return;
    const { FLEX_BOX, BOX_INNER, LISTS } = SIZE_EVENT.returnComn();
    SIZE_EVENT.removeTags(LISTS);
    SIZE_EVENT.init();
  },
  /**
   * 용도 : 
    - pc에서 브라우저 가로를 줄였다 늘렸다 할 때
    - tablet에서 resize 할 때
   * .tag를 받아서 flex-grow style 삭제
   * @param {object} _tags : a.tag 리스트 
   */
  removeTags: function (_tags) {
    // for (let i = 0; i < _tags.length; i++) {
    //   // _tags[i].style.removeProperty("flex-grow");
    //   _tags[i].classList.remove("flex");
    // }
    [..._tags].map((_list) => _list.classList.remove("flex"));
  },
};
/**
 * DOCUMENT READY COMMON
 */
const comnInit = () => {
  SIZE_EVENT.init();
};
/**
 * DOCUMENT READY
 */
const readyComn = () => {
  if (document.readyState === "complete") comnInit();
};
document.onreadystatechange = readyComn;

/**
 * DOCUMENT RESIZE
 */
window.addEventListener("resize", function () {
  SIZE_EVENT.resize();
});
