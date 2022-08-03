class StorageUtil {
  setCache(key: any, value: any, localStorage = true) {
    if (localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else window.sessionStorage.setItem(key, JSON.stringify(value));
  }
  getCache(key: any, localStorage = true) {
    let value;
    if (localStorage) {
      value = window.localStorage.getItem(key);
    } else {
      value = window.sessionStorage.getItem(key);
    }

    if (value && value !== "undefined") {
      return JSON.parse(value);
    }
    return "";
  }
  clearCache() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
  clearUserCache() {
    window.localStorage.removeItem("isKeepPassword");
    window.localStorage.removeItem("AccountPassword");
  }
  loginOut(){
    window.sessionStorage.removeItem("userInfo");
    window.sessionStorage.removeItem("token");

  }
}
export default new StorageUtil();
