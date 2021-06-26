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
        <el-form-item label="课程号：">
          <el-input v-model="formInline.cid" ></el-input>
        </el-form-item>
        <el-form-item label="课程名：">
          <el-input v-model="formInline.cname" ></el-input>
        </el-form-item>
        <el-dropdown split-button type="primary" @command="handleCommand">
          {{this.termMap[this.term]}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1up">大一上</el-dropdown-item>
            <el-dropdown-item command="1down">大一下</el-dropdown-item>
            <el-dropdown-item command="2up">大二上</el-dropdown-item>
            <el-dropdown-item command="2down">大二下</el-dropdown-item>
            <el-dropdown-item command="3up">大三上</el-dropdown-item>
            <el-dropdown-item command="3down">大三下</el-dropdown-item>
            <el-dropdown-item command="4up">大四上</el-dropdown-item>
            <el-dropdown-item command="4down">大四下</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-form-item>
          <el-button type="primary" @click="queryScore">查询</el-button>
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
            prop="courseid"
            label="课程号"
            header-align="center"
            width="100">
        </el-table-column>
        <el-table-column
            fixed
            prop="courseName"
            label="课程名称"
            header-align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="academy"
            label="开课院系"
            header-align="center"
            width="200">
        </el-table-column>
        <el-table-column
            prop="mainTeacher"
            label="主讲老师"
            header-align="center"
            width="200">
        </el-table-column>
        <el-table-column
            prop="score"
            label="课程成绩"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="credit"
            label="课程学分"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="term"
            label="学期"
            header-align="center"
            width="120">
        </el-table-column>

      </el-table>
    </el-row>
    <el-row>

    </el-row>
  </el-col>
</template>

<script>
export default {
  name: "StuScore",
  data(){
    return{
      termMap:{
        "学期选择": "学期选择",
        "1up": "大一上",
        "1down": "大一下",
        "2up": "大二上",
        "2down": "大二下",
        "3up": "大三上",
        "3down": "大三下",
        "4up": "大四上",
        "4down": "大四下",
      },
      term:'学期选择',
      tableData: [{
        courseid:'01',
        courseName: 'os',
        academy: '信息学院',
        mainTeacher: '郑炜',
        score: '100',
        credit:'4',
        term:'大二上'
      }, {
        courseid:'02',
        courseName: '数据库',
        academy: '信息学院',
        mainTeacher: '林紫雨',
        score: '90',
        credit:'4',
        term:'大二上'
      }, {
        courseid:'03',
        courseName: '系统结构',
        academy: '信息学院',
        mainTeacher: '吴素贞',
        score: '80',
        credit:'4',
        term:'大二上'
      },  {
        courseid:'04',
        courseName: '编译原理',
        academy: '信息学院',
        mainTeacher: '李慧其',
        score: '90',
        credit:'4',
        term:'大二上'
      }, {
        courseid:'05',
        courseName: 'os',
        academy: '信息学院',
        mainTeacher: '郑炜',
        score: '100',
        credit:'4',
        term:'大二上'
      }],
      navList:[
        {name:'/stuinfo',navItem:'学生个人信息'},
        {name:'/stuscore',navItem:'个人成绩查询'}
      ],
      formInline: {
        cid: '',
        cname: ''
      },
      multipleSelection:0
    }
  },
  methods: {
    handleCommand(command){
      this.term = command
    },
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
    queryScore(){
      this.$axios({
        method:'get',
        url:'http://150.158.171.212:8080/getstuscore?cno=' + this.formInline.cid+'&sno='+this.Common.userId+'&term='+ this.term,
      }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log(response.data) //在控制台中打印其data部分内容

        var res = response.data;//课程号，课程名称，学号，学生姓名，学生成绩
        if (res != null){
          this.tableData = res
        }
        else{
          this.$alert('查询学生信息失败', {
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