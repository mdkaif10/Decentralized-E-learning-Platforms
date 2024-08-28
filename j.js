// server.js
const express = require('express');
const Web3 = require('web3');
const app = express();
const port = 3000;

// Initialize Web3 with a local blockchain (e.g., Ganache)
const web3 = new Web3('http://localhost:7545');

// ABI and contract address from the compiled Solidity contract
const contractABI = [/* ABI array from compiled contract */];
const contractAddress = '0xYourContractAddressHere';

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(express.json());

app.post('/issue-credential', async (req, res) => {
    const { student, courseName, studentName, credentialHash } = req.body;
    const accounts = await web3.eth.getAccounts();

    try {
        await contract.methods.issueCredential(student, courseName, studentName, credentialHash).send({ from: accounts[0] });
        res.send('Credential Issued');
    } catch (error) {
        res.status(500).send('Error issuing credential');
    }
});

app.get('/verify-credential/:student', async (req, res) => {
    const { student } = req.params;

    try {
        const result = await contract.methods.verifyCredential(student).call();
        res.send(result);
    } catch (error) {
        res.status(500).send('Error verifying credential');
    }
});

app.post('/reward-tokens', async (req, res) => {
    const { student, amount } = req.body;
    const accounts = await web3.eth.getAccounts();

    try {
        await contract.methods.rewardTokens(student, amount).send({ from: accounts[0] });
        res.send('Tokens Rewarded');
    } catch (error) {
        res.status(500).send('Error rewarding tokens');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
