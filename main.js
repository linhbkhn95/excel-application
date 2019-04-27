let codeCaculate = ['+', '-', '^', '/', '*']


function caculate(postfix, dataFormat, dataNeedCaculate, props) {
    var resultStack = [];
    let error = null;

    if (!postfix) {

        return null
    }
    postfix = postfix.split(" ");

    let temp;
    for (var i = 0; i < postfix.length; i++) {
        temp = postfix[i]
        if (temp === null) {
            return null
        }
        if (postfix[i].isNumeric()) {

            resultStack.push(postfix[i]);
        } else if (codeCaculate.includes(postfix[i])) {
            var a = resultStack.pop();
            var b = resultStack.pop();
            if (postfix[i] === "+") {
                resultStack.push(parseInt(a) + parseInt(b));
            } else if (postfix[i] === "-") {
                resultStack.push(parseInt(b) - parseInt(a));
            } else if (postfix[i] === "*") {
                resultStack.push(parseInt(a) * parseInt(b));
            } else if (postfix[i] === "/") {
                resultStack.push(parseInt(b) / parseInt(a));
            } else if (postfix[i] === "^") {
                resultStack.push(Math.pow(parseInt(b), parseInt(a)));
            }
        } else {
            // console.log('dataFormat----',postfix[i],dataFormat[postfix[i]])
            if (dataFormat && dataFormat[postfix[i]] && dataFormat[postfix[i]].toString().isNumeric()) {
                delete dataNeedCaculate[postfix[i]]
                resultStack.push(dataFormat[postfix[i]]);
                // console.log('vc;daa',temp);
            } else {
                if (checkExp(postfix[i], props)) {
                    return null
                } else {
                    let rs = caculate(dataFormat[postfix[i]], dataFormat, dataNeedCaculate, props)
                    dataFormat[postfix[i]] = rs
                    delete dataNeedCaculate[postfix[i]]

                    resultStack.push(rs)
                }
            }

        }
    }
    if (error) {
        return null;
    }
    if (resultStack.length > 1) {
        return null;
    } else {
        let data = resultStack.pop();
        if (data === null) {
            return null
        }
        dataFormat[props] = data;

        delete dataNeedCaculate[props];
        return dataFormat[props]
    }
}

String.prototype.isNumeric = function () {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

function isNumber(data) {
    return !isNaN(parseFloat(data)) && isFinite(data);

}
let vs = '5 3 6 * + 5 3 / - 7 +'

// console.log(caculate(vs))

function checkExp(arrayContainCell, cellName) {
    if (arrayContainCell && arrayContainCell.includes(' '))
        return arrayContainCell.split(' ').includes(cellName)
    else {
        return arrayContainCell.split('').includes(cellName)
    }

}

function convertData(array) {
    let data = {}
    let N;
    if (!array || !Array.isArray(array))
        return null

    let length = array.length - 1
    if (array.length > 0) {
        N = array[0];
        console.log('N=', N)
        for (var i = 1; i < length; i = i + 2) {
            arrayCell.push(array[i])
            if (array[i + 1] && array[i + 1].toString().isNumeric())
                dataNeedCaculate[array[i]] = array[i + 1]

            data[array[i]] = array[i + 1];

        }

    }
    return data;
}
let arrayCell = [];

let dataFormat = {};
let dataNeedCaculate = {};



//data input 
let dataExel = [
    6,
    'A1',
    5,
    'A2',
    'A1 5 * B1 +',
    'B1',
    'A3 C1 * B2 +',
    'A3',
    2,
    'B2',
    1,
    'C1',
    'B2 A1 6 * + 5 3 / - 7 +'
];



function main(dataFormat, dataNeedCaculate) {


    for (var props in dataNeedCaculate) {
        if (dataNeedCaculate[props] && !dataNeedCaculate[props].toString().isNumeric()) {
            let value = caculate(dataNeedCaculate[props], dataFormat, dataNeedCaculate, props);

            if (value == null) {
                console.log('Lỗi sai cú pháp tính toán hoặc sai trường khai báo')
                return false;
            }
        }
    }
    return true

}

// console.log('dataFormat',dataFormat,dataNeedCaculate)
// console.log('dataFormat=',dataFormat)
// console.log('dataNeedCaculate=',dataNeedCaculate)
dataFormat = convertData(dataExel, arrayCell)
if (dataFormat) {
    let result = main(dataFormat, dataNeedCaculate);
    if (result) {
        console.log('kết quả thuật toán tính toán là ')
        arrayCell.sort();
        arrayCell.forEach(cell => {
            console.log(cell, dataFormat[cell])
        })
    } else {
        alert('Lỗi sai cú pháp tính toán hoặc sai trường khai báo')
    }
} else {
    alert('Lỗi sai cú pháp tính toán hoặc sai trường khai báo')
}