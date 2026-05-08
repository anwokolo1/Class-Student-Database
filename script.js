const exportLink = document.getElementById("export");
const mainForm = document.forms.form;
const fileImport = mainForm.querySelector('[name="import"]');
const studentTable = mainForm.querySelector('[name="student-table"]');
const teacherTable = mainForm.querySelector('[name="teacher-table"]');
const studentSubmitBttn = mainForm.querySelector('[name="addStudent"]');
const teacherSubmitBttn = mainForm.querySelector('[name="addTeacher"]');

let teacher = new Teacher();
let student = new Student("urmom","e","e");
let myClass = new Class([teacher]);

teacherSubmitBttn.addEventListener("click", function(e) {
    e.preventDefault();
    myClass.addTeacher();
});
studentSubmitBttn.addEventListener("click", function (e) {
    e.preventDefault();
    myClass.addStudent();
});

exportLink.onclick = myClass.export;

myClass.addStudent(student);
console.log(myClass);
myClass.displayReset();
myClass.display();