<template>
    <div>
        <el-table :data="tableData" border style="width: 60%;margin:0 auto" @row-dblclick="dbClick" >
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
                <template slot-scope="scope">
                    <el-form :model="scope.row">
                        <el-form-item>
                            <el-input v-if="scope.row.isOK" v-model="scope.row.name" style="width:100%" ></el-input>
                            <span v-else>{{scope.row.name}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址">
                <template slot-scope="scope">
                    <el-form :model="scope.row">
                        <el-form-item size="mini" label-width="66px">
                            <el-input v-if="scope.row.isOK" v-model="scope.row.address" style="width:100%"></el-input>
                            <span v-else>{{scope.row.address}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
        </el-table>
        <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
        <el-button @click="onSubmit">登录</el-button>
    </div>
</template>


<script>
    export default {
        name:'Test',
        data() {
            return {
                tableData: [
                    {
                        date: "2016-05-02",
                        isOK: true,
                        name: "张三",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-02",
                        isOK: false,
                        name: "李四",
                        address: "上海市普陀区金沙江路 1518 弄"
                    }
                ],
                input: ''
            }
        },
        methods:{
            dbClick(row, event, column){
                row.isOK =!row.isOK
            },
            onSubmit(){
                // 向后端传递数据
                this.$axios({
                    method:'post', //方法选择post方法
                    url:"http://localhost:8080/post",	//对应的url
                    data:{	//按照对象的格式去组织data，key-value形式
                        "stu":this.input,
                        "pass":'23213'
                    }
                }).then(response => {
                    console.log(response.data)
                    console.log(response.data.date)
                    // 可以根据其返回值进行进一步的操作，post的请求的返回值一般为成功的返回码。
                })
                console.log(this.input)
            }
        }
    }
</script>

<style scoped>

</style>