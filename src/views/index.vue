<script setup>
import {onMounted, ref} from 'vue'
import {getLeaveUser, getTotalUser} from '@/api/index.js'

const totalUser = ref(null) // 用 ref 变量存储员工总数
const leaveUser = ref(null) // 用 ref 变量存储离职员工数

// 获取用户总数
const fetchTotalUser = async () => {
  totalUser.value = await getTotalUser() // 赋值给 totalUser
}

// 获取离职员工数
const fetchLeaveUser = async () => {
  leaveUser.value = await getLeaveUser() // 赋值给 leaveUser
}

// 在组件挂载后执行
onMounted(() => {
  fetchTotalUser() // 调用获取员工总数的接口
  fetchLeaveUser() // 调用获取离职员工数的接口
})
</script>

<template>
  <div class="data-show">
    <!-- 新增用户信息牌的容器 -->
    <div class="user-cards">
      <!-- 显示总用户数 -->
      <div class="user-card">
        <span class="user-card-title">员工总数</span>
        <span class="user-card-value">{{ totalUser ?? '加载中...' }}</span>
      </div>

      <!-- 显示离职员工数 -->
      <div class="user-card">
        <span class="user-card-title">离职员工数</span>
        <span class="user-card-value">{{ leaveUser ?? '加载中...' }}</span>
      </div>
    </div>

    <!-- ECharts 图表容器 -->
    <div id="main"></div>
  </div>
</template>

<style scoped lang="scss">
/* 添加容器尺寸 */
.data-show {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}

/* 新增样式：用户信息牌容器，令两牌居中并排 */
.user-cards {
  display: flex;
  justify-content: center;
  gap: 20px; /* 两牌间隔20px */
  margin-bottom: 20px; /* 与下方图表保持间距 */
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a8fdb, #5566f2); /* 渐变色背景 */
  color: white;
  padding: 20px;
  border-radius: 12px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
  width: 260px; /* 设置固定宽度 */
  height: 160px; /* 设置固定高度 */
}

.user-card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.user-card-value {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
</style>
