create database course_info;
use course_info;

create table students
(
    studentID varchar(12) primary key,
    sutdentName varchar(20) not null,
    studentGender varchar(4) not null,
    studentCollege varchar(20) not null,
    studentMajor varchar(20) not null,
    studentAge tinyint not null,
    studentTelephone varchar(12) not null,
    studentEmail varchar(40) not null,
    studentBirthday DATE not null,
    studentPassword varchar(40) not null
) charset = 'utf8';
create table teachers
(
    teacherID varchar(12) primary key,
    teacherName varchar(20) not null,
    teacherGender varchar(4) not null,
    teacherCollege varchar(20) not null,
    teacherWork varchar(12) not null,
    teacherTelephone varchar(12) not null,
    teacherEmail varchar(40) not null,
    teacherPassword varchar(40) not null
) charset = 'utf8';
create table course
(
    courseID varchar(12) primary key,
    courseName varchar(20) not null,
    courseScore tinyint not null
) charset = 'utf8';
create table courseChoice
(
    studentID varchar(12) ,
    teacherID varchar(12) ,
    courseID varchar(12) ,
    grade tinyint ,
    courseScore tinyint ,
    foreign key (studentID) references students (studentID),
    foreign key (teacherID) references teachers (teacherID),
    FOREIGN KEY (courseID) REFERENCES course (CourseID)
) charset = 'utf8';