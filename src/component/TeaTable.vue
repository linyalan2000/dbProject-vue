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
          <el-menu-item v-for="(item,i) in this.Common.navlist" :key="i" :index="item.name">
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
        <el-form-item label="教工号：" >
          <el-input v-model="formInline.tno" placeholder="5位数字"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="formInline.tname" ></el-input>
        </el-form-item>
        <el-form-item label="职称：" >
          <el-input v-model="formInline.title" placeholder="讲师/助理教授/副教授/教授"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input v-model="formInline.tsex" ></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="formInline.pass" type="password"  placeholder="初始密码设置为123456"></el-input>
        </el-form-item>
        <el-form-item label="入职时间：">
          <el-input v-model="formInline.hireDate" ></el-input>
        </el-form-item>
        <el-form-item label="权限：">
          <el-input v-model="formInline.root" placeholder="a/管理员     t/教师" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryTeacher">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTeacher">添加教师信息</el-button>
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
            prop="tno"
            label="教工号"
            header-align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="tname"
            label="姓名"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="title"
            label="职称"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="hireDate"
            label="入职时间"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="root"
            label="权限"
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
                @click.native.prevent="updatetitle(scope.$index, tableData)"
                type="text"
                size="small">
              修改职称
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
                @click.native.prevent="updateroot(scope.$index, tableData)"
                type="text"
                size="small">
              修改权限
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
  name: "TeaTable",
  data(){
    return{
      tableData:[],
      // tableData: [{
      //   tno: '10001',
      //   tname: '庄朝晖',
      //   title: '副教授',
      //   hireDate:"2010-09",
      //   root: 't',
      // }, {
      //   tno: '10006',
      //   tname: '严严',
      //   title: '教授',
      //   hireDate:"2010-09",
      //   root: 't',
      // }, {
      //   tno: '10008',
      //   tname: '高淳县',
      //   title: '助理教授',
      //   hireDate:"2010-09",
      //   root: 't',
      // }, {
      //   tno: '10020',
      //   tname: '林紫雨',
      //   title: '副教授',
      //   hireDate:"2010-09",
      //   root: 't',
      // }, {
      //   tno: '10033',
      //   tname: '吴素贞',
      //   title: '副教授',
      //   hireDate:"2010-09",
      //   root: 't',
      // },  {
      //   tno: '10088',
      //   tname: '林文水',
      //   title: '教授',
      //   hireDate:"2010-09",
      //   root: 't',
      // }],
      navList:[
        {name:'/course',navItem:'课程信息管理'},
        {name:'/stutable',navItem:'学生信息管理'},
        {name:'/teatable',navItem:'教师信息管理'},
        {name:'/admin',navItem:'管理员信息'}
      ],
      formInline: {
        tno: '',
        tname: '',
        title:'',
        tsex:'',
        pass:'',
        hireDate:'',
        root:''
      },
      multipleSelection:0

    }
  },
  mounted(){//一开始展示所有教师的信息
    this.$axios({
      method:'get',
      url:'http://150.158.171.212:8080/gettea?tno=',
    }).then(response => { //这里的response是通过get方法请求得到的内容
      console.log("不需要返回任何信息");
      console.log(response.data);//需要返回的参数为tno tname title hireDate root
      this.tableData = response.data;
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
    queryTeacher(){
      this.$axios({//输入教工号 ,可查询出对应的教师信息
        method:'get',
        url:'http://150.158.171.212:8080/gettea?tno=' + this.formInline.tno,
      }).then(response => { //返回tno, tname, title,hireDate,root
        console.log(response.data) //在控制台中打印其data部分内容
        var res = response.data;//tno, tname, title,hireDate,root
        if (res != null){
          this.tableData = res
        }
        else{
          this.$alert('查询教师信息失败', {
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
    deleteRow(index, rows) {//删除教师的信息,从教师表和选课表中删除该教师相关的基本信息
      this.$axios({
        method:'post',
        url:'http://150.158.171.212:8080/delteacher',
        data:{
          "tno": this.tableData[index].tno.toString()
        }
      }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log(response.data);
      })
      rows.splice(index, 1);
    },
    updatetitle(index, rows) {//修改教师职称
      var newtitle;
      this.$prompt('请输入此教师的新职称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern:/^\d{0,2}$/,
        // inputErrorMessage: '成绩格式不正确'
      }).then(({ value }) => {
        console.log("修改后的职称为：");
        console.log(value);
        newtitle=value;
        this.$axios({//后端在教师表中更新
          method:'post',
          url:'http://150.158.171.212:8080/updateteacher',//这里需要修改接口
          data:{	//按照对象的格式去组织data，key-value形式
            "tno":this.tableData[index].tno.toString(),
            "title":newtitle,
            "root":this.tableData[index].root
          },
        }).then(response => { //这里的response是通过get方法请求得到的内容
          console.log(response.data);
        })
        this.$message({
          type: 'success',
          message: '新的职称: ' + value,
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });


    },
    updateroot(index, rows) {//修改教师的权限
      var newroot;
      this.$prompt('请输入此教师的新权限', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern:/^\d{0,2}$/,
        // inputErrorMessage: '成绩格式不正确'
      }).then(({ value }) => {
        console.log("修改后的权限为：");
        console.log(value);
        newroot=value;//点击确定以后
        console.log(this.tableData[index].tno)
        this.$axios({//后端在教师表中更新
          method:'post',
          url:'http://150.158.171.212:8080/updateteacher',//这里需要修改接口
          data:{	//按照对象的格式去组织data，key-value形式
            "tno":this.tableData[index].tno.toString(),
            "title":this.tableData[index].title,
            "root":newroot
          },
        }).then(response => { //这里的response是通过get方法请求得到的内容
          console.log(response.data);
        })
        this.$message({
          type: 'success',
          message: '新的权限: ' + value,
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });


    },
    addTeacher(){
      this.$axios({//输入教工号 ,可查询出对应的教师信息
        method:'get',
        url:'http://150.158.171.212:8080/gettea?tno=' + this.formInline.tno,
      }).then(response => { //返回tno, tname, title,hireDate,root
        console.log(response.data) //在控制台中打印其data部分内容
        var res = response.data;//tno, tname, title,hireDate,root
        if (res.length != 0) {
          this.$message('已存在该教师信息');
        } else {
          this.$axios({//添加新入职教师的基本信息,不需要返回任何信息
            method: 'post',
            url: 'http://150.158.171.212:8080/addteacher',
            data: {	//tno, tname, title,hireDate,root
              "tno": this.formInline.tno,
              "tname": this.formInline.tname,
              "title": this.formInline.title,
              "tsex": this.formInline.tsex,
              "pass": this.formInline.pass,
              "hireDate": this.formInline.hireDate,
              "root": this.formInline.root,
            },
          }).then(response => { //这里的response是通过get方法请求得到的内容
            console.log("添加教师的成绩不需要返回任何信息");
            console.log(response);
            if (response != null && response.data == 1) {
              //录入成功
              this.$message('添加成功');
              this.formInline.sid = '';
              this.formInline.score = '';
            } else {
              //录入失败
              this.$message('添加失败');
              this.formInline.sid = '';
              this.formInline.score = '';
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