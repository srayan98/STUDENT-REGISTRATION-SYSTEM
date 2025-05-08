document.addEventListener('DOMContentLoaded', () => //This event will tell the code to run everything within the braces after it has been fully loaded
{
    const form = document.getElementById('registration');//storing the data of student registration form 
    const records = document.getElementById('recordsholder');//storing the table of all the registered students

    let students = JSON.parse(localStorage.getItem('students')) || [];//JSON parsing is the method that tries to access the 'students' data from the local storage of the browser then it will be converted into javascript objects or arrays and eventually assign the results to students. If no data is found then an empty list would be taken
    function LocalStorage()
    {
        localStorage.setItem('students', JSON.stringify(students));//All the data of the registered students will be saved in the "student" key within the local storage. The JSON.stringify() is used to turn the students list into a JSON string for easy storage.
    }

    function  StudentsData()
    {
        if (students.length === 0)
        {
            records.innerHTML = " <p><i>No students registered yet.</i></p>";//If no student has been registered then the following message will constantly be shown.
            records.style.marginLeft = "25px";
            records.style.marginTop = "5px";
            return;
        }

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student ID</th>
                        <th>Email ID</th>
                        <th>Contact Number</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
        `;//creating the HTML structure for the table where the registered student data will be showcased

        students.forEach((student, index) => //The forEach() method is used to customise each of the table data accordingly. "student" is referring to the immediate student object and "index" is the position of the student.
        {
            tableHTML = tableHTML + `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.id}</td>
                    <td>${student.email}</td>
                    <td>${student.contact}</td>
                    <td>
                        <button onclick="EditData(${index})"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onclick="DeleteData(${index})"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });

        tableHTML = tableHTML + `</tbody></table>`;

        records.innerHTML = tableHTML;
    }

    form.addEventListener('submit', (e) =>//'e' here is a built-in object that specifies everything that happens upon the clicking of submit button
    {
        e.preventDefault();//prevents the default behaviour of an element from happening

        const name = document.getElementById('Name').value.trim();//Gets all the added data in the field and .trim() is used to cut out additional spaces
        const id = document.getElementById('ID').value.trim();
        const email = document.getElementById('mailid').value.trim();
        const contact = document.getElementById('contact').value.trim();

        if (!name || !id || !email || !contact) {
            alert("All the fields must be filled according to the criterias");//If there are no values then this alert message pops up
            return;
        }

        if (!/^[a-zA-Z ]+$/.test(name)) {//specifying that only alphabets would be accepted in the Student Name section. .test() is utilised to return the boolean value of the input. Any input other than the alphabets would return a "false" value.
            alert("Name must contain only alphabets");//Upon returning the false value, this alert message will show
            return;
        }

        if (!/^\d+$/.test(id)) {//specifying that only numbers would be accepted in the Student ID section
            alert("Student ID must contain only numbers");//Upon returning the false value, this alert message will show
            return;
        }

        if (!/^\d{10}$/.test(contact)) {//specifying that only a 10-digit number would be accepted in the Contact Number section
            alert("Contact Number must contain 10 digits");//Upon returning the false value, this alert message will show
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {//specifying that only the general mail id structure would be accepted in the Contact Number section
            alert("Invalid Email Address.");//Upon returning the false value, this alert message will show
            return;
        }

        students.push({ name, id, email, contact });//The student data is pushed to the array
        LocalStorage();//saved into the local storage of the browser
        StudentsData();//The table is now altered with the new data
        form.reset();//The form is reset for new data to be entered with the .reset() method
    });

    window.EditData = function(index)//Upon clicking the Edit icon, this function will run and the user will be able to edit their desired field 
    {
        const student = students[index];//This is used to access the specific student from the 'students' array with the index parameter helping to find the index of that student
        const newName = prompt("Edit Student Name : ", student.name);
        const newId = prompt("Edit Student Id : ", student.id);
        const newEmail = prompt("Edit Email Id : ", student.email);
        const newContact = prompt("Edit Contact No : ", student.contact);

        if (newName && /^[a-zA-Z ]+$/.test(newName))//It is to make sure that a value has been put inside this section and actually it is according to the criteria of this certain input field which in this case is Alphabets.
        {
            student.name = newName;
        }
        if (newId && /^\d+$/.test(newId))//similar types of verification is conducted for all the input fields in case the user needs to edit more than just one value
        {
            student.id = newId;
        }
        if (newEmail && /^\S+@\S+\.\S+$/.test(newEmail))
        {
            student.email = newEmail;
        }
        if (newContact && /^\d{10,15}$/.test(newContact))
        {
            student.contact = newContact;
        }

        LocalStorage();
        StudentsData();
    };

    window.DeleteData = function(index)//Upon clicking the delete icon, this function will run to assist the user in the deletion process
    {
        if (confirm("Are you sure you want to delete this registered student?"))
        {
            students.splice(index, 1);//.splice() method is to specify how many and from which index of the 'students' array is being targeted.
            LocalStorage();
            StudentsData();
        }
    };

    StudentsData();//Loads the entire student list upon calling the StudentsData function
});