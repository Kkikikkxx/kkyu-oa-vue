import request from '@/utils/request'


// 查询所有员工人数
export function getTotalUser() {
  return request({
    url: '/index/totalUser',
    method: 'get'
  })
}

// 查询离职员工人数
export function getLeaveUser() {
  return request({
    url: '/index/leaveUser',
    method: 'get'
  })
}
