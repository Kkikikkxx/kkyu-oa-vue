<template>
  <div class="dashboard-container">
    <el-card class="welcome-card">
      <h2 class="title">🎉 欢迎使用企业后台管理系统 🎉</h2>
      <p class="subtitle">高效、智能、便捷，让管理更轻松</p>
    </el-card>

    <el-row :gutter="20" class="info-section">
      <el-col :span="8">
        <el-card class="info-card">
          <el-icon size="30"><Lightning /></el-icon>
          <p class="info-text">⚡ 极速管理</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="info-card">
          <el-icon size="30"><Trophy /></el-icon>
          <p class="info-text">🏆 卓越组织</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="info-card">
          <el-icon size="30"><CircleCheck /></el-icon>
          <p class="info-text">✅ 权限掌控</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Lightning, Trophy, CircleCheck } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.welcome-card {
  width: 100%;
  max-width: 800px;
  text-align: center;
  background: linear-gradient(135deg, #42b983, #2c3e50);
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.subtitle {
  font-size: 16px;
  margin-top: 10px;
  opacity: 0.8;
}

.info-section {
  margin-top: 30px;
  width: 100%;
  max-width: 1000px;
}

.info-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: white;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.info-text {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}
</style>
