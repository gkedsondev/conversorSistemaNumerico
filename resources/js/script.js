let input = document.getElementById("base-input");
let inputValue = document.getElementById("base-input-value");
let output = document.getElementById("base-output");
let result = document.getElementById("result-value");

let base = 0;
let convertedValue = 0;

const baseTypes = {
    "inv": ["--- Selecione uma base ---"],
    "bin": ["Binário", ['0','1']],
    "dec": ["Decimal", ['0','1','2','3','4','5','6','7','8','9']],
    "oct": ["Octal", ['0','1','2','3','4','5','6','7']],
    "hex": ["Hexadecimal", ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']]
};

function createOptions() {
    for (let key in baseTypes) {
        let option = `<option value="${key}" ${key === "inv" ? "selected" : ""}>${baseTypes[key][0]}</option>`;
        input.innerHTML += option;
        output.innerHTML += option;
    }
}

function toDecimal(){
    let receivedValue = inputValue.value.toString();
    let expoent = receivedValue.length - 1;
    convertedValue = 0;

    for(let digit=0; digit < receivedValue.length; digit++){

        switch(receivedValue[digit]){
            case 'A':
                convertedValue += 10 * base ** expoent;
                break;
            case 'B':
                convertedValue += 11 * base ** expoent;
                break;
            case 'C':
                convertedValue += 12 * base ** expoent;
                break;
            case 'D':
                convertedValue += 13 * base ** expoent;
                break;
            case 'E':
                convertedValue += 14 * base ** expoent;
                break;
            case 'F':
                convertedValue += 15 * base ** expoent;
                break;
            default:
                convertedValue += receivedValue[digit] * base ** expoent;
        }

        expoent--;
    }
}

function toOctal(){
    let octalNumber = '';
    
    toDecimal();

    while(convertedValue > 0){
        octalNumber = (convertedValue % 8).toString() + octalNumber;
        convertedValue = Math.floor(convertedValue / 8);
    }

    convertedValue = octalNumber;
}

function toBinary(){
    let binaryNumber = '';

    toDecimal();

    while(convertedValue > 0){
        binaryNumber = (convertedValue % 2).toString() + binaryNumber;
        convertedValue = Math.floor(convertedValue / 2);
    }

    convertedValue = binaryNumber;
}

function toHexadecimal(){
    let hexaNumber = '';
    
    toDecimal();

    while(convertedValue > 0){
        let remainder = convertedValue % 16;

        if (remainder < 10) {
            hexaNumber = remainder.toString() + hexaNumber;
        } else {
            hexaNumber = String.fromCharCode(remainder + 55) + hexaNumber;
        }

        convertedValue = Math.floor(convertedValue / 16);
    }

    convertedValue = hexaNumber;
}

function clear(){
    base = 0;
    convertedValue = 0;
    result.innerText = "";
}

function isValidBases(){
    return input.value !== "inv" && output.value !== "inv" && input.value !== output.value;
}

function isValidInput(){
    let inputValueAux = inputValue.value.toString().split("");
    let countDigitsInvalid = 0;

    inputValueAux.forEach(digitInput => {
        if(!baseTypes[input.value][1].includes(digitInput.toUpperCase())){
            countDigitsInvalid++;
        }
    });

    if(inputValueAux.length <= 0) countDigitsInvalid++;

    return !(countDigitsInvalid > 0);
}

function fillBase(){
    base = parseInt(input.value === 'hex' ? '16' : input.value === 'bin' ? '2' : input.value === 'oct' ? '8' : '10');
}

function callConverter(){
    switch(output.value){
        case 'bin':
            toBinary();
            break;
        case 'dec':
            toDecimal();
            break;
        case 'oct':
            toOctal();
            break;
        case 'hex':
            toHexadecimal();
            break;
    }
}

function validate(){
    if(!isValidBases()){
        throw "Conversão Inválida!";
    }else if(!isValidInput()){
        throw "Entrada inválida!";
    }
}

function baseConverter(){
    clear();

    try{
        validate()
        fillBase()
        callConverter()

        result.innerText = convertedValue;
    }catch(error){
        result.innerText = error;
    }

}

createOptions();