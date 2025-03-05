import request from '@/utils/request'

// 查询员工档案管理列表
export function listArchives(query) {
    return request({
        url: '/employee/archives/list',
        method: 'get',
        params: query
    })
}

// 查询员工档案管理详细
export function getArchives(employeeId) {
    return request({
        url: '/employee/archives/' + employeeId,
        method: 'get'
    })
}

// 新增员工档案管理
export function addArchives(data) {
    return request({
        url: '/employee/archives',
        method: 'post',
        data: data
    })
}

// 修改员工档案管理
export function updateArchives(data) {
    return request({
        url: '/employee/archives',
        method: 'put',
        data: data
    })
}

// 删除员工档案管理
export function delArchives(employeeId) {
    return request({
        url: '/employee/archives/' + employeeId,
        method: 'delete'
    })
}
