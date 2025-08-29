
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/bfhl', (req, res) => {
    const inputData = req.body.data;
    if (!inputData || !Array.isArray(inputData)) {
        return res.status(400).json({
            is_success: false,
            error: "Invalid input. Request body must contain a 'data' array."
        });
    }

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;

    inputData.forEach(item => {
        const numberValue = parseFloat(item);

        if (!isNaN(numberValue) && isFinite(numberValue)) {
            sum += numberValue;

            if (numberValue % 2 === 0) {
                evenNumbers.push(item);
            } else {
                oddNumbers.push(item);
            }
        } else if (item.length === 1 && /[a-zA-Z]/.test(item)) {
            alphabets.push(item.toUpperCase());
        } else if (item.length > 1 && /^[a-zA-Z]+$/.test(item)) {
            const charArray = item.split('').map(char => char.toUpperCase());
            alphabets.push(...charArray);
        } else {
            specialCharacters.push(item);
        }
    });

    const reversedAlphabets = alphabets.reverse();
    let concatString = "";

    for (let i = 0; i < reversedAlphabets.length; i++) {
        const char = reversedAlphabets[i];
       
        concatString += (i % 2 === 0) ? char.toUpperCase() : char.toLowerCase();
    }
    
    const response = {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialCharacters,
        sum: sum.toString(), 
        concat_string: concatString
    };

    res.status(200).json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});