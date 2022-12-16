<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getTables } from '@/api/home';
import { isSuccess } from '@/utils/util';
import { REQUEST } from '@/utils/constant';
import { ElMessage } from 'element-plus';

let tableData = ref([]);

onMounted(() => {
  getTables().then((res) => {
    if (isSuccess(res)) {
      tableData.value = res.data;
    } else {
      ElMessage.error(res.msg || REQUEST.FAIL);
    }
  });
});
</script>

<style scoped></style>
