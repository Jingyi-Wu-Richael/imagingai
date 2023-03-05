import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/login/',
    method: 'post',
    data
  })
}

export function signup(data) {
  return request({
    url: '/signup/',
    method: 'post',
    data
  })
}

// {
//   "projectID": "",
//   "dataFileID": "",
//   "addTime": null,
//   "image": "http://127.0.0.1:8000/MedImgAI/SaveImage_temp/BRATS_059.nii.gz"
// }
export function uploadFile(data) {
  return request({
    url: '/upload/',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function implement(data) {
  return request({
    url: '/implement/',
    method: 'post',
    data
  })
}

export function filterApi(data) {
  return request({
    url: '/filter/',
    method: 'post',
    data
  })
}

export function previewApi(data) {
  return request({
    url: `/preview/${data.projectID}/${data.dataFileID}`,
    method: 'get',
    // responseType: "blob"
    responseType: 'arraybuffer'
  })
}

export function preview3D(data) {
  return request({
    url: `/preview3D/${data.projectID}/${data.dataFileID}`,
    method: 'get',
  })
}



export function teamCreate(data) {
  return request({
    url: "/team/create/",
    method: 'post',
    data
  })
}




export function teamSearch(data) {
  // console.log(data.get('token'));
  return request({
    url: `/team/search/${data}`,
    method: 'get',
    data: data
  })
}


// export function getTeams(token) {
//   return request({
//     url: `/team/show?token=${token}`,
//     method: 'post',
//   })
// }
export function getTeams(data) {
  // console.log(data.get('token'));
  return request({
    url: `/team/show/`,
    method: 'post',
    data: data
  })
}

export function joinTeams(data) {
  // console.log(data.get('token'));
  return request({
    url: `/team/join/`,
    method: 'post',
    data: data
  })
}


export function modifyTeam(data) {
  return request({
    url: `/team/modify/`,
    method: 'post',
    data: data
  })
}

// project

export function projectCreate(data) {
  return request({
    url: "/project/create/",
    method: 'post',
    data
  })
}

export function showProject(data) {
  return request({
    url: "/project/show/",
    method: 'post',
    data
  })
}


export function showDatabase(data) {
  return request({
    url: "/database/show/",
    method: 'post',
    data
  })
}





export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
