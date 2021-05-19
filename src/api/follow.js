import request from '@/utils/request'

// 关注
export function follow(id) {
  return request(({
    url: `/relationship/subscribe/${id}`,
    method: 'get'
  }))
}

// 取消关注
export function unFollow(id) {
  return request(({
    url: `/relationship/unsubscribe/${id}`,
    method: 'get'
  }))
}

// 验证是否关注
export function hasFollow(topicUserId) {
  return request(({
    url: `/relationship/validate/${topicUserId}`,
    method: 'get'
  }))
}

//粉丝页面
export function getInfoById(id) {
  return request({
    url: '/follow/' + id,
    method: 'get',
    // params: {
    //   pageNo: current,
    //   size: size
    // }
  })
}

//粉丝页面
export function getInfoById2(id) {
  return request({
    url: `/follow/validate/${id}`,
    method: 'get',
    // params: {
    //   pageNo: current,
    //   size: size
    // }
  })
}