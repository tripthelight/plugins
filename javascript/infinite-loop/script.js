/**
 * FUNCTIONS
 */

/**
 * 좌우 롤링되는 파트너 아이콘
 * 이 script는 이미지만의 롤링일 경우만 사용 가능
 * 롤링에 필요한 이미지가 많을 경우, html에 2group을 만들지 않고 1group만 만들고 싶을 때 사용
    1) image의 load 상태를 기다림
      - ***** 서버에 이미지가 없거나, html 파일에서 img 태그에 src가 없으면 error *****
      - iphone safari에서 load를 기다리지 않으면, 없는 이미지를 css animation으로 rolling 시키기 때문에 이상해짐
    2) 하나만 있는 .row 를 복사
    3) .row-inner 라는 div element를 만들고 .row 안에 .row-inner를 2개 append
 */
const infiniteRolling = {
  /**
   * currying function
   * @param {Function} _fn : 새로운 div와 .row-inner class를 받아서, 새로운 div 에 add class .row-inner 시키는 함수
   * @returns : _fn
   */
  rowInner: (_fn) => (_elem) => (_class) => _fn(_elem, _class),
  /**
   * .infiniteRolling > .row 를 받아서
   * .row-inner 라는 div를 만들고
   * .infiniteRolling > .row > img 들을 감싸게 함
   * infinite rolling을 위해 .row-inner는 2벌이 필요
   * 2벌 append가 완료되면 .row에 add class play
      - play class가 없으면 css animation이 실행 안됨
   * @param {object} _row : .infiniteRolling > .row element
   * @returns : resolve()
   */
  returnLoop: (_row) => {
    return new Promise((resolve, reject) => {
      const WRAP_EL = infiniteRolling.rowInner((_elem, _class) => {
        _elem.classList.add(_class);
        return _elem;
      })(document.createElement("div"))("row-inner");
      _row.querySelectorAll("img").forEach((_elem) => {
        _elem.parentElement.insertBefore(WRAP_EL, _elem);
        WRAP_EL.appendChild(_elem);
      });
      const ROW_INNER = _row.querySelector(".row-inner").cloneNode(true);
      _row.insertAdjacentHTML("beforeend", ROW_INNER.outerHTML);
      _row.classList.add("play");
      resolve();
    });
  },
  /**
   * .infiniteRolling > .row > img element를 받아서
   * load 성공: resolve | load 실패: reject
   * @param {object} _img : .infiniteRolling > .row > img element
   * @param {number} _idx : .infiniteRolling > .row > img index
   * @returns : resolve()
   */
  imgLoadSync: (_img, _idx) => {
    return new Promise((resolve, reject) => {
      if (!_img[_idx].getAttribute("src")) return reject("이미지에 src가 없습니다.");
      const IMG = new window.Image();
      IMG.src = _img[_idx].src;
      IMG.onload = () => resolve();
      IMG.onerror = () => reject("이미지가 서버에 없습니다.");
    });
  },
  /**
   * .infiniteRolling 안에 .row element를 받아서
   * .row의 이미지들을 하나씩 반복하면서 이미지를 보냄
   * 이미지가 없으면 rejcet
   * .row > image들의 length와 반복문 index가 같으면 resolve
   * @param {object} _row : .infiniteRolling > .row element
   * @returns : resolve()
   */
  rowLoadSync: (_row) => {
    return new Promise((resolve, reject) => {
      const ITEM_IMG = _row.querySelectorAll("img");
      if (!ITEM_IMG || ITEM_IMG.length < 1) return reject("안에 이미지가 없습니다.");
      for (let idx = 0, p = Promise.resolve(); idx < ITEM_IMG.length; idx++) {
        p = p
          .then(() => infiniteRolling.imgLoadSync(ITEM_IMG, idx))
          .then(() => {
            if (idx === ITEM_IMG.length - 1) return resolve();
          })
          .catch((_err) => reject(`${idx + 1}번째 ${_err}`));
      }
    });
  },
  /**
   * .infiniteRolling element를 받아서
   * .infiniteRolling의 .row length만큼 반복하면서 .row를 보냄
   * .row가 없으면 reject
   * .infiniteRolling > .row 의 lenght와 반복분의 index가 같으면 resolve
   * @param {object} _wrap : .infiniteRolling element
   * @returns : resolve()
   */
  wrapLoadSync: (_wrap) => {
    return new Promise((resolve, reject) => {
      const ROW = _wrap.querySelectorAll(".row");
      if (!ROW || ROW.length < 1) return reject("안에 .row가 없습니다.");
      for (let idx = 0, p = Promise.resolve(); idx < ROW.length; idx++) {
        p = p
          .then(() => infiniteRolling.rowLoadSync(ROW[idx]))
          .then(() => infiniteRolling.returnLoop(ROW[idx]))
          .then(() => {
            if (idx === ROW.length - 1) return resolve();
          })
          .catch((_err) => reject(`${idx + 1}번째 row에서 ${_err}`));
      }
    });
  },
  returnComn: () => {
    const ROLL_WRAP = document.querySelectorAll(".infiniteRolling");
    if (ROLL_WRAP.length < 1) return false;
    return ROLL_WRAP;
  },
  init: () => {
    if (!infiniteRolling.returnComn()) return;
    const ROLL_WRAP = infiniteRolling.returnComn();
    for (let idx = 0, p = Promise.resolve(); idx < ROLL_WRAP.length; idx++) {
      p = p.then(() => infiniteRolling.wrapLoadSync(ROLL_WRAP[idx])).catch((_err) => console.error(`${idx + 1}번째 infiniteRolling의 ${_err}`));
    }
  },
};

/**
 * DOCUMENT READY COMMON
 */
const comnInit = () => {
  infiniteRolling.init();
};
/**
 * DOCUMENT READY
 */
const readyComn = () => {
  if (document.readyState === "complete") comnInit();
};
document.onreadystatechange = readyComn;
