<template>
    <el-col>
        <el-row style="background: #545c64">
            <el-col :span="3" style="text-color: #B3C0D1">
                <h3 style="color: #ffffff">学生成绩管理系统</h3>
            </el-col>
            <el-col :span="17" style="background: #545c64">
                <el-menu :default-active="this.$router.path" router mode="horizontal"
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
        <el-row>
            个人信息
        </el-row>
    </el-col>
</template>

<script>
    export default {
        name: "Index",
        data(){
            return{
                navList:[
                    {name:'/info',navItem:'个人信息'},
                    {name:'/score',navItem:'成绩管理'}
                ]
            }
        },
        methods: {
            logout(){
                console.log("logout!");
                this.$router.push("/login")
            },
        }
    }
</script>

<style scoped>
</style>