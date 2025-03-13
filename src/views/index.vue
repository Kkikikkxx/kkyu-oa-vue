<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { getLeaveUser, getTotalUser } from '@/api/index.js'
import { listNotice } from '@/api/system/notice'
import { UserFilled, SwitchButton, Bell, Reading } from '@element-plus/icons-vue'

const { proxy } = getCurrentInstance();
const { sys_notice_type, sys_notice_status } = proxy.useDict("sys_notice_type", "sys_notice_status")

const totalUser = ref(null);
const leaveUser = ref(null);
const noticeList = ref([]);
const noticeLoading = ref(true);

const fetchTotalUser = async () => {
  totalUser.value = await getTotalUser();
}

const fetchLeaveUser = async () => {
  leaveUser.value = await getLeaveUser();
}

const fetchNoticeList = async () => {
  noticeLoading.value = true;
  const res = await listNotice({ pageNum: 1, pageSize: 10 });
  noticeList.value = res.rows || [];
  noticeLoading.value = false;
}

const parseTime = (time) => {
  if (!time) return '';
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

onMounted(() => {
  fetchTotalUser();
  fetchLeaveUser();
  fetchNoticeList();
});
</script>

<template>
  <div class="dashboard-container">
    <el-row :gutter="24" class="main-layout">
      <!-- 左侧统计卡片 -->
      <el-col :span="6" class="left-panel">
        <el-card class="stats-card user-total">
          <el-statistic
            :value="totalUser || 0"
            title="用户总数"
            :precision="0"
            value-class="statistic-value"
            title-class="statistic-title">
            <template #prefix>
              <el-icon class="statistic-icon">
                <UserFilled />
              </el-icon>
            </template>
          </el-statistic>
        </el-card>

        <el-card class="stats-card leave-users mt-4">
          <el-statistic
            :value="leaveUser || 0"
            title="离职用户数"
            :precision="0"
            value-class="statistic-value"
            title-class="statistic-title">
            <template #prefix>
              <el-icon class="statistic-icon">
                <SwitchButton />
              </el-icon>
            </template>
          </el-statistic>
        </el-card>
      </el-col>

      <!-- 右侧公告区域 -->
      <el-col :span="18" class="right-panel">
        <el-card class="notice-card" shadow="never">
          <template #header>
            <div class="card-header">
              <el-icon class="header-icon"><Bell /></el-icon>
              <span class="header-text">系统公告</span>
              <div class="header-sub">最近10条公告信息</div>
            </div>
          </template>

          <el-skeleton :loading="noticeLoading" animated :count="3">
            <div class="notice-list">
              <div
                v-for="notice in noticeList"
                :key="notice.noticeId"
                class="notice-item"
              >
                <div class="notice-meta">
                  <div class="notice-date">
                    {{ parseTime(notice.createTime) }}
                  </div>
                    <dict-tag :options="sys_notice_type" :value="notice.noticeType" />
                </div>

                <div class="notice-content">
                  <h3 class="notice-title">
                    <el-icon class="title-icon"><Reading /></el-icon>
                    {{ notice.noticeTitle }}
                  </h3>
                  <div
                    class="content-text"
                    v-html="notice.noticeContent"
                  ></div>
                </div>

                <div class="notice-status">
                    <dict-tag :options="sys_notice_status" :value="notice.status" />
                </div>
              </div>
            </div>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.dashboard-container {
  padding: 20px;
  height: calc(100vh - 84px);
}

.main-layout {
  height: 100%;
}

.stats-card {
  padding: 24px;
  text-align: center;
}

.notice-card {
  height: 100%;
}

.card-header {
  display: flex;
  align-items: center;
}

.header-icon {
  font-size: 24px;
  margin-right: 8px;
  color: var(--el-color-primary);
}

.header-text {
  font-size: 18px;
  font-weight: 600;
}

.header-sub {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-left: 12px;
}

.notice-list {
  overflow-y: auto;
  height: calc(100% - 60px);
  padding: 20px;
}

.notice-item {
  border-bottom: 1px solid var(--el-border-color-light);
  padding: 12px 0;
}

.notice-meta, .notice-status {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.notice-title {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.title-icon {
  margin-right: 8px;
}

.content-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--el-text-color-regular);
}

.mt-4 {
  margin-top: 16px;
}
</style>
