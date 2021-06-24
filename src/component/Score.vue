<template>
    <el-col>
        <el-row style="background: #545c64">
            <el-col :span="3" style="text-color: #B3C0D1">
                <h3 style="color: #ffffff">学生成绩管理系统</h3>
            </el-col>
            <el-col :span="17" style="background: #545c64">
                <el-menu

                        :default-active="this.$router.path" router
                         mode="horizontal"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                        {{ item.navItem }}
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="3">
                <h5 style="color: #ffffff">欢迎您，{{this.Common.userName}}！</h5>
            </el-col>

            <el-col :span="1">
                <h5 style="color: #ffffff" @click="logout">登出</h5>
            </el-col>
        </el-row>
        <el-row class="span-row"></el-row>
        <el-row>
            <el-form :inline="true" :model="formInline" class="select-form">
                <el-form-item label="学号：">
                    <el-input v-model="formInline.id" ></el-input>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="formInline.name" ></el-input>
                </el-form-item>
                <el-form-item label="班级：">
                    <el-input v-model="formInline.name" ></el-input>
                </el-form-item>
                <el-form-item label="科目：">
                    <el-input v-model="formInline.name" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-row class="span-row"></el-row>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    max-height="550"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="date"
                        label="日期"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="省份"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="市区"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="邮编"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>

        </el-row>
    </el-col>
</template>

<script>
    export default {
        name: "Score",
        data(){
            return{
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {

                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                navList:[
                    {name:'/info',navItem:'个人信息'},
                    {name:'/score',navItem:'成绩管理'}
                ],
                formInline: {
                    id: '',
                    name: ''
                },
                multipleSelection:0

            }
        },
        methods: {
            logout(){
                console.log("logout!");
                this.$router.push("/login")
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            onSubmit(){},
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection) //记录了所有选中的记录
            }

        }
    }
</script>

<style scoped>
    .span-row{
        min-height: 36px;
    }
</style>