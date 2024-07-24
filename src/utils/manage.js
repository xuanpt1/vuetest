import request from "@/router/axios.js"

//登录页方法
//获取登录token
export function login(username,password){
    let data = {
        username: username,
        password: password
    }
    return request.post('/api/login',null,{
        params:data
    })
}

//群组页方法
//获取群组方法
export function getAllGroups(){
    return request.get('api/blogGroups/getAllGroups')
}
//新建群组方法
export function saveGroups(data){
    return request.post('api/blogGroups/saveGroup',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}
//删除群组方法
export function removeGroupById(data){
    return request.post('api/blogGroups/removeGroupById',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}
//添加群组feed方法
export function putRssSubByRurl(data){
    return request.post('api/blogGroups/putRssSubByRurl',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}


//管理页方法
//获取所有分类
export function getAllMetas(){
    return request.get('api/blogMetas/getAllMetas')
}
    //新增分类
export function saveMeta(data){
    return request.post('api/blogMetas/saveMeta',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}
    //删除分类
export function removeMetaById(data){
    return request.post('api/blogMetas/removeMetaById',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}

//获取文章
export function getAllContents(){
    return request.get('api/blogContents/getAllContents')
}
export function getContentById(id){
    let data = {
        cid: id
    }
    return request.post('/api/blogContents/getContentById',data)
}
//文章的修改和保存
export function saveContent(data){
    return request.post('api/blogContents/saveContent',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}
export function updateContent(data){
    return request.post('api/blogContents/updateContent',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}
export function removeContentById(data){
    return request.post('api/blogContents/removeContentById',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}

//获取所有评论
export function getAllComments(){
    return request.get('api/blogComments/getAllComments',{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}
    //删除评论
export function removeCommentByCoid(data){
    return request.post('api/blogComments/removeCommentByCoid',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMjM1NjY4MCwiaWF0IjoxNzIxNzUxODgwLCJqdGkiOiIxNGY1ZWRhMC1hYTNmLTQwMmEtYTFiZC1mM2FkOGFlNjVkOGMiLCJhdXRob3JpdGllcyI6W119.W_K42TT1-hg4NI8TgbHd5yC8uuZdHDL0C04O1pe1f8o'
        }
    })
}

//获取站点配置
export function getOptionByName(name){
    let data = {
        name: name,
    }
    return request.post('api/blogOptions/getOptionByName',data,{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}

//rid 测试
export function getAllRssContents(){
    return request.get('api/blogRssContents/getAllRssContents',{
        headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoieHVhbnB0MiIsImV4cCI6MTcyMTk3ODEzNCwiaWF0IjoxNzIxMzczMzM0LCJqdGkiOiIzOWIyZDBlNy0xOTdjLTQ1ZmQtYmMzYS1kODMxN2EwNjFhOWIiLCJhdXRob3JpdGllcyI6W119.FVOoCqgnurKlYR4KryfUXEPv6xo7LtvygpULqPvaEag'
        }
    })
}


