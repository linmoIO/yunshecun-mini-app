! function() {
  "use strict";
  const e = {
      GESANG: {
        memberCenterBg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/level1.png",
        defaultHeadImg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/touxiang.png"
      },
      LVRONGHAO: {
        memberCenterBg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/level2.png",
        defaultHeadImg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/touxiang1.png"
      },
      LIAN: {
        memberCenterBg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/level3.png",
        defaultHeadImg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/touxiang2.png"
      },
      JG: {
        memberCenterBg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/level4.png",
        defaultHeadImg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/touxiang3.png"
      },
      LRH: {
        memberCenterBg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/level2.png",
        defaultHeadImg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/touxiang1.png"
      },
      "LIAN-8": {
        memberCenterBg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/level3.png",
        defaultHeadImg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/touxiang2.png"
      }
    },
    n = {
      memberCenterBg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/level0.png",
      defaultHeadImg: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/touxiang.png"
    };
  exports.getMemberUI = s => (s && 0 == s.indexOf("JG") && (s = "JG"), s in e ? e[s] : n)
}();