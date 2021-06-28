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
      <el-row class="span-row"></el-row>
      <el-row>
        学分进度
        <el-row class="span-row0"></el-row>
        <el-progress :text-inside="true" :stroke-width="24" :percentage=this.credit status="success"></el-progress>
      </el-row>
        <el-row class="span-row"></el-row>
        <el-row class="span-row"></el-row>

        <el-row>基本信息</el-row>
        <el-row class="span-row0"></el-row>
        <el-form :inline="true" :model="formInline" class="select-form">
          <el-form-item label="学号：" :disabled="true">
            <el-input v-model="formInline.id" ></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="formInline.name" ></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-input v-model="formInline.sex" ></el-input>
          </el-form-item>
<!--          <el-form-item label="班级：">-->
<!--            <el-input v-model="formInline.class" ></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="入学时间：">
            <el-input v-model="formInline.DateOfCome" ></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="formInline.telephone" ></el-input>
          </el-form-item>
          <el-form-item label="专业：">
            <el-input v-model="formInline.major" ></el-input>
          </el-form-item>
          <el-form-item label="预计毕业时间：">
            <el-input v-model="formInline.graduateTime" ></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="formInline.pass"  type="password"></el-input>
          </el-form-item>
          <el-button type="text" @click="updatePwd" >修改</el-button>
        </el-form>
    </el-col>

</template>

<script>

export default {
  name: "StuInfo",
  data(){
    return{
      credit:"",
      navList:[
        {name:'/stuinfo',navItem:'学生个人信息'},
        {name:'/stuscore',navItem:'个人成绩查询'}
      ],
      formInline: {
        name: "向文芳",
        id: "22920182204323",
        class:"01",
        sex:"女",
        DateOfCome:"2018-09-01",
        telephone:"17337784263",
        major:"计算机科学系",
        // polity:"共青团员",
        graduateTime:"2022-06-30",
        pass:"xwf1234567"
      },

    }
  },
  mounted() {
    this.$axios({//获取学生的个人信息
      method:'get',
      url:'http://150.158.171.212:8080/stuinfo?id=' + this.Common.userId
    }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log(response.data) //在控制台中打印其data部分内容
        var res = response.data;
        this.formInline.name = res.sname;
        this.formInline.telephone=res.telphone;
        this.formInline.DateOfCome=res.inyear;
        this.formInline.id=res.sno;
        this.formInline.sex=res.sex;
        this.formInline.major=res.major;
        this.formInline.graduateTime=res.leaveyear;
        this.formInline.pass=res.pass;
    }),
    this.$axios({//获取已修总学分
      method:'get',
      url:'http://150.158.171.212:8080/getcredit?sno=' + this.Common.userId
    }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log(response.data) //在控制台中打印其data部分内容
        var res = response.data;
        this.credit = res;
    })
  },
  methods: {
    logout(){
      console.log("logout!");
      this.$router.push("/login")
    },
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    },
    updatePwd() {//更新自己的密码
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
            "stu":this.Common.userId,
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