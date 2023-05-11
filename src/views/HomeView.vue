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
            <el-button style="margin-left: 10px" type="primary" @click="list">查询</el-button>
        </div>

        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="name" label="家居名">
            </el-table-column>
            <el-table-column prop="maker" label="厂家">
            </el-table-column>
            <el-table-column prop="price" label="价格">
            </el-table-column>
            <el-table-column prop="sales" label="销量">
            </el-table-column>
            <el-table-column prop="stock" label="库存">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
                    <!-- 增加 popcomfirm 控件，确认删除 -->
                    <el-popconfirm
                            title="确定删除吗？" @confirm="handleDel(scope.row.id)">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
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
            <el-form :model="form" label-width="120px" :rules="rules" ref="form">
                <el-form-item label="家居名" prop="name">
                    <el-input v-model="form.name" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="厂商" prop="maker">
                    <el-input v-model="form.maker" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="form.price" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="销量" prop="sales">
                    <el-input v-model="form.sales" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="stock">
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

        <div style="margin: 10px 0">
            <el-pagination
                    @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,8]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
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
    created() {
        /*
        created:
          这个阶段组件的 data 和 methods 中的方法已初始化结束，可以访问，但是 dom 结构未
          初始化，页面未渲染
        */
        this.list();
    },
    data() {
        return {
            currentPage: 1, //当前页数
            pageSize: 8,    //每页显示的数据量
            total: 10,      //总记录数量
            form: {},       //存储添加表单中的信息
            dialogVisible: false,   //设置添加表单是否可见
            search: '',
            tableData: [],   //tableData动态通过 list() 获取
            rules: {
                name: [{required: true, message: '请输入称家居名', trigger: 'blur'}],
                maker: [{required: true, message: '请输入称制造商', trigger: 'blur'}],
                price: [
                    {required: true, message: '请输入价格', trigger: 'blur'},
                    {pattern: /^(([1-9]\d*)|(0))(\.\d+)?$/, message: '请输入数字', trigger: 'blur'}
                ],
                sales: [
                    {required: true, message: '请输入销量', trigger: 'blur'},
                    {pattern: /^(([1-9]\d*)|(0))$/, message: '请输入数字', trigger: 'blur'}
                ],
                stock: [
                    {required: true, message: '请输入库存', trigger: 'blur'},
                    {pattern: /^(([1-9]\d*)|(0))$/, message: '请输入数字', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        handlePageSizeChange(pageSize) {
            this.pageSize = pageSize;
            //刷新
            this.list();
        },
        handleCurrentChange(pageNum) {
            this.currentPage = pageNum;
            this.list();
        },
        handleDel(id) {
            console.log("id:", id);
            request.delete(
                '/api/del/' + id
            ).then(
                res => {
                    if (res.code === "200") {
                        //添加成功...
                        ElMessage({
                            message: '删除成功',
                            type: 'success',
                        });
                        //重新请求所有数据
                        this.list();    //更新数据
                    } else {
                        //弹出提示失败
                        ElMessage.error(res.msg);
                    }
                }
            )
        },
        handleEdit(row) {
            //JSON.stringfy(row) 转化成 json 字符串

            //把 json 字符串转化成 json 对象
            //把得到的数据和 from 绑定，显示到对话框中

            //回显表单方式而: 请求DB回显数据
            console.log("id:", row.id);
            request.get(
                '/api/query?id=' + row.id
            ).then(
                res => {
                    this.form = JSON.parse(JSON.stringify(res.data));
                    if (res.code === "200") {
                        this.dialogVisible = true;
                    } else {
                        //弹出提示失败
                        ElMessage.error(res.msg);
                    }
                }
            )
            // this.form = JSON.parse(JSON.stringify(row));
        },
        add() {
            this.form = {};                     //清空表单
            this.dialogVisible = true;          //将表单设置成可见
            this.$refs['form'].resetFields();  //清空上次前端校验的信息
        },
        save() {
            //集成添加和修改
            if (this.form.id) {
                //如果显示id,则说明是进行更新操作
                request.put(
                    '/api/update',
                    JSON.parse(JSON.stringify(this.form))
                ).then(
                    res => {
                        console.log("res:", res);
                        if (res.code === "200") {
                            //添加成功...
                            ElMessage({
                                message: '更新成功',
                                type: 'success',
                            });
                            //重新请求所有数据
                            //清空本次存储的数据
                            this.dialogVisible = false;
                            this.list();    //更新数据
                        } else {
                            //弹出提示失败
                            ElMessage.error(res.msg);
                        }
                    }
                )
            } else {
                //这里我们添加时，和表单验证关联，如果验证没有通过，就不进行提交
                this.$refs['form'].validate(
                    (valid) => {
                        if (valid) {
                            console.log("valid:", valid);
                            //否则进行添加操作
                            request.post(
                                '/api/save',
                                JSON.parse(JSON.stringify(this.form))
                            ).then(
                                res => {
                                    console.log("res:", res);
                                    if (res.code === "200") {
                                        //添加成功...
                                        ElMessage({
                                            message: '更新成功',
                                            type: 'success',
                                        });
                                        //重新请求所有数据
                                        //清空本次存储的数据
                                        this.dialogVisible = false;
                                        this.list();    //更新数据
                                    } else {
                                        //弹出提示失败
                                        ElMessage.error(res.msg);
                                        //重新请求所有数据
                                        //清空本次存储的数据
                                        this.dialogVisible = false;
                                        this.form = {};
                                    }
                                }
                            )
                        } else {
                            ElMessage.error("验证失败");
                            return false;
                        }
                    }
                )
            }
        },
        list() {
            // request.get('/api/list')
            //     .then(res => {
            //         console.log("res:", res);
            //         this.tableData = res.data;
            //     })

            //修改成分页查询带条件
            request.get(
                '/api/pageByConditional', {
                    params: {
                        "pageNum": this.currentPage,
                        "pageSize": this.pageSize,
                        "search": this.search
                    }
                }
            ).then(res => {
                console.log("res:", res);
                //更新显示的数据
                this.tableData = res.data.records;
                //更新数据总量
                this.total = res.data.total;
            });
        }
    }
}
</script>
