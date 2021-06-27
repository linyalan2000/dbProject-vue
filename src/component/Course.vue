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
          <el-input v-model="formInline.cno" ></el-input>
        </el-form-item>
        <el-form-item label="主讲老师(编号)：">
          <el-input v-model="formInline.tno" ></el-input>
        </el-form-item>
        <el-form-item label="课程名程：">
          <el-input v-model="formInline.cname" ></el-input>
        </el-form-item>
        <el-form-item label="开课院系：">
          <el-input v-model="formInline.academy" ></el-input>
        </el-form-item>
        <el-form-item label="学期时间：">
          <el-input v-model="formInline.term" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryCourse">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCourse">添加课程信息</el-button>
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
            width="100">
        </el-table-column>
        <el-table-column
            prop="cname"
            label="课程名称"
            header-align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="academy"
            label="开课院系"
            header-align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="tname"
            label="主讲老师"
            header-align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="term"
            label="学期时间"
            header-align="center"
            width="200">
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
  name: "Course",
  data(){
    return{
      tableData: [{
        cno:'01',
        cname: '操作系统',
        academy: '信息学院',
        tname: '郑伟',
        term:'大三下'
      }, {
        cno:'03',
        cname: '计算机网络',
        academy: '信息学院',
        tname: '林子雨',
        term:'大三上'
      }, {
        cno:'10',
        cname: '电子电力技术',
        academy: '信息学院',
        tname: '严为民',
        term:'大二上'
      },  {
        cno:'98',
        cname: '编译原理',
        academy: '信息学院',
        tname: '林子雨',
        term:'大三下'
      }, {
        cno:'12',
        cname: '计网',
        academy: '信息学院',
        tname: '吴素珍',
        term:'大二上'
      }],
      navList:[
        {name:'/teainfo',navItem:'教师个人信息'},
        {name:'/teacourse',navItem:'所授课程信息'}
      ],
      formInline: {
        cno: '',
        cname: '',
        academy:'',
        tno:'',
        term:''
      },
      multipleSelection:0

    }
  },
  mounted(){//加载所有的课程信息
    this.$axios({
      method:'get',
      url:'http://150.158.171.212:8080/getadminscore?cno=&sno=',//这里要修改
    }).then(response => { //sno sname cno  cname tname score term
      console.log("加载所有课程信息（包括对应的老师）");
      console.log(response.data);//需要返回的参数为cno cname academy tname maxnum term
      //this.tableData = response.data;//这里应该放出来
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    queryCourse(){//查询课程信息
      this.$axios({
        method:'get',
        url:'http://150.158.171.212:8080/getadminscore?cno=' + this.formInline.cno+"&tno="+this.formInline.tno,
      }).then(response => {
        console.log(response.data) //在控制台中打印其data部分内容
        var res = response.data;//返回cno cname academy tname term
        if (res != null){
          this.tableData = res
        }
        else{
          this.$alert('查询相应信息失败', {
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
    addCourse(){//添加

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
.span-col{
  min-width: 100px;
}
</style>