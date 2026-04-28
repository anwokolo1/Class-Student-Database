const SEX = {
    FEMALE: 0,
    MALE: 1,
    INTERSEX: 2
}

class Class {
    constructor(teachers, students = null) {
        this.teachers;
        this.students;
        this.classSize = 0;
        
        for (let teacher in teachers) this.addTeacher(teacher);
        for (let student in students) this.addStudent(student);
    }

    addStudent(student=null) { // return the added student
        if (student !== null && student instanceof Student) {
            if (this.students.includes(student.getID())) return student;
            else throw new IDConflictError("Student ID already exists");
        }

        this.classSize++;

        return new Student();
    }

    removeStudent(ID) {
        
        this.classSize--;
    }

    /**
     * 
     * @param {*} teacher a Teacher object
     * @returns 
     */
    addTeacher(teacher=null) { // return the added tacher
        if (teacher !== null && teacher instanceof Teacher) return teacher;
        this.classSize++;
        return new Teacher();
    }

    removeTeacher(ID) {
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
        this.setSex(sex);
        this.setEmail(email);
        this.setID(ID);
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

class BadInputError extends Error {}

class BadClassOperationError extends Error {}