<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { getLeaveUser, getTotalUser } from '@/api/index.js'
import { listNotice } from '@/api/system/notice'

// 从 proxy 中获取字典数据（确保 useDict 方法可用）
const { proxy } = getCurrentInstance();
const { sys_notice_type, sys_notice_status } = proxy.useDict("sys_notice_type", "sys_notice_status")

// 定义 parseTime 函数（简单实现：格式化为 YYYY-MM-DD）
const parseTime = (time, cFormat) => {
  if (!time) return '';
  const date = new Date(time);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  return `${year}-${month}-${day}`;
}

// 员工数据
const totalUser = ref(null);
const leaveUser = ref(null);

// 获取员工总数
const fetchTotalUser = async () => {
  totalUser.value = await getTotalUser();
}

// 获取离职员工数
const fetchLeaveUser = async () => {
  leaveUser.value = await getLeaveUser();
}

// 公告数据
const noticeList = ref([]);
const noticeLoading = ref(true);

// 获取公告列表（根据接口返回的数据结构调整参数）
const fetchNoticeList = async () => {
  noticeLoading.value = true;
  const res = await listNotice({ pageNum: 1, pageSize: 10 });
  noticeList.value = res.rows || [];
  noticeLoading.value = false;
}

// 组件挂载后获取所有数据
onMounted(() => {
  fetchTotalUser();
  fetchLeaveUser();
  fetchNoticeList();
});
</script>

<template>
  <div class="data-show">
    <!-- 员工统计区域 -->
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
      </div>
    </div>

    <!-- 公告展示区域 -->
    <div class="notice-section">
      <h2 class="notice-section-title">公告展示</h2>
      <div v-if="noticeLoading" class="loading">加载中...</div>
      <div v-else class="notice-list">
        <div v-for="notice in noticeList" :key="notice.noticeId" class="notice-card">
          <h3 class="notice-card-title">{{ notice.noticeTitle }}</h3>
          <!-- 公告内容支持 HTML 标签 -->
          <div class="notice-card-content" v-html="notice.noticeContent"></div>
          <div class="notice-card-footer">
            <span class="notice-info">
              公告类型: <dict-tag :options="sys_notice_type" :value="notice.noticeType" />
            </span>
            <span class="notice-info">
              状态: <dict-tag :options="sys_notice_status" :value="notice.status" />
            </span>
            <span class="notice-info">
              创建时间: {{ parseTime(notice.createTime, '{y}-{m}-{d}') }}
            </span>
          </div>
        </div>
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

/* 员工统计区域 */
.user-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 40px;
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

/* 公告展示区域 */
.notice-section {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.notice-section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.loading {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notice-card {
  background: #fafafa;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.notice-card-title {
  font-size: 20px;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 10px;
}

.notice-card-content {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.notice-card-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 14px;
  color: #999;
}

.notice-info {
  display: inline-block;
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
