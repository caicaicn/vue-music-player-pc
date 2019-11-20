export const setUserInfo = (userInfo) => {
    if (userInfo && userInfo.token){
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    }
}
export const getUserInfo = () => {
    return sessionStorage.getItem("userInfo")
}

export const removeUserInfo = () => {
    return sessionStorage.removeItem("userInfo")
}

