import xlsx from 'xlsx';
import fs from 'fs';
import CellOperations from '../../utils/CellOperations.js';
import { promises as fsp } from 'fs'; // Importamos fs.promises



const generateFile = async (body) => {

    const fileNameExcel = body.file
    let fecha = CellOperations.formatDateCompact(body.fecha)
    let numeroDocumento = body.numero
    let notas = body.notas
    let company = body.company
    let tipoDocumento = body.type

    let messageLog = ""
    let success = true;
    const ColumNum = 13


    console.log("ingreso a nomina")
    const filePath = `./files/${fileNameExcel}`;
    const outputFileLog = `./files/log_${fileNameExcel}`;
    const plainName = fileNameExcel.replace(".xlsx", '.txt')
    //console.log(filePath)
    const outputFile = './files/' + plainName;

    console.log("ingreso a nomina 2")

    if (fs.existsSync(filePath)) {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const range = xlsx.utils.decode_range(sheet['!ref']);

        range.e.c = ColumNum;
        sheet['!ref'] = xlsx.utils.encode_range(range);
        const logColumnaLetra = xlsx.utils.encode_col(ColumNum);


        let fileContent = '';
        /// PRIMER REGISTRO ///
        let valorVacio = "+000000000000000.0000"
        let numeroDeRegistro = CellOperations.addCcharacterToTheLeft(1, 7, '0')
        let tipoDeRegistro = '0000'
        let subTipoDeRegistro = '00'
        let versionRegistro = '01'
        let primerRegistro = `${numeroDeRegistro}${tipoDeRegistro}${subTipoDeRegistro}${versionRegistro}${company}`

        /// SEGUNDO REGISTRO ///
        numeroDeRegistro = CellOperations.addCcharacterToTheLeft(2, 7, '0')
        let tipoRegistro = '0350'
        versionRegistro = '02' // porque es diferente acá
        let esAutomatico = '1'
        let centroOperacion = '030'
        tipoDocumento = CellOperations.addCcharacterToTheRight(tipoDocumento, 3, ' ')
        numeroDocumento = CellOperations.addCcharacterToTheLeft(numeroDocumento, 8, '0')
        let claseDocumento = '00030'
        let tercero = CellOperations.characterGenerator(15, ' ')
        let estado = '0'
        let impreso = '0'
        notas = CellOperations.addCcharacterToTheRight(notas, 255, ' ')
        let idMandato = CellOperations.characterGenerator(15, ' ')

        let segundoRegistro = `${numeroDeRegistro}${tipoRegistro}${subTipoDeRegistro}${versionRegistro}${company}${esAutomatico}${centroOperacion}`
        segundoRegistro += `${tipoDocumento}${numeroDocumento}${fecha}${tercero}${claseDocumento}${estado}${impreso}${notas}${idMandato}`;


        fileContent += primerRegistro + '\n';
        fileContent += segundoRegistro + '\n';

        let counterRows = 3;


        for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
            let rowData = [];


            numeroDeRegistro = CellOperations.addCcharacterToTheLeft(counterRows, 7, '0')
            tipoRegistro = '0351'

            let centroOperacionDocumento = '030'



            rowData.push(numeroDeRegistro);
            rowData.push(tipoRegistro);
            rowData.push(subTipoDeRegistro);
            rowData.push(versionRegistro);
            rowData.push(company);
            rowData.push(centroOperacionDocumento);
            rowData.push(tipoDocumento);
            rowData.push(numeroDocumento);

            ///CUENTA///
            let cellAddress = xlsx.utils.encode_cell({ c: 4, r: rowNum });
            let cell = sheet[cellAddress];
            let cuenta = cell.v
            messageLog = CellOperations.validateLength(cuenta, 20, "cuenta", messageLog, "E")
            cuenta = CellOperations.addCcharacterToTheRight(cuenta, 20, ' ')
            rowData.push(cuenta);

            ///TERCERO///
            cellAddress = xlsx.utils.encode_cell({ c: 3, r: rowNum });
            cell = sheet[cellAddress];
            tercero = cell.v
            messageLog = CellOperations.validateLength(tercero, 20, "tercero", messageLog, "D")
            tercero = CellOperations.addCcharacterToTheRight(tercero, 15, ' ')
            rowData.push(tercero);

            ///CENTRO OPERACIONES MOVIMIENTO///
            cellAddress = xlsx.utils.encode_cell({ c: 8, r: rowNum });
            cell = sheet[cellAddress];
            let centroOperaciones = cell.v
            let centroOperacionMovimieno = '030'
            if (centroOperaciones != '0') {
                centroOperacionMovimieno = centroOperaciones
            }
            messageLog = CellOperations.validateLength(centroOperacionMovimieno, 3, "Centro", messageLog, "I")
            centroOperacionMovimieno = CellOperations.addCcharacterToTheLeft(centroOperacionMovimieno, 3, '0')
            rowData.push(centroOperacionMovimieno);

            ///DATOS POR DEFECTO///
            let codigoUnidadNegocio = CellOperations.addCcharacterToTheRight('01', 20, ' ')
            let codigoCentroCosto = CellOperations.characterGenerator(15, ' ')
            let codigoConceptoFlujo = CellOperations.characterGenerator(10, ' ')
            rowData.push(codigoUnidadNegocio);
            rowData.push(codigoCentroCosto);
            rowData.push(codigoConceptoFlujo);



            cellAddress = xlsx.utils.encode_cell({ c: 10, r: rowNum });
            cell = sheet[cellAddress];
            let tipoMov = cell.v


            cellAddress = xlsx.utils.encode_cell({ c: 11, r: rowNum });
            cell = sheet[cellAddress];
            let valor = cell.v
            messageLog = CellOperations.isNumber(valor, "Valor", messageLog, "L")
            messageLog = CellOperations.validateLength(valor, 20, "Valor", messageLog, "L")

            if (tipoMov == 'D') {
                valor = CellOperations.addDecimalPart(valor)
                valor = CellOperations.addCcharacterToTheLeft(valor, 20, '0')
                valor = CellOperations.addPlus(valor)
                rowData.push(valor);
                rowData.push(valorVacio);
            }
            else {
                valor = CellOperations.addDecimalPart(valor)
                valor = CellOperations.addCcharacterToTheLeft(valor, 20, '0')
                valor = CellOperations.addPlus(valor)
                rowData.push(valorVacio);
                rowData.push(valor);
            }


            ///VALORES POR DEFECTO///
            rowData.push(valorVacio);
            rowData.push(valorVacio);
            rowData.push(valorVacio);
            let docBanco = CellOperations.characterGenerator(2, ' ')
            let numDocBanco = CellOperations.characterGenerator(8, '0')
            rowData.push(docBanco);
            rowData.push(numDocBanco);


            cellAddress = xlsx.utils.encode_cell({ c: 9, r: rowNum });
            cell = sheet[cellAddress];
            let detalle = cell.v
            messageLog = CellOperations.validateLength(detalle, 255, "Detalle", messageLog, "J")
            detalle = CellOperations.addCcharacterToTheRight(detalle, 255, ' ')
            rowData.push(detalle);



            fileContent += rowData.join('') + '\n'; // Cada fila será una línea en el archivo de texto
            //console.log(`Fila ${rowNum + 1}:`, rowData);



            try {
                const logCellAddress = xlsx.utils.encode_cell({ c: ColumNum, r: rowNum });
                let cellLog = sheet[logCellAddress];
                if (cellLog) {
                    console.log("se modifica el valor")
                    const nuevoValor = `${cellLog.v} - ${messageLog}`;
                    sheet[logCellAddress].v = nuevoValor;
                    messageLog = ""
                } else {
                    console.log("es una nueva columna")
                    sheet[logCellAddress] = { v: messageLog };
                    messageLog = ""
                }
            }
            catch (err) {
                console.log("ERROR EDITANDO", err)
            }

            counterRows++;
        }

        numeroDeRegistro = CellOperations.addCcharacterToTheLeft(counterRows, 7, '0')
        tipoDeRegistro = '9999'
        let ultimoRegistro = `${numeroDeRegistro}${tipoDeRegistro}${subTipoDeRegistro}${versionRegistro}${company}`
        fileContent += ultimoRegistro + '\n';

        xlsx.writeFile(workbook, outputFileLog);

        try {
            await fsp.writeFile(outputFile, fileContent);
            console.log('Archivo de texto creado con éxito:', outputFile);
        } catch (err) {
            console.error('Error al escribir el archivo:', err);
        }




    } else {
        console.error('El archivo no existe.');
    }
}








export default {
    generateFile
};






