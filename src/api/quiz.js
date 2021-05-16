import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/quiz/all',
    method: 'get'
  })
}