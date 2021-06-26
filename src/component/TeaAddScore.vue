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
        <el-form-item label="学号：">
          <el-input v-model="formInline.sid" ></el-input>
        </el-form-item>
        <el-form-item label="成绩：">
          <el-input v-model="formInline.score" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addScore">录入成绩</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryScore">查询所有学生成绩</el-button>
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
            prop="courseid"
            label="课程号"
            header-align="center"
            width="80">
        </el-table-column>
        <el-table-column
            prop="courseName"
            label="课程名称"
            header-align="center"
            width="200">
        </el-table-column>
        <el-table-column
            prop="sid"
            label="学号"
            header-align="center"
            width="200">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="学生姓名"
            header-align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="score"
            label="成绩"
            header-align="center"
            width="100">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            header-align="center"
            width="120">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="updateRow(scope.$index, tableData)"
                type="text"
                size="small">
              修改成绩
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
  name: "TeaAddScore",
  data(){
    return{
      tableData:[],
      // tableData: [{
      //   courseid:'01',
      //   courseName: 'os',
      //   sid: '95002',
      //   sname: '林子雨',
      //   score: '99'
      // }, {
      //   courseid:'01',
      //   courseName: 'os',
      //   sid: '95002',
      //   sname: '赵晨',
      //   score: '60'
      // }, {
      //   courseid:'01',
      //   courseName: 'os',
      //   sid: '95002',
      //   sname: '王五',
      //   score: '88'
      // },  {
      //   courseid:'01',
      //   courseName: 'os',
      //   sid: '95002',
      //   sname: '李四',
      //   score: '72'
      // }, {
      //   courseid:'01',
      //   courseName: 'os',
      //   sid: '95002',
      //   sname: '张三',
      //   score: '94'
      // }],
      navList:[
        {name:'/teainfo',navItem:'教师个人信息'},
        {name:'/teacourse',navItem:'所授课程信息'}
      ],
      formInline: {
        sid: '',
        score: ''
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
    addScore() {
      this.$axios({//添加学生成绩信息,不需要返回任何信息
        method:'post',
        url:'http://150.158.171.212:8080/updatescore',
        data:{	//按照对象的格式去组织data，key-value形式
          "cno":this.Common.courseId,
          "sno":this.formInline.sid,
          "score":this.formInline.score,
        },
      }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log("添加学生的成绩不需要返回任何信息");
      })
    },
    queryScore() {
      this.$axios({
        method:'get',
        url:'http://150.158.171.212:8080/getscore?cno=' + this.Common.courseId+'&tno='+this.Common.userId,
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    updateRow(index, rows) {//这里咋获取这一行对应的学号和课程号
      this.$axios({//添加学生成绩信息,不需要返回任何信息
        method:'get',
        url:'http://150.158.171.212:8080/courseinfo?sno=' + this.formInline.sid+'&cno='+this.Common.courseId,
      }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log("不需要返回任何信息");
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