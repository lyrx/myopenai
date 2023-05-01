// Define a Person interface
interface Person {
    firstName: string;
    lastName: string;
    age: number;
    introduce(): string;
}

// Define a Student class that implements the Person interface
class Student implements Person {
    firstName: string;
    lastName: string;
    age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    introduce(): string {
        return `Hello, my name is ${this.firstName} ${this.lastName}, and I am ${this.age} years old.`;
    }
}

// Function that takes a Person object and prints their details
function printPersonDetails(person: Person): void {
    console.log(person.introduce());
}

// Create a new Student object
const student = new Student("John", "Doe", 25);

// Print the student's details
printPersonDetails(student);
