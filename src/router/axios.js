import axios from "axios";


axios.defaults.baseURL='/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000;
axios.defaults.validateStatus = function (status){
    return status>=100&&status<=511
}
axios.defaults.withCredentials = true


//response lj
axios.interceptors.response.use(
    res=>{
        //todo
        if(res.data!=null)
            return res
    }
)

export default axios