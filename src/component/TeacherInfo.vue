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
        <el-form-item label="教工号：">
          <el-input v-model="formInline.id" ></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="formInline.name" ></el-input>
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
            prop="tid"
            label="教工号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="tname"
            label="姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="title"
            label="职称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="pass"
            label="密码"
            width="120">
        </el-table-column>
        <el-table-column
            prop="privilege"
            label="权限"
            width="200">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
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
  name: "TeacherInfo",
  data(){
    return{
      tableData: [{
        tid: '10001',
        tname: '庄朝晖',
        title: '副教授',
        pass: 'zzh10001',
        privilege: 't',
      }, {
        tid: '10006',
        tname: '严严',
        title: '教授',
        pass: 'yy10006',
        privilege: 't',
      }, {
        tid: '10008',
        tname: '高淳县',
        title: '助理教授',
        pass: 'gcx10008',
        privilege: 't',
      }, {
        tid: '10020',
        tname: '林紫雨',
        title: '副教授',
        pass: 'lzy10020',
        privilege: 't',
      }, {
        tid: '10033',
        tname: '吴素贞',
        title: '副教授',
        pass: 'wsz10033',
        privilege: 't',
      },  {
        tid: '10088',
        tname: '林文水',
        title: '教授',
        pass: 'lws10088',
        privilege: 't',
      }],
      navList:[
        {name:'/info',navItem:'个人信息'},
        {name:'/score',navItem:'成绩管理'}
      ],
      formInline: {
        id: '',
        name: ''
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