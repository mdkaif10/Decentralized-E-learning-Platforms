
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ElearningPlatform {
    struct Credential {
        string courseName;
        string studentName;
        string credentialHash;
        bool isValid;
    }

    mapping(address => Credential) public credentials;
    mapping(address => uint256) public tokenBalance;

    event CredentialIssued(address indexed student, string courseName, string credentialHash);
    event TokensRewarded(address indexed student, uint256 amount);

    function issueCredential(address student, string memory courseName, string memory studentName, string memory credentialHash) public {
        credentials[student] = Credential(courseName, studentName, credentialHash, true);
        emit CredentialIssued(student, courseName, credentialHash);
    }

    function verifyCredential(address student) public view returns (string memory, string memory, string memory, bool) {
        Credential memory cred = credentials[student];
        return (cred.courseName, cred.studentName, cred.credentialHash, cred.isValid);
    }

    function rewardTokens(address student, uint256 amount) public {
        tokenBalance[student] += amount;
        emit TokensRewarded(student, amount);
    }

    function checkTokenBalance(address student) public view returns (uint256) {
        return tokenBalance[student];
    }
}
