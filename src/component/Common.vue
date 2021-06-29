<template>
    
</template>

<script>
    export default {
        userName:"",
        userId:"10001",
        privilege:"s",
        name: "Common",
        courseId:"",
        l1:[
            {name:'/stuinfo',navItem:'学生个人信息'},
            {name:'/stuscore',navItem:'个人成绩查询'}
        ],
        l2:[
            {name:'/teainfo',navItem:'教师个人信息'},
            {name:'/teacourse',navItem:'授课信息'}
        ],
        l3:[
            {name:'/teainfo',navItem:'个人信息'},
            {name:'/teacourse',navItem:'授课信息'},
            {name:'/course',navItem:'课程信息管理'},
            {name:'/allstutable',navItem:'学生信息管理'},
            {name:'/stutable',navItem:'学生成绩管理'},
            {name:'/teatable',navItem:'教师信息管理'}
        ],
        navlist:[],
        data(){
            return {

            }
        }
    }
</script>

<style scoped>

</style>