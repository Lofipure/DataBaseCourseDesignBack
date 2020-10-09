const connection = require('../db');
const admin = require('./Administer');

/*
    - 只能查看和修改自己个人信息、已选课程成绩及总学分；
    - 修改自己密码；
    - 可以查看课程信息、授课及教师信息
    - 可以进行选课操作。
*/
let getInformation = (studentID) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from students where studentID = "${studentID}";`;
        connection.query(sql, (err, result) => {
            if (!err) {
                resolve(result);
            }
        });
    });
}

class Student {
    constructor(studentID) {
        this.studentID = studentID;
    }

    changePassword(newPassword) {
        let sql = `update students set studentPassword = "${newPassword}"
                   where studentID = "${this.studentID}";`;
        connection.query(sql, (err) => {
            console.log(sql);
            console.log("Change Success");
        })
    }

    async getInfo() {
        return await getInformation(this.studentID);
    }

    async getAlreadyChoice() {
        let sql = `select teachers.teacherName, course.courseName, Course.courseScore, teachers.teacherCollege, teachers.teacherEmail, teachers.teacherWork, courseChoice.grade
                    from courseChoice,course,teachers
                    where courseChoice.teacherID is not null
                    and courseChoice.teacherID = teachers.teacherID
                    and courseChoice.courseID = course.courseID
                    and courseChoice.studentID = "${this.studentID}";`;
        return await new Promise((resolve, reject) => {
            connection.query(sql, (err, data) => {
                if(!err) {
                    resolve(data);
                }
            });
        });
    }

    async getChoiceCourseList() {
        let sql = `select teachers.teacherName, course.courseName, course.courseScore, teachers.teacherCollege, teachers.teacherEmail, teachers.teacherWork, teachers.teacherID, course.courseID
                    from courseChoice,course,teachers
                    where courseChoice.teacherID is not null 
                    and courseChoice.teacherID = teachers.teacherID 
                    and courseChoice.courseID = course.courseID
                    and courseChoice.studentID is null;`;
        return await new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (!err) {
                    resolve(results);
                    console.log(results)
                }
            });
        });

    }
}

module.exports = Student;