<template>
  <!--    去掉 class="home"-->
    <div>
        <!--    <img alt="Vue logo" src="../assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <div style="margin: 10px 0">
            <el-button type="primary">新增</el-button>
            <el-button>其它</el-button>
        </div>
        <!-- 搜索-->
        <div style="margin: 10px 0">
            <el-input v-model="search" placeholder=" 请 输 入 关 键 字 " style="width:30%"></el-input>
            <el-button style="margin-left: 10px" type="primary">查询</el-button>
        </div>

        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column sortable prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'HomeView',
    components: {
        // HelloWorld
    },
    data() {
        return {
            search: '',
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                }
            ]
        }
    },
    methods: {
        handleEdit() {
            //先写一个空的方法
        }
    }
}
</script>
