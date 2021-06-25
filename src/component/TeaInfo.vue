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
          <el-form-item label="密码" >
            <el-input v-model="formInline.password" type="password"></el-input>
          </el-form-item>

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