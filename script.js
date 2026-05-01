const exportLink = document.getElementById("export");
const mainForm = document.forms.form;
const fileImport = mainForm.querySelector('[name="import"]');
const studentTable = mainForm.querySelector('[name="student-table"]');
const teacherTable = mainForm.querySelector('[name="teacher-table"]');

let myClass = new Class(null);

Class.display();
console.log(teacherTable);