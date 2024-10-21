

function addCcharacterToTheLeft(value, quantity, character) {
    let longitud = value.length
    if (longitud > quantity) {
        value = value.substring(0, quantity);
    }
    const str = String(value);
    const result = str.padStart(quantity, character);
    return result
}

function addCcharacterToTheRight(value, quantity, character) {
    let longitud = value.length
    if (longitud > quantity) {
        value = value.substring(0, quantity);
    }
    const str = String(value);
    const result = str.padEnd(quantity, character);
    return result
}

function addDecimalPart(value) {
    let str = String(value);
    let vec = str.split(".");
    if (vec.length == 1)
        return value + ".0000";
    else {
        let longitud = vec[1].length
        if (longitud == 0)
            return value + ".0000";
        else if (longitud == 1)
            return value + "000";
        else if (longitud == 2)
            return value + "00";
        else if (longitud == 3)
            return value + "0";
        else if (longitud == 4)
            return value;
        else
            return value;


    }


}


function addPlus(value) {
    const result = "+" + value;
    return result
}


function characterGenerator(quantity, character) {
    const str = String("");
    const result = str.padEnd(quantity, character);
    return result
}

function validateLength(value, quantity, fieldName, messageLog, letter) {
    let longitud = value.length
    if (longitud > quantity) {
        if (messageLog == "")
            return `${letter}) ${fieldName} Largo`
        else
            return `${messageLog} - ${letter}) ${fieldName} Largo`
    }
    else {
        return messageLog
    }
}

function isNumber(value, fieldName, messageLog, letter) {   
        if (typeof value === 'number' && isFinite(value)) {
           return messageLog
        }
        else {
            if (messageLog == "")
                return `${letter}) ${fieldName} debe ser numero`
            else
                return `${messageLog} - ${letter}) ${fieldName} debe ser numero`
        }
}


function formatDateCompact(fechaISO) {
    const fecha = new Date(fechaISO);
    const year = fecha.getUTCFullYear();
    const month = String(fecha.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan desde 0
    const day = String(fecha.getUTCDate()).padStart(2, '0');
    const fechaCompacta = `${year}${month}${day}`;
    return fechaCompacta
}

function removeSpecialCharacters(texto) {
    texto = String(texto)
    texto =  texto.replace(/[^a-zA-Z0-9 ]/g, '');
    return texto


}





export default {
    addCcharacterToTheLeft,
    addCcharacterToTheRight,
    addDecimalPart,
    characterGenerator,
    addPlus,
    validateLength,
    formatDateCompact,
    isNumber,
    removeSpecialCharacters
}