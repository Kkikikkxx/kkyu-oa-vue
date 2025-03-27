<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="88px">
      <el-form-item label="员工编号" prop="employeeCode">
        <el-input
          v-model="queryParams.employeeCode"
          placeholder="请输入员工编号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="员工姓名" prop="employeeName">
        <el-input
          v-model="queryParams.employeeName"
          placeholder="请输入员工姓名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入联系电话"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="员工状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择员工状态" style="width: 200px;" clearable>
          <el-option
            v-for="dict in sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['employee:archives:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['employee:archives:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['employee:archives:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['employee:archives:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="archivesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="55" align="center" prop="employeeId" />
      <el-table-column label="员工编号" align="center" prop="employeeCode" />
      <el-table-column label="员工姓名" align="center" prop="employeeName" />
      <el-table-column label="性别" align="center" prop="gender">
        <template #default="scope">
          <dict-tag :options="sys_user_sex" :value="scope.row.gender"/>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" align="center" prop="birthDate" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.birthDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入职日期" align="center" prop="hireDate" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.hireDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" prop="phone" />
      <el-table-column label="邮箱" align="center" prop="email" />
      <el-table-column label="身份证号码" align="center" prop="idNumber" />
      <el-table-column label="联系地址" align="center" prop="address" />
      <el-table-column label="员工状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['employee:archives:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['employee:archives:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改员工档案管理对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="archivesRef" :model="form" :rules="rules" label-width="88px">
        <el-form-item label="员工编号" prop="employeeCode">
          <el-input v-model="form.employeeCode" placeholder="请输入员工编号" />
        </el-form-item>
        <el-form-item label="员工姓名" prop="employeeName">
          <el-input v-model="form.employeeName" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option
              v-for="dict in sys_user_sex"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthDate">
          <el-date-picker clearable
            v-model="form.birthDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入职日期" prop="hireDate">
          <el-date-picker clearable
            v-model="form.hireDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择入职日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入身份证号码" />
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入联系地址" />
        </el-form-item>
        <el-form-item label="员工状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Archives">
import { listArchives, getArchives, delArchives, addArchives, updateArchives } from "@/api/employee/archives";

const { proxy } = getCurrentInstance();
const { sys_user_sex, sys_normal_disable } = proxy.useDict('sys_user_sex', 'sys_normal_disable');

const archivesList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    employeeCode: null,
    employeeName: null,
    phone: null,
    status: null,
  },
  rules: {
    employeeCode: [
      { required: true, message: "员工编号不能为空", trigger: "blur" }
    ],
    employeeName: [
      { required: true, message: "员工姓名不能为空", trigger: "blur" }
    ],
    gender: [
      { required: true, message: "性别不能为空", trigger: "change" }
    ],
    status: [
      { required: true, message: "员工状态不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询员工档案管理列表 */
function getList() {
  loading.value = true;
  listArchives(queryParams.value).then(response => {
    archivesList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    employeeId: null,
    employeeCode: null,
    employeeName: null,
    gender: null,
    birthDate: null,
    hireDate: null,
    phone: null,
    email: null,
    idNumber: null,
    address: null,
    status: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("archivesRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.employeeId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加员工档案管理";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _employeeId = row.employeeId || ids.value
  getArchives(_employeeId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改员工档案管理";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["archivesRef"].validate(valid => {
    if (valid) {
      if (form.value.employeeId != null) {
        updateArchives(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addArchives(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _employeeIds = row.employeeId || ids.value;
  proxy.$modal.confirm('是否确认删除员工档案管理编号为"' + _employeeIds + '"的数据项？').then(function() {
    return delArchives(_employeeIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('employee/archives/export', {
    ...queryParams.value
  }, `archives_${new Date().getTime()}.xlsx`)
}

getList();
</script>
