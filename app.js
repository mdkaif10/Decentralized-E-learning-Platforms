// src/App.js
import React, { useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';

const App = () => {
    const [student, setStudent] = useState('');
    const [courseName, setCourseName] = useState('');
    const [studentName, setStudentName] = useState('');
    const [credentialHash, setCredentialHash] = useState('');

    const issueCredential = async () => {
        try {
            await axios.post('http://localhost:3000/issue-credential', {
                student,
                courseName,
                studentName,
                credentialHash
            });
            alert('Credential issued!');
        } catch (error) {
            console.error('Error issuing credential', error);
        }
    };

    return (
        <div>
            <h2>Issue Credential</h2>
            <input type="text" placeholder="Student Address" value={student} onChange={e => setStudent(e.target.value)} />
            <input type="text" placeholder="Course Name" value={courseName} onChange={e => setCourseName(e.target.value)} />
            <input type="text" placeholder="Student Name" value={studentName} onChange={e => setStudentName(e.target.value)} />
            <input type="text" placeholder="Credential Hash" value={credentialHash} onChange={e => setCredentialHash(e.target.value)} />
            <button onClick={issueCredential}>Issue Credential</button>
        </div>
    );
};

export default App;
