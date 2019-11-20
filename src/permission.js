import router from './router'
import { getUserInfo } from "./utils/user"

router.beforeEach(async (to, from, next) => {
    
    if (getUserInfo()){
        if (to.path === "/login") {
            next("/")
        }else{
            next()
        }
    }else{
        if (to.path === "/login"){
            next()
        }else{
            next("/login")
        }
    }
})
