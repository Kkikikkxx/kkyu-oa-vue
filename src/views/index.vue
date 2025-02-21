<script setup>
import { onMounted, ref } from 'vue'
import { getLeaveUser, getTotalUser } from '@/api/index.js'

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
    <div class="user-cards">
      <div class="user-card total-card">
        <div class="decorative-circle"></div>
        <div class="card-icon">
          <!-- 团队图标 -->
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <span class="user-card-title">员工总数</span>
        <span class="user-card-value">{{ totalUser ?? '加载中...' }}</span>
        <div class="stat-trend">↑12% 同比上月</div>
      </div>

      <div class="user-card leave-card">
        <div class="decorative-circle"></div>
        <div class="card-icon">
          <!-- 离职图标 -->
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M13 7l5 5-5 5M6 17V7h5"/>
          </svg>
        </div>
        <span class="user-card-title">离职员工数</span>
        <span class="user-card-value">{{ leaveUser ?? '加载中...' }}</span>
        <div class="stat-trend">↓3% 同比上月</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-show {
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  background: #f5f7fa;
}

.user-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.user-card {
  position: relative;
  overflow: hidden;
  padding: 30px;
  border-radius: 16px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

    .decorative-circle {
      transform: scale(1.2);
    }
  }
}

.total-card {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.leave-card {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
}

.decorative-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -30px;
  right: -30px;
  transition: transform 0.3s ease;
}

/* 修改.card-icon样式 */
.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
}

.user-card-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.user-card-value {
  font-size: 32px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
}

.stat-trend {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-top: 12px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(5px);
}

@media (max-width: 768px) {
  .user-card {
    width: 100%;
    max-width: 400px;
  }

  .data-show {
    padding: 20px;
  }
}
</style>
