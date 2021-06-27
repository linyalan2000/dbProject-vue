<template>
    <el-col>
      <el-row style="background: #545c64">
        <el-col :span="3" style="text-color: #B3C0D1">
          <h3 style="color: #ffffff">教师信息管理系统</h3>
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


        <el-row class="span-row"></el-row>
        <el-row class="span-row0"></el-row>

        <h3 >基本信息</h3>
        <el-row class="span-row"></el-row>
        <el-row class="span-row0"></el-row>
        <el-form :inline="true" :model="formInline" class="select-form">
          <el-form-item label="教工号：">
            <el-input v-model="formInline.id" ></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="formInline.name" ></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-input v-model="formInline.sex" ></el-input>
          </el-form-item>
          <el-form-item label="职称：">
            <el-input v-model="formInline.title" ></el-input>
          </el-form-item>
          <el-form-item label="入职时间：">
            <el-input v-model="formInline.DateOfEntry" ></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="formInline.tel" ></el-input>
          </el-form-item>
          <el-button type="text" @click="updateTel" >修改电话</el-button>
          <el-form-item label="密码" >
            <el-input v-model="formInline.password" type="password"></el-input>
          </el-form-item>
          <el-button type="text" @click="updatePwd" >修改密码</el-button>
        </el-form>
    </el-col>

</template>

<script>

export default {
  name: "TeaInfo",
  data(){
    return{
      navList:[
        {name:'/teainfo',navItem:'教师个人信息'},
        {name:'/teacourse',navItem:'所授课程信息'}
      ],
      formInline: {
        name: "林子雨",
        id: "10022",
        sex:"男",
        DateOfEntry:"2018-09-01",
        tel:"17337784263",
        title:"副教授",
        password:"lzy10022"
      },

    }
  },
  methods: {
    logout(){
      console.log("logout!");
      this.$router.push("/login")
    },
    updateTel() {//更新教师自己手机号码
      var newtel;
      this.$prompt('请输入新的联系方式', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        newtel = value;
        console.log("修改后的联系方式为：");
        console.log(value);

        this.$axios({//把新的联系方式传到后端
          method:'post',
          url:'http://150.158.171.212:8080/editpass',//这里需要修改
          data:{	//按照对象的格式去组织data，key-value形式
            "tno":this.Common.userId,
            "tel":value,
            "permissionId":this.Common.privilege
          },
        }).then(response => { //这里的response是通过get方法请求得到的内容
          console.log(111111)
          console.log(response.data);
        })

        this.$message({
          type: 'success',
          message: '联系方式修改成功！',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入新联系方式'
        });
      });

    },
    updatePwd() {//更新教师自己的密码
      var newpwd;
      this.$prompt('请输入新的密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        newpwd = value;
        console.log("修改后的密码为：");
        console.log(value);

        this.$axios({//把新的密码传到后端
          method:'post',
          url:'http://150.158.171.212:8080/editpass',
          data:{	//按照对象的格式去组织data，key-value形式
            "tno":this.Common.userId,
            "pass":value,
            "permissionId":this.Common.privilege
          },
        }).then(response => { //这里的response是通过get方法请求得到的内容
          console.log(111111)
          console.log(response.data);
        })
        this.$message({
          type: 'success',
          message: '密码修改成功！',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入新密码'
        });
      });

    }

  }
}
</script>

<style scoped>
.span-row{
  min-height: 36px;
}
.span-row0{
  min-height: 10px;
}
</style>