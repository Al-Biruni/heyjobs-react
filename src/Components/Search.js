import React, {useState} from 'react';
import {STUDENTS} from "../studentsList";

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const [year, month, day] = joiningDate.split('-');
    const [yyyy, mm, dd] = validityDate.split('-');
    const maxValid = new Date(yyyy, mm - 1, dd);
    const selected = new Date(year, month - 1, day);
    return (maxValid >= selected) && (maxValid >= today);
}

const studentsList = STUDENTS;


function Search({setErrorFun, updateResidentsFun}) {
    const [searchText, setSearchText] = useState("");
    const [joiningDate, setJoiningDate] = useState("");

    const onStudentAdd = () => {
        let selectedStudent = studentsList.filter(student => student.name.toLowerCase() === (searchText.toLowerCase()));
        if (selectedStudent.length == 0) {
            setErrorFun(`Sorry, ${searchText} is not a verified student!`);
        } else if (!checkValidity(joiningDate, selectedStudent[0].validityDate)) {
            setErrorFun(`Sorry, ${selectedStudent[0].name}'s validity has Expired!`);
        } else {
            setErrorFun(null);
            setSearchText("");
            setJoiningDate("");
            updateResidentsFun(selectedStudent[0]);

        }
    };
    return (
        <div className="my-50 layout-row align-items-end justify-content-end">
            <label htmlFor="studentName">Student Name:
                <div>
                    <input value={searchText} onChange={(text) => setSearchText(text.target.value)} id="studentName"
                           data-testid="studentName" type="text" className="mr-30 mt-10"/>
                </div>
            </label>
            <label htmlFor="joiningDate">Joining Date:
                <div>
                    <input value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} id="joiningDate"
                           data-testid="joiningDate" type="date" className="mr-30 mt-10"/>
                </div>
            </label>
            <button onClick={onStudentAdd} type="button" data-testid="addBtn" className="small mb-0">Add</button>
        </div>
    );
}

export default Search;
