import request from '@/utils/request'

// 查询薪资管理列表
export function listSalary(query) {
  return request({
    url: '/finance/salary/list',
    method: 'get',
    params: query
  })
}

// 查询薪资管理详细
export function getSalary(id) {
  return request({
    url: '/finance/salary/' + id,
    method: 'get'
  })
}

// 新增薪资管理
export function addSalary(data) {
  return request({
    url: '/finance/salary',
    method: 'post',
    data: data
  })
}

// 修改薪资管理
export function updateSalary(data) {
  return request({
    url: '/finance/salary',
    method: 'put',
    data: data
  })
}

// 删除薪资管理
export function delSalary(id) {
  return request({
    url: '/finance/salary/' + id,
    method: 'delete'
  })
}
