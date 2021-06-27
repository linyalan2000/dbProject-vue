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
          <el-input v-model="formInline.sno" style="width:140px"></el-input>
        </el-form-item>
        <el-form-item label="课程号：" >
          <el-input v-model="formInline.cno" style="width:140px"></el-input>
        </el-form-item>
        <el-form-item label="授课教师(编号)：">
          <el-input v-model="formInline.tno" style="width:140px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryStudent">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addStudent">添加学生</el-button>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="batchDelete">批量删除</el-button>-->
<!--        </el-form-item>-->
        <el-popover
            placement="top"
            width="160"
            v-model="visible">
          <p>确定删除这些记录内容吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="batchDelete();visible = false" >确定</el-button>
          </div>
          <el-button slot="reference">批量删除</el-button>
        </el-popover>
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
            prop="sno"
            label="学号"
            header-align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="姓名"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="cno"
            label="课程号"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="cname"
            label="课程"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="tname"
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
            prop="term"
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
                @click.native.prevent="updateScore(scope.$index, tableData)"
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
      visible: false,
      tableData: [{//这里面添加了tno，但是并不在表单上显示，只是传递给后端做查询
        sno: '95002',
        sname: '张三',
        cno:'009',
        cname: '编译原理',
        tname: '李慧琪',
        score: '91',
        term: '2018-06-01'
      }, {
        sno: '95002',
        sname: '李四',
        cno:'118',
        cname: 'C语言程序设计',
        tname: '陈晨',
        score: '71',
        term: '2018-12-01'
      },  {
        sno: '95002',
        sname: '王五',
        cno:'140',
        cname: '数据库',
        tname: '林子雨',
        score: '90',
        term: '2018-12-01'
      }],
      navList:[
        {name:'/teatable',navItem:'教师信息管理'},
        {name:'/stutable',navItem:'学生成绩管理'}
      ],
      formInline: {
        sno: '',
        cno:'',
        tno:''
      },
      multipleSelection:0

    }
  },
  mounted(){//加载所有学生的所有选课记录
    this.$axios({
      method:'get',
      url:'http://150.158.171.212:8080/getadminscore?cno=&sno=',//这里要修改
    }).then(response => { //sno sname cno  cname tname score term
      console.log("加载所有学生的所有选课记录");
      console.log(response.data);//需要返回的参数为sno sname cno  cname tname score term
      this.tableData = response.data;//这里应该放出来
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
    batchDelete(){
      this.$axios({//向后端传数据：cno,sno,tno
        method:'post',
        url:'http://150.158.171.212:8080/deleteadminscore',
        data:{
          "sno":this.formInline.sno.toString(),
          "cno":this.formInline.cno.toString()
        }
      }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log(response.data);
        this.formInline.sno ='';
        this.formInline.cno ='';
      })


    },
    deleteRow(index, rows) {//删除选课表中的某条记录
      this.$axios({//向后端传数据：cno,sno,tno
        method:'post',
        url:'http://150.158.171.212:8080/deleteadminscore',
        data:{
          "sno":this.tableData[index].sno.toString(),
          "cno":this.tableData[index].cno.toString()
        }

      }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log(response.data);
        this.formInline.sno ='';
        this.formInline.cno ='';
      })
      rows.splice(index, 1);
    },
    updateScore(index, rows) {//更新学生的成绩，应该去选课表中更新score
      var newscore;
      this.$prompt('请输入此学生的新的成绩', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:/^\d{0,2}$/,
        inputErrorMessage: '成绩格式不正确'
      }).then(({ value }) => {
        console.log("修改后的成绩为：");
        console.log(value);
        newscore=value;
        this.$axios({//传给后端sno, cno, newscore, 后端在选课表中更新
          method:'post',
          url:'http://150.158.171.212:8080/updateadminscore',//这里需要修改接口
          data:{	//按照对象的格式去组织data，key-value形式
            "sno":this.tableData[index].sno.toString(),
            "cno":this.tableData[index].cno.toString(),
            "score":newscore,
          },
        }).then(response => { //不需要返回任何信息
          console.log(response.data);
        })

        this.$message({
          type: 'success',
          message: '新的成绩: ' + value,
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    queryStudent(){//输入学号和课程号 ,可查询出对应的学生信息
      this.$axios({
        method:'get',
        url:'http://150.158.171.212:8080/getadminscore?sno=' + this.formInline.sno+"&cno="+this.formInline.cno,
      }).then(response => { //返回tno, tname, title,hireDate,root
        console.log(response.data) //在控制台中打印其data部分内容
        var res = response.data;//tno, tname, title,hireDate,root
        if (res != null){
          this.tableData = res;
          this.$message('查询学生选课信息成功！');
        }
        else{
          this.$alert('查询此学生选修此课程的相应信息失败', {
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
    addStudent(){//添加学生选了具体某门课的信息，在选课表中insert即可
      this.$axios({//输入sno cno tno
        method:'get',
        url:'http://150.158.171.212:8080/gettea?sno=' + this.formInline.sno+
            '&cno='+this.formInline.cno+'&tno='+this.formInline.tno,
      }).then(response => { //不用返回任何信息，
        console.log(response.data) //在控制台中打印其data部分内容
        if (response.data == 1) {
          this.$message('添加学生选课信息成功！');
        } else {
          this.$message('添加学生选课信息失败！');
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