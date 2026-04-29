const exportLink = document.getElementById("export");
const mainForm = document.forms.form;
const fileImport = mainForm.querySelector('[name="import"]');
const studentTable = mainForm.querySelector('[name="student-table"]');
const teacherTable = mainForm.querySelector('[name="teacher-table"]')

let teacher = new Student();

console.log(teacher.generateID());

