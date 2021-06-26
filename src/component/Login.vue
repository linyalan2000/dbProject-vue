<template>
    <div class="login-container" :style="{height: scrollerHeight}">
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
                <el-radio v-model="radio" label="1">教师</el-radio>
                <el-radio v-model="radio" label="2">学生</el-radio>
              </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <el-button type="info" @click="Empty">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>
<script>
    export default {
      name:"Login",
        data() {
            return {
                form: {
                    username: "",
                    password: "",
                },
                curHeight:0,
                radio:'1',

            };
        },
        computed: {
            // 滚动区高度
            // (业务需求：手机屏幕高度减去头部标题和底部tabbar的高度，当然这2个高度也是可以动态获取的)
            scrollerHeight: function() {
                return (window.innerHeight) + 'px';
            }
        },
        mounted() {
            this.curHeight = document.documentElement.clientHeight || document.body.clientHeight;
            console.log(this.curHeight)
        },
        methods: {
            Empty() {
                  console.log("reset success!");
                  this.form.username="",
                  this.form.password="",
                  this.radio='1'
            },
            onSubmit() {
                console.log(this.form.username);
                console.log("submit!");
                console.log(this.radio);
                this.$axios({
                    method:'post',
                    url:'http://150.158.171.212:8080/checklogin',
                    data:{	//按照对象的格式去组织data，key-value形式
                      "stu":this.form.username,
                      "pass":this.form.password,
                      "permissionId":this.radio,
                    }
                }).then(response => { //这里的response是通过get方法请求得到的内容
                    console.log(response.data) //在控制台中打印其data部分内容
                    var res = response.data
                    if (res.name != null){
                      if(res.privilege=='s'){
                        this.$router.push("/stuinfo");
                      }else if(res.privilege=='t'){
                        this.$router.push("/teainfo");
                      }else{
                        this.$router.push("/admin");
                      }
                        this.Common.userName = res.name;
                        this.Common.userId = this.form.username;
                        this.Common.privilege = res.privilege;
                        console.log(this.Common.privilege)
                    }
                    else{
                        this.$alert('登录失败', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${action}`
                                });
                            }
                        })
                    }

                })

            }

        }
    };
</script>

<style scoped>
    .login-container {
        width: 100%;
        height: 100%;
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
