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
          <el-input v-model="formInline.sid" ></el-input>
        </el-form-item>
        <el-form-item label="课程号：">
          <el-input v-model="formInline.cid" ></el-input>
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
            prop="stuid"
            label="学号"
            header-align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="stuname"
            label="姓名"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="courseid"
            label="课程号"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="course"
            label="课程"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="mainTeacher"
            label="主讲老师"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="score"
            label="成绩"
            header-align="center"
            width="200">
        </el-table-column>
        <el-table-column
            prop="Term"
            label="学期"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            header-align="center"
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
              修改
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
  name: "StuTable",
  data(){
    return{
      tableData: [{
        stuid: '95002',
        stuname: '王小虎',
        courseid:'01',
        course: 'C语言程序设计',
        mainTeacher: '陈晨',
        score: '71',
        Term: '2018-12-01'
      }, {
        stuid: '95008',
        stuname: '张三',
        courseid:'01',
        course: '数据结构',
        mainTeacher: '庄朝晖',
        score: '94',
        Term: '2021-06-01'
      }, {
        stuid: '95002',
        stuname: '王小虎',
        courseid:'01',
        course: 'C语言程序设计',
        mainTeacher: '陈晨',
        score: '71',
        Term: '2018-12-01'
      }, {
        stuid: '95008',
        stuname: '张三',
        courseid:'01',
        course: '数据结构',
        mainTeacher: '庄朝晖',
        score: '94',
        Term: '2021-06-01'
      }, {
        stuid: '95002',
        stuname: '李斯',
        courseid:'01',
        course: 'C语言程序设计',
        mainTeacher: '陈晨',
        score: '71',
        Term: '2018-12-01'
      },  {
        stuid: '95002',
        stuname: '张三',
        courseid:'01',
        course: 'C语言程序设计',
        mainTeacher: '陈晨',
        score: '71',
        Term: '2018-12-01'
      }],
      navList:[
        {name:'/teatable',navItem:'教师信息管理'},
        {name:'/stutable',navItem:'学生成绩管理'}
      ],
      formInline: {
        sid: '',
        sname:'',
        class:'',
        cid:''
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
    updateRow(index, rows) {
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
        //在这里添加对于数据的操作
        console.log(11111111)
        //经常性的操作如下
        console.log(response.data) //在控制台中打印其data部分内容
      })
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