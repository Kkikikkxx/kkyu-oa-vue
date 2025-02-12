<template>
  <div class="dashboard-container">

    <!-- 欢迎卡片 -->
    <el-card class="welcome-card">
      <h2 class="title">🎉 欢迎使用企业后台管理系统 🎉</h2>
      <p class="subtitle">高效、智能、便捷，让管理更轻松</p>
      <div class="feature-grid">
        <div v-for="item in features" :key="item.title" class="feature-item">
          <component :is="item.icon" class="feature-icon" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </el-card>

    <!-- 功能卡片 -->
    <el-row :gutter="20" class="info-section">
      <el-col
        v-for="(item, index) in infoCards"
        :key="index"
        :xs="24" :sm="12" :md="8"
      >
        <el-card class="info-card">
          <el-icon size="32" class="card-icon">
            <component :is="item.icon" />
          </el-icon>
          <p class="info-text">{{ item.text }}</p>
          <p class="info-desc">{{ item.desc }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Lightning, Trophy, CircleCheck, Lock, Monitor, DataAnalysis } from '@element-plus/icons-vue';

// 新增功能描述
const features = [
  {
    title: '数据安全',
    desc: '银行级加密保障，守护企业核心数据资产',
    icon: Lock
  },
  {
    title: '多端适配',
    desc: 'PC/移动全平台支持，随时随地管理业务',
    icon: Monitor
  },
  {
    title: '智能分析',
    desc: 'AI驱动数据洞察，助力科学决策',
    icon: DataAnalysis
  }
]

// 功能卡片数据
const infoCards = [
  { icon: Lightning, text: '⚡ 极速管理', desc: '毫秒级响应，流畅操作体验' },
  { icon: Trophy, text: '🏆 卓越组织', desc: '多层级架构，清晰权限划分' },
  { icon: CircleCheck, text: '✅ 权限掌控', desc: '精细化权限管理，安全无忧' },
  { icon: Lock, text: '🔒 安全防护', desc: '多重验证机制，数据加密存储' },
  { icon: Monitor, text: '📱 多端同步', desc: '跨设备实时同步，无缝衔接' },
  { icon: DataAnalysis, text: '📊 数据洞察', desc: '可视化报表，决策有据可依' }
]
</script>

<style lang="scss" scoped>
.dashboard-container {
  // 保持原有布局样式
  background: var(--bg-color);
  transition: background 0.3s ease;
}

.welcome-card {
  background: var(--welcome-bg);
  border: none;
  margin-top: 40px;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, var(--gradient-spot) 0%, transparent 70%);
    opacity: 0.1;
    pointer-events: none;
  }
}

.title {
  font-size: 2.2rem;
  letter-spacing: 1px;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px 0;
}

.feature-item {
  text-align: center;
  padding: 20px;
  background: var(--feature-bg);
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.2rem;
    margin: 15px 0 10px;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.feature-icon {
  width: 48px;
  height: 48px;
  padding: 12px;
  border-radius: 50%;
  background: var(--icon-bg);
  color: var(--icon-color);
  box-shadow: 0 4px 6px var(--icon-shadow);
}

.info-card {
  position: relative;
  margin-bottom: 20px;
  border: 1px solid var(--card-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px var(--card-shadow);

    .card-icon {
      transform: scale(1.1);
      color: var(--icon-hover);
    }
  }
}

.card-icon {
  transition: all 0.3s ease;
}

.info-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 15px 0 8px;
  color: var(--text-primary);
}

.info-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  opacity: 0.9;
}

// 主题变量更新
:root {
  --bg-color: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --welcome-bg: linear-gradient(135deg, #3b82f6, #6366f1);
  --card-bg: #ffffff;
  --card-border: #e2e8f0;
  --card-shadow: rgba(99, 102, 241, 0.1);
  --icon-bg: #e0e7ff;
  --icon-color: #4f46e5;
  --icon-shadow: rgba(99, 102, 241, 0.1);
  --icon-hover: #6366f1;
  --feature-bg: rgba(255, 255, 255, 0.9);
  --gradient-spot: #818cf8;
}

.dark {
  --bg-color: #0f172a;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --welcome-bg: linear-gradient(135deg, #1e3a8a, #4338ca);
  --card-bg: #1e293b;
  --card-border: #334155;
  --card-shadow: rgba(15, 23, 42, 0.5);
  --icon-bg: rgba(99, 102, 241, 0.1);
  --icon-color: #818cf8;
  --icon-shadow: rgba(99, 102, 241, 0.2);
  --icon-hover: #a5b4fc;
  --feature-bg: rgba(30, 41, 59, 0.7);
  --gradient-spot: #4f46e5;
}

.theme-toggle {
  position: fixed !important;
  top: 20px;
  right: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(15deg);
  }
}
</style>
