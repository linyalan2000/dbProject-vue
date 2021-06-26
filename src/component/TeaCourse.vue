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
    <el-row>
      <el-form :inline="true" :model="formInline" class="select-form">
        <el-form-item label="课程号：">
          <el-input v-model="formInline.cid" ></el-input>
        </el-form-item>
        <el-form-item label="课程名：">
          <el-input v-model="formInline.cname" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryCourse">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addScore">录入学生成绩</el-button>
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
            prop="cno"
            label="课程号"
            header-align="center"
            width="200">
        </el-table-column>
        <el-table-column
            prop="cname"
            label="课程名称"
            header-align="center"
            width="200">
        </el-table-column>
        <el-table-column
            prop="department"
            label="开课院系"
            header-align="center"
            width="220">
        </el-table-column>
        <el-table-column
            prop="tname"
            label="主讲老师"
            header-align="center"
            width="220">
        </el-table-column>
        <el-table-column
            prop="stuNum"
            label="学生人数"
            header-align="center"
            width="220">
        </el-table-column>

      </el-table>
    </el-row>
    <el-row>

    </el-row>
  </el-col>
</template>

<script>
export default {
  name: "TeaCourse",
  data(){
    return{
      tableData:[],
      // tableData: [{
      //   courseid:'01',
      //   courseName: 'os',
      //   academy: '信息学院',
      //   mainTeacher: '林子雨',
      //   stunum: '120'
      // }, {
      //   courseid:'03',
      //   courseName: '数据库',
      //   academy: '信息学院',
      //   mainTeacher: '林子雨',
      //   stunum: '50'
      // }, {
      //   courseid:'10',
      //   courseName: '系统结构',
      //   academy: '信息学院',
      //   mainTeacher: '林子雨',
      //   stunum: '48'
      // },  {
      //   courseid:'98',
      //   courseName: '编译原理',
      //   academy: '信息学院',
      //   mainTeacher: '林子雨',
      //   stunum: '98'
      // }, {
      //   courseid:'12',
      //   courseName: '计网',
      //   academy: '信息学院',
      //   mainTeacher: '林子雨',
      //   stunum: '40'
      // }],
      navList:[
        {name:'/teainfo',navItem:'教师个人信息'},
        {name:'/teacourse',navItem:'所授课程信息'}
      ],
      formInline: {
        cid: '',
        cname: ''
      },
      multipleSelection:0

    }
  },
  mounted() {
    console.log("教师号：");
    console.log(this.Common.userId);
    console.log("接下来输出此教师的相关课程有哪些：");
    this.$axios({
      method:'get',
      url:'http://150.158.171.212:8080/courseinfo?id=' + this.Common.userId,

    }).then(response => { //这里的response是通过get方法请求得到的内容
      console.log(response.data) //在控制台中打印其data部分内容
      var res = response.data;//课程号，课程名称，开课院系，已选人数
      if (res != null){
        this.tableData = res
      }
      else{
        this.$alert('搜索课程信息失败', {
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
  },
  methods: {
    logout(){
      console.log("logout!");
      this.$router.push("/login")
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // deleteRow(index, rows) {
    //   rows.splice(index, 1);
    // },
    queryCourse(){
      this.$axios({
        method:'get',
        url:'http://150.158.171.212:8080/quirecourse?cno=' + this.formInline.cid,
      }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log(response.data) //在控制台中打印其data部分内容
        var res = response.data;//课程号，课程名称，开课院系，主讲老师，学生人数
        if (res != null){
          this.tableData = res
        }
        else{
          this.$alert('查询课程信息失败', {
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
    },
    addScore(){
      this.Common.courseId=this.formInline.cid;//这样可以把输入框内的学号给Common.courseId???
      this.$router.push("/teaaddscore");
    },
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