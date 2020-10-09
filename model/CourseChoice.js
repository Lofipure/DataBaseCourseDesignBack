const connection = require("../db");
const course = require("./Course");

class CourseChoice {
    constructor() {
    }

    async teacherChoiceCourse(obj) {
        let courseScore = await course.getCourseScore(obj.courseID);
        let sql = `insert into courseChoice (teacherID, courseID, courseScore) values 
                    ('${obj.teacherID}', '${obj.courseID}', '${obj.courseScore}');`;
        connection.query(sql, (err) => {
            return !err;
        })
    }

    async studentChoiceCourse(obj) {
        let sql = `insert into courseChoice (studentID, teacherID, courseID, courseScore) values (
                    '${obj.studentID}', '${obj.teacherID}', '${obj.courseID}', '${obj.courseScore}');`;
        return await new Promise((resolve, reject) => {
            connection.query(sql, (err) => {
                if(!err) {
                    resolve(true);
                }
            });
        });
    }

    async getTeachCourse(teacherID) {
        let sql = `select courseName,courseID from course where courseID in 
        (select courseID from courseChoice where studentID is null and teacherID='${teacherID}');`;
        return await new Promise((resolve, reject) => {
            console.log(sql);
            connection.query(sql, (err, results) => {
                if(!err) {
                    resolve(results);
                }
            });
        });
    }

    async getStudentList(teacherID, courseID) {
        let sql = `select students.sutdentName, students.studentID, students.studentCollege,students.studentMajor,students.studentEmail ,courseChoice.grade
                    from students,courseChoice
                    where students.studentID = courseChoice.studentID 
                    and courseChoice.teacherID = '${teacherID}' 
                    and courseChoice.courseID = '${courseID}';`
        return await new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (!err) {
                    // console.log(results);
                    resolve(results);
                }
            });
        });
    }

    async inGradeForStudent(teacherID, courseID, studentID, grade) {
        let sql = `update courseChoice set grade = ${grade} where courseID = '${courseID}' 
                and teacherID = '${teacherID}' and studentID = '${studentID}';`;
        return await new Promise((resolve, reject) => {
            connection.query(sql, err => {
                console.log(sql);
                if (!err) {
                    resolve(true);
                }
            });
        });
    }
}

let courseChoice = new CourseChoice();

module.exports = courseChoice;