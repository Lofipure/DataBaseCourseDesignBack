const router = require("koa-router")();
const admin = require("./model/Administer");
const Student = require("./model/Student");
const Teacher = require("./model/Teacher");
const course = require("./model/Course");
const courseChoice = require("./model/CourseChoice");

router.get('/admin/showAllUsers', async (ctx) => {
    ctx.body = await admin.getAllInfo();
});

router.post('/admin/addNewStudent', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        });
    }).then(data => {
        // 后端Controller接收到对象后，给Model传递
        admin.addNewStudent(data);
    });
    ctx.body = true;
});

router.post('/admin/addNewTeacher', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        });
    }).then(data => {
        admin.addNewTeacher(data);
    });

    ctx.body = true;
});

router.post('/admin/addNewCourse', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        });
    }).then(data => {
        admin.addNewCourse(data);
    });

    ctx.body = true;
})

router.get('/admin/deleteStudent', async (ctx) => {
    admin.deleteStudent(ctx.query.index);
    ctx.body = true;
});

router.get('/admin/deleteTeacher', async (ctx) => {
    console.log(ctx.query.index);
    admin.deleteTeacher(ctx.query.index);
    ctx.body = true;
});

router.get('/admin/deleteCourse', async (ctx) => {
    admin.deleteCourse(ctx.query.index);
    ctx.body = true;
});

router.post('/admin/updateStudent', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', data => {
            resolve(JSON.parse(postData));
        })
    }).then(data => {
        //console.log(data);
        admin.updateStudent(data);
    });

    ctx.body = true;
});

router.post('/admin/updateCourse', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        })
    }).then(data => {
        admin.updateCourse(data);
    });

    ctx.body = true;
});

router.post('/admin/updateTeacher', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        })
    }).then(data => {
        admin.updateTeacher(data);
    });

    ctx.body = true;
});

router.get('/student/getPassword', async (ctx) => {
    let obj = new Student(ctx.query.studentID);
    ctx.body = await obj.getInfo();
});

router.post('/student/changePassword', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        });
    }).then(data => {
        let studentObj = new Student(data.studentID);
        studentObj.changePassword(data.studentPassword);
    });
});

router.get('/student/getChoiceList', async (ctx) => {
    let obj = new Student(ctx.query.studentID);
    ctx.body = await obj.getChoiceCourseList();
});

router.get('/teacher/getPassword', async (ctx) => {
    let obj = new Teacher(ctx.query.teacherID);
    ctx.body = await obj.getInfo();
});

router.post('/teacher/changePassword', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = "";
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        });
    }).then(data => {
        let teacherObj = new Teacher(data.teacherID);
        teacherObj.changePassword(data.teacherPassword);
    });
});

router.get('/course/getAll', async (ctx) => {
    ctx.body = await course.getAllInfo();
});

router.post('/teacher/sendCourseChoice', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = "";
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        })
    }).then(data => {
        courseChoice.teacherChoiceCourse(data);
    });

    ctx.body = true;
});

router.get('/student/getAlreadyChoice', async (ctx) => {
    let obj = new Student(ctx.query.studentID);
    ctx.body = await obj.getAlreadyChoice();
});

router.get('/teacher/getAlreadyChoice', async (ctx) => {
    let obj = new Teacher(ctx.query.teacherID);
    ctx.body = await obj.getAlreadyChoice();
})

router.post('/student/choiceCourse', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        })
    }).then(data => {
        courseChoice.studentChoiceCourse(data);
    });
    ctx.body = true;
});

router.get('/teacher/getTeachCourse', async (ctx) => {
    ctx.body = await courseChoice.getTeachCourse(ctx.query.teacherID);
});

router.get('/teacher/getStudentList', async (ctx) => {
    ctx.body = await courseChoice.getStudentList(ctx.query.teacherID, ctx.query.courseID);
});

router.get('/teacher/inGradeForStudent', async (ctx) => {
    ctx.body = await courseChoice.inGradeForStudent(ctx.query.teacherID, ctx.query.courseID, ctx.query.studentID, ctx.query.grade);
});

module.exports = router;