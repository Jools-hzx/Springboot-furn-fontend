<template>
  <!--    去掉 class="home"-->
    <div>
        <!--    <img alt="Vue logo" src="../assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <div style="margin: 10px 0">
            <el-button type="primary" @click="add">新增</el-button>
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

        <!-- 添加家居的弹窗
        说明:
        1. el-dialog ：v-model="dialogVisible" 表示对话框, 和 dialogVisible 变量双向
        绑定,控制是否显示对话框
        2. el-form :model="form" 表示表单数据和 form 数据变量双向绑定
        3. el-input v-model="form.name" 表示表单的 input 控件，名字为 name 需要和后台 Javabean 属性一致
        -->
        <el-dialog title="提示" v-model="dialogVisible" width="30%">
            <el-form :model="form" label-width="120px">
                <el-form-item label="家居名">
                    <el-input v-model="form.name" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="厂商">
                    <el-input v-model="form.maker" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="销量">
                    <el-input v-model="form.sales" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="form.stock" style="width: 80%"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

//导入request模块
import request from "@/utils/request";
//导入提示消息组件
import {ElMessage} from 'element-plus'

export default {
    name: 'HomeView',
    components: {
        // HelloWorld
    },
    data() {
        return {
            form: {},   //存储添加表单中的信息
            dialogVisible: false,   //设置添加表单是否可见
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
        },
        add() {
            this.form = {}; //清空表单
            this.dialogVisible = true;
        },
        save() {
            request.post(
                '/api/save',
                JSON.parse(JSON.stringify(this.form))
            ).then(
                res => {
                    console.log("res:", res);
                    if (res.data.code === "200") {
                        //添加成功...
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        });
                        //重新请求所有数据
                        //清空本次存储的数据
                        this.dialogVisible = false;
                        this.form = {};
                    } else {
                        //弹出提示失败
                        ElMessage.error('添加失败');
                        //重新请求所有数据
                        //清空本次存储的数据
                        this.dialogVisible = false;
                        this.form = {};
                    }
                }
            )
        }
    }
}
</script>
