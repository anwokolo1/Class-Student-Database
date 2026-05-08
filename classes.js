const SEX = {
    FEMALE: 0,
    MALE: 1,
    INTERSEX: 2
}

function createHeader(title) {
    let header = document.createElement("th");
    header.textContent = title;
    return header;
}

class Class {
    constructor(teachers = [], students = []) {
        this.teachers = new Map();
        this.students = new Map();
        this.classSize = 0;
        
        for (let teacher of teachers) this.addTeacher(teacher);
        for (let student of students) this.addStudent(student);
    }

    addStudent(student=null) { // return the added student
        if (student && !(student instanceof Student)) throw new TypeError(`student not of type Student but of type ${typeof(student)}`);
        let myStudent;
        if (student && !this.students.has(student.getID())) {
            this.students.set(student.getID(), student);
            myStudent = student;
        }
        else if (!student) {
            myStudent = new Student(); 
            let ID;
            while (ID && !this.students.has(ID)) {
                ID = myStudent.generateID();
            }
            myStudent.setID(ID);
            this.students.set(myStudent.getID(), myStudent);
        }
        else {throw new IDConflictError("Student ID already exists");}
    
        this.classSize++;
        this.display();
        return myStudent;
    }

    /**
     * 
     * @param {*} ID String of Student ID
     */
    removeStudent(ID) {
        if (!this.students.has(ID)) throw new NullIDError(`Student ID ${ID} doesn't exist`);
        this.students.delete(ID);
        this.classSize--;
        this.display();
    }

    /**
     * 
     * @param {*} teacher a Teacher object
     * @returns 
     */
    addTeacher(teacher=null) { // return the added tacher
        if (teacher && !(teacher instanceof Teacher)) throw new TypeError(`student not of type Student but of type ${typeof(teacher)}`);
        let myTeacher;
        if (teacher && !this.teachers.has(teacher.getID())) {
            this.teachers.set(teacher.ID, teacher);
            myTeacher = teacher;
        }
        else if (!teacher) {
            myTeacher = new Teacher(); 
            let ID;
            while (ID && !this.teachers.has(ID)) {
                ID = myTeacher.generateID();
            }
            myTeacher.setID(ID);
            this.teachers.set(myTeacher.getID(), myTeacher);
        }
        else {throw new IDConflictError("Teacher ID already exists");}
    
        this.classSize++;
        this.display();
        return myTeacher;
    }

    /**
     * 
     * @param {*} ID string of Teacher ID
     */
    removeTeacher(ID) {
        if (!this.teachers.has(ID)) throw new NullIDError(`Teacher ID ${ID} doesn't exist`);
        this.teachers.delete(ID);
        this.classSize--;
        this.display();
    }

    displayReset() {
        teacherTable.innerHTML = "";
        studentTable.innerHTML = "";

        teacherTable.append(createHeader("Teacher"));
        studentTable.append(createHeader("Student"));
    }

    display() {
        /*displays HTML table*/
        //display Teacher table first
        let br = document.createElement("br");
        for (let teacher of this.teachers) {
            teacherTable.append(teacher[1].element);
        }

        studentTable.append(createHeader("Students"));
        for (let student of this.students) {
            studentTable.append(student[1].element);
        }
    }
    import(JSONFile) {
        /*imports table and displays it*/
    }
    export() {
        /*exports current class object as JSONFILE*/
        console.log(this.toString());
        let s = "data:text/json;charset=utf-8," + encodeURIComponent(this.toString());
        exportLink.setAttribute("href", s);
        exportLink.setAttribute("download", "db.json");
    }
    toString() {
        /*returns the JSON string*/
        let totalJSON = {};
        totalJSON["Teachers"] = [];
        totalJSON["Students"] = [];
        for (let i of this.teachers) {
            totalJSON.push(i[1]);
        }
        for (let i of this.students) {
            totalJSON.push(i[1]);
        }
        return JSON.stringify(totalJSON);
    }
}

class Entity {
    

    constructor(name = "", nickname = "", sex=null, email="", ID=null) {
        this.name;
        this.nickname;
        this.sex;
        this.email;
        this.ID;
        this.element = document.createElement("tr");
        this.element.style.border = "1px solid black";

        this.setName(name);
        this.setNickname(nickname);
        this.setSex(sex);
        this.setEmail(email);
        this.setID(ID);
    }

    setName(name) {console.log("ran");this.name = name;}
    setNickname(nickname) {this.nickname = nickname;}
    setSex(sex) {
        //if (sex && !(sex instanceof SEX)) throw new BadInputError(`Invalid input. Type of sex = ${typeof(sex)}`);
        this.sex = sex;
    }
    setEmail(email) {this.email = email;}
    setID(ID) {
        const ID_VALIDATION = /^\d{0,9}/; // assume all schools use this scheme
        //check if ID fits requirements using regex or smth
        if (!ID || (ID instanceof String && ID_VALIDATION.test(ID))) this.ID = ID;
        else throw new BadInputError("Bad formatting of ID. Needs to be 9 digit integer of type String.")
    }

    generateID() {
        let ID; 

        ID = new String(Math.floor((Math.random() * Math.pow(10, 9))));

        return ID;
    }

    // returns all of these formattetd
    getName() {if (!this.name) return "N/A"; else return this.name;}
    getNickname() {if (!this.nickname) return "N/A"; else return this.nickname;}
    getSex() {if (!this.sex) return "N/A"; return this.sex;}
    getEmail() {if (!this.email) return "N/A"; else return this.email;}
    getID() {if (!this.ID) return "N/A"; else return this.ID;}

    toString() {

    }
}

class Student extends Entity {
    constructor(name = "", nickname = "", sex=null, email="", ID=null) {

        super(name, nickname, sex, email, ID);
        
        let properties = Object.entries(this);
        // assign data cells
        for (let i = 0; i < properties.length; i ++) {
            if (properties[i][1] === this.element) continue;

            let cell = document.createElement("td");
            let input = document.createElement("input")

            input.type = "text";

            let myFunc;
            let val = properties[i][1] ? properties[i][1] : "";
            switch (properties[i][0]) {
                case "name":
                    input.onchange = () => {input.textContent, input.value = val; console.log(val); this.setName.bind(this, (String(input.value)))};
                    break;
                case "nickname":
                    input.onchange = this.setNickname.bind(this, (String(input.value)));
                    break;
                case "sex":
                    input.onchange = this.setSex.bind(this, (String(input.value)));
                    break;
                case "email":
                    input.onchange = this.setEmail.bind(this, (String(input.value)));
                    break;
                case "ID":
                    input.onchange = this.setID.bind(this, (String(input.value)));
                    break;
            }

            cell.append(input);
            this.element.append(cell);
        }
    }
}

class Teacher extends Entity {

    constructor(name = "", nickname = "", sex=undefined, email="", phone=undefined, ID=undefined) {
        super(name, nickname, sex, email, ID);
        this.phone = phone;

        let properties = Object.entries(this);
        // assign data cells
        for (let i = 0; i < properties.length; i ++) {
            if (properties[i][1] === this.element) continue;

            let cell = document.createElement("td");
            let input = document.createElement("input")

            input.type = "text";

            let myFunc;
            let val = properties[i][1] ? properties[i][1] : "";
            console.log("val", properties[i][1]);
            switch (properties[i][0]) {
                case "name":
                    input.onchange = this.setName.bind(this, (String(input.value)));
                    break;
                case "nickname":
                    input.onchange = this.setNickname.bind(this, (String(input.value)));
                    break;
                case "sex":
                    input.onchange = this.setSex.bind(this, (String(input.value)));
                    break;
                case "email":
                    input.onchange = this.setEmail.bind(this, (String(input.value)));
                    break;
                case "ID":
                    input.onchange = this.setID.bind(this, (String(input.value)));
                    break;
                case "phone":
                    input.onchange = this.setPhone.bind(this, (String(input.value)));
                    break;
            }

            cell.append(input);
            this.element.append(cell);
        }
    }

    setPhone(phone) {this.phone = phone;}
    getPhone() {if (!this.phone) return "N/A"; else return this.phone;}
}

class IDConflictError extends Error {}

class NullIDError extends Error{}

class BadInputError extends Error {}

class BadClassOperationError extends Error {}