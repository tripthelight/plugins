let deviceState = "";
function deviceCheck() {
  const TABLET_REGEX = /iPad|Android(?!.*Mobile)/;
  const MOBILE_REGEX = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const USER_AGENT = navigator.userAgent;

  const deviceSize = {
    pc: function () {
      /**
       * 0 ~ 768 : mobile
       * 769 ~ 1024 : tablet
       * 1024 ~ : pc
       */
      if (window.innerWidth < 1024 && window.innerWidth > 768) {
        deviceState = "tablet";
        document.body.classList.remove("pc");
        document.body.classList.remove("mobile");
        document.body.classList.add("tablet");
      } else if (window.innerWidth <= 768) {
        deviceState = "mobile";
        document.body.classList.remove("pc");
        document.body.classList.remove("tablet");
        document.body.classList.add("mobile");
      } else {
        deviceState = "pc";
        document.body.classList.remove("tablet");
        document.body.classList.remove("mobile");
        document.body.classList.add("pc");
      }
    },
    tablet: function () {
      deviceState = "tablet";
      document.body.classList.remove("pc");
      document.body.classList.remove("mobile");
      document.body.classList.add("tablet");
    },
    mobile: function () {
      deviceState = "mobile";
      document.body.classList.remove("pc");
      document.body.classList.remove("tablet");
      document.body.classList.add("mobile");
    },
  };

  if (TABLET_REGEX.test(USER_AGENT) || MOBILE_REGEX.test(USER_AGENT)) {
    document.body.classList.add("not-pc");
    if (TABLET_REGEX.test(USER_AGENT)) {
      deviceSize.tablet();
    } else if (MOBILE_REGEX.test(USER_AGENT)) {
      deviceSize.mobile();
    }
  } else {
    document.body.classList.remove("not-pc");
    deviceSize.pc();
  }
}

(function () {
  deviceCheck();
})();

window.addEventListener("resize", function () {
  deviceCheck();
});
