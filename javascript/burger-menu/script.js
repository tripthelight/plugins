/**
 * FUNCTIONS
 */

/**
 * DOCUMENT READY COMMON
 */
const comnInit = () => {
  console.log("111");
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
window.addEventListener("resize", function () {});
