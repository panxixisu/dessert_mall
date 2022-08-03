const loginAccountRules = {
  phonenumber: [
    {
      required: true,
      message: "账号不能为空~",
      trigger: "blur",
    },
    {
      pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
      message: "请输入正确账号~",
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请输入密码~", trigger: "blur" }],
};
const loginPhoneRules = {
  number: [
    {
      required: true,
      message: "手机号不能为空~",
      trigger: "blur",
    },
    {
      pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
      message: "请输入合法手机号",
      trigger: "blur",
    },
  ],
  verification_vode: [
    {
      required: true,
      trigger: "blur",
      message: "验证码不能为空~",
    },
  ],
};
export { loginAccountRules, loginPhoneRules };
