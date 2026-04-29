const SEX = {
    FEMALE: 0,
    MALE: 1,
    INTERSEX: 2
}

class Class {
    constructor(teachers, students = null) {
        this.teachers = new Map();
        this.students = new Map();
        this.classSize = 0;
        
        for (let teacher in teachers) this.addTeacher(teacher);
        for (let student in students) this.addStudent(student);
    }

    addStudent(student=null) { // return the added student
        if (!(student instanceof Student)) throw new TypeError(`student not of type Student but of type ${typeof(student)}`);
        let myStudent;
        if (student && !this.students.includes(student.getID())) {
            this.students.set(student.ID, student);
            myStudent = student;
        }
        else if (!student) {myStudent = new Student();}
        else {throw new IDConflictError("Student ID already exists");}
    
        this.classSize++;
        return myStudent;
    }

    removeStudent(ID) {
        if (!this.students.has(ID)) throw new NullIDError(`Student ID ${ID} doesn't exist`);
        this.students.delete(ID);
        this.classSize--;
    }

    /**
     * 
     * @param {*} teacher a Teacher object
     * @returns 
     */
    addTeacher(teacher=null) { // return the added tacher
        if (!(teacher instanceof Student)) throw new TypeError(`student not of type Student but of type ${typeof(teacher)}`);
        let myTeacher;
        if (teacher && !this.teachers.includes(teacher.getID())) {
            this.teachers.set(teacher.ID, teacher);
            myTeacher = teacher;
        }
        else if (!teacher) {myTeacher = new Student();}
        else {throw new IDConflictError("Student ID already exists");}
    
        this.classSize++;
        return myTeacher;
    }

    removeTeacher(ID) {
        if (!this.teachers.has(ID)) throw new NullIDError(`Teacher ID ${ID} doesn't exist`);
        this.teachers.delete(ID);
        this.classSize--;
    }

    static display() {/*displays HTML table*/}
    static import(JSONFile) {/*imports table and displays it*/}
    static export() {
        /*exports current class object as JSONFILE*/
    }
}

class Entity {
    ID;
    ID_VALIDATION = /^\d+9/; // assume all schools use this scheme

    constructor(name = "", nickname = "", sex=null, email="", ID=null) {
        this.name;
        this.nickname;
        this.sex;
        this.email;
        this.ID;

        this.setName(name);
        this.setNickname(nickname);
        if (sex) this.setSex(sex);
        if (email) this.setEmail(email);
        if (ID) this.setID(ID);
    }

    setName(name) {this.name = name;}
    setNickname(nickname) {this.nickname = nickname;}
    setSex(sex) {
        if (sex && !(sex instanceof SEX)) throw new BadInputError(`Invalid input. Type of sex = ${typeof(sex)}`);
        this.sex = sex;
    }
    setEmail(email) {this.email = email;}
    setID(ID) {
        //check if ID fits requirements using regex or smth
        if (typeof(ID) === String && this.ID_VALIDATION.test(ID)) this.ID = ID;
        else throw new BadInputError("Bad formatting of ID. Needs to be 9 digit integer of type String.")
    }

    generateID() {
        let ID; 

        ID = Math.floor((Math.random() * Math.pow(10, 9)));

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
    }
}

class Teacher extends Entity {
    constructor(name = "", nickname = "", sex=null, email="", phone=null, ID=null) {
        super(name, nickname, sex, email, ID);
        this.phone = phone;
    }

    getPhone() {if (!this.phone) return "N/A"; else return this.phone;}
}

class IDConflictError extends Error {}

class NullIDError extends Error{}

class BadInputError extends Error {}

class BadClassOperationError extends Error {}