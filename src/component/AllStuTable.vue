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

    <el-dialog  :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.sname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-input v-model="form.major" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入学时间" :label-width="formLabelWidth">
          <el-input v-model="form.inyear" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.telphone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStu">确 定</el-button>
      </div>
    </el-dialog>
    <el-row>
      <el-form :inline="true" :model="formInline1" class="select-form">
        <el-form-item label="学号：">
          <el-input v-model="formInline1.sno" style="width:100px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" >
          <el-input v-model="formInline1.sname" style="width:100px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input v-model="formInline1.ssex" style="width:50px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="专业：">
          <el-input v-model="formInline1.major" style="width:90px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="入学时间：">
          <el-input v-model="formInline1.inyear" style="width:90px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="初始密码：">
          <el-input v-model="formInline1.pass" style="width:90px" type="password" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="formInline1.tel" style="width:90px" size="small"></el-input>
          </el-form-item>
          <el-button type="primary" @click="addStudent" size="small">添加新学生</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectStudent" size="small">查询</el-button>
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
            prop="sex"
            label="性别"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
            prop="major"
            label="专业"
            header-align="center"
            width="120">
        </el-table-column>
        <el-table-column
                prop="inyear"
                label="入学时间"
                header-align="center"
                width="120">
        </el-table-column>
        <el-table-column
            prop="telphone"
            label="联系电话"
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
                @click="dialogFormVisible = true"
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
  name: "AllStuTable",
  data(){
    return{
      form: {
        sno: '',
        sname: '',
        sex: '',
        inyear: '',
        tel: '',
        major: ''
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
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
      formInline1:{
        sno:'',
        sname:'',
        ssex:'',
        inyear:'',
        pass:'123456',
        tel:'',
        major:''
      },
      multipleSelection:0,
      indexNum:0,

    }
  },
  mounted(){//加载所有学生的所有选课记录
    this.$axios({
      method:'get',
      url:'http://150.158.171.212:8080/stuinfo?id=',//这里要修改
    }).then(response => { //sno sname cno  cname tname score term
      console.log("加载所有学生的所有选课记录");
      console.log(response.data);//需要返回的参数为sno sname cno  cname tname score term
      this.tableData = response.data;//这里应该放出来

    })
  },
  methods: {
    query(){
      this.$axios({
        method:'get',
        url:'http://150.158.171.212:8080/stuinfo?id=',//这里要修改
      }).then(response => { //sno sname cno  cname tname score term
        console.log("加载所有学生的所有选课记录");
        console.log(response.data);//需要返回的参数为sno sname cno  cname tname score term
        this.tableData = response.data;//这里应该放出来

      })
    },
    logout() {
      console.log("logout!");
      this.$router.push("/login")
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    batchDelete() {
      this.$axios({//向后端传数据：cno,sno,tno
        method: 'post',
        url: 'http://150.158.171.212:8080/deleteadminscore',
        data: {
          "sno": this.formInline.sno.toString(),
          "cno": this.formInline.cno.toString()
        }
      }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log(response.data);
        this.formInline.sno = '';
        this.formInline.cno = '';
      })


    },
    addStudent() {//在学生表中添加新的学生信息
      this.$axios({//输入sno sname ssex inyear pass major
        method: 'post',
        url: 'http://150.158.171.212:8080/addstu',
        data: {
          "sno": this.formInline1.sno,
          "sname": this.formInline1.sname,
          "sex": this.formInline1.ssex,
          "inyear": this.formInline1.inyear,
          "major": this.formInline1.major,
          "tel": this.formInline1.tel,
          "pass":this.formInline1.pass,
        }
      }).then(response => { //不用返回任何信息，
        console.log(response.data) //在控制台中打印其data部分内容
        if (response.data == 1) {
          this.$message('添加学生信息成功！');
          this.formInline1 = []
          this.query()
        } else {
          this.$message('添加学生信息失败！');
        }
      })
    },
    selectStudent() {//从学生表中删除此学生，并从选课表中删除相关记录
      this.$axios({//输入sno
        method: 'get',
        url: 'http://150.158.171.212:8080/stuinfo?id=' + this.formInline1.sno,
      }).then(response => { //不用返回任何信息，
        console.log(response.data) //在控制台中打印其data部分内容
        this.tableData = response.data
      })
    },
    deleteRow(index, rows) {//删除选课表中的某条记录
      this.$axios({//向后端传数据：cno,sno,tno
        method: 'post',
        url: 'http://150.158.171.212:8080/delstu',
        data: {
          "sno": this.tableData[index].sno.toString(),
        }

      }).then(response => { //这里的response是通过get方法请求得到的内容
        console.log(response.data);
        this.formInline.sno = '';
        this.formInline.cno = '';
      })
      rows.splice(index, 1);
    },
    updateScore(index, rows) {//更新学生的成绩，应该去选课表中更新score

      console.log(index)
      this.indexNum = index
      this.form = this.tableData[index]
      // var newscore;
      // this.$prompt('请输入此学生的新的成绩', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputPattern:/^\d{0,2}$/,
      //   inputErrorMessage: '成绩格式不正确'
      // }).then(({ value }) => {
      //   console.log("修改后的成绩为：");
      //   console.log(value);
      //   newscore=value;
      //   this.$axios({//传给后端sno, cno, newscore, 后端在选课表中更新
      //     method:'post',
      //     url:'http://150.158.171.212:8080/updateadminscore',//这里需要修改接口
      //     data:{	//按照对象的格式去组织data，key-value形式
      //       "sno":this.tableData[index].sno.toString(),
      //       "cno":this.tableData[index].cno.toString(),
      //       "score":newscore,
      //     },
      //   }).then(response => { //不需要返回任何信息
      //     console.log(response.data);
      //   })

      //   this.$message({
      //     type: 'success',
      //     message: '新的成绩: ' + value,
      //   });
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '取消输入'
      //   });
      // });
    },
    updateStu() {
      this.dialogFormVisible = false
      console.log(this.indexNum)
      console.log(1111111)

      this.$axios({//输入sno sname ssex inyear pass major
        method: 'post',
        url: 'http://150.158.171.212:8080/updatestu',
        data: {
          "sno": this.form.sno.toString(),
          "sname": this.form.sname,
          "sex": this.form.sex,
          "inyear": this.form.inyear.toString(),
          "major": this.form.major,
          "tel": this.form.telphone,
          "pass": this.tableData[this.indexNum].pass,
        }
      }).then(response => { //不用返回任何信息，
        console.log(response.data) //在控制台中打印其data部分内容
        if (response.data == 1) {
          this.$message('修改学生信息成功！');
        } else {
          this.$message('修改学生信息失败！');
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