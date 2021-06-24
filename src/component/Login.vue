<template>
    <div class="login-container">
        <el-card class="box-card" shadow="always">
            <H1>成绩管理系统</H1>
            <el-form  class="Form">
                <el-form-item label="用户名" class="name">
                    <el-input autocomplete="off" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" class="pass">
                    <el-input type="password" autocomplete="off" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <el-button >注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    username: "",
                    password: "",
                }
            };
        },
        mounted() {
            this.curHeight = document.documentElement.clientHeight || document.body.clientHeight;
        },
        methods: {
            onSubmit() {
                console.log(this.form.username);
                console.log("submit!");
                this.$axios({
                    method:'get',
                    url:'http://localhost:8080/getPass?id=' + this.form.username + '&pass=323'
                    ,
                }).then(response => { //这里的response是通过get方法请求得到的内容
                    //在这里添加对于数据的操作

                    //经常性的操作如下
                    console.log(response.data) //在控制台中打印其data部分内容

                    // //将字符串转化为对象格式
                    // JSON.parse(response.data)
                    //
                    // //将JavaScript对象转化为Json字符串
                    // JSON.stringify(response.data)
                    //
                    // //一般将两种方法结合使用
                    // var JsonObj = JSON.parse(JSON.stringify(response.data))
                })
                // this.$router.push("/info")
            },

        }
    };
</script>

<style scoped>
    .login-container {
        width: 100%;
        height: 800px;
        margin: 0;
        padding: 0;
        background: #B3C0D1;
    }
    .box-card {
        width: 500px;
        margin: auto;
        position: relative; /*设置position属性*/
        top: 50%; /*偏移*/
        transform: translateY(-50%);
    }
    .Form{
        width: 80%;
        margin: auto;
    }
</style>
