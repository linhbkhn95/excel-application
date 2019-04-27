let codeCaculate = ['+', '-', '^', '/', '*']


function caculate(postfix, dataReady, dataNeedCaculate, prop) {
    var resultStack = [];
    let error = null;

    if (postfix === null || postfix === '' || postfix === undefined) {

        return null
    }
    postfix = postfix.split(" ");

    for (var i = 0; i < postfix.length; i++) {
        if (postfix[i] === null) {
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
            // console.log('dataReady----',postfix[i],dataReady[postfix[i]])
            if (dataReady && dataReady[postfix[i]] && dataReady[postfix[i]].toString().isNumeric()) {
                delete dataNeedCaculate[postfix[i]]
                resultStack.push(dataReady[postfix[i]]);
                // console.log('vc;daa',temp);
            } else {

                if (checkExp(postfix[i], prop)) {
                    return null
                } else {
                    let rs = caculate(dataNeedCaculate[postfix[i]], dataReady, dataNeedCaculate, prop)
                    dataReady[postfix[i]] = rs
                    delete dataNeedCaculate[postfix[i]]

                    resultStack.push(rs)
                }
            }

        }
    }

    if (resultStack.length > 1) {
        return null;
    } else {
        let data = resultStack.pop();
        if (data === null) {
            return null
        }
        dataReady[prop] = data;

        delete dataNeedCaculate[prop];
        return dataReady[prop]
    }
}

String.prototype.isNumeric = function () {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

function isNumber(data) {
    return !isNaN(parseFloat(data)) && isFinite(data);

}


function checkExp(arrayContainCell, cellName) {
    if (arrayContainCell && arrayContainCell.includes(' '))
        return arrayContainCell.split(' ').includes(cellName)
    else {
        return arrayContainCell.split('').includes(cellName)
    }

}

function convertData(array) {
    let dataReady = {}
    let dataNeedCaculate = {}
    let N;
    if (!array || !Array.isArray(array))
        return {
            dataReady: null
        }

    let length = array.length - 1
    // console.log('data==',array)
    if (array.length > 0) {
        N = array[0];
        console.log('N=', N)
        for (var i = 1; i < length; i = i + 2) {
            arrayCell.push(array[i])
            if (array[i + 1] && !array[i + 1].toString().isNumeric())
                dataNeedCaculate[array[i]] = array[i + 1]

            else {
                dataReady[array[i]] = array[i + 1];
            }

        }

    }
    return {
        dataReady,
        dataNeedCaculate
    }
}
let arrayCell = [];

// let dataReady = {};
// let dataNeedCaculate = {};
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
    'C1',
    'C1',
    'B2 A1 6 * + 5 3 / - 7 +'
];

let {
    dataReady,
    dataNeedCaculate
} = convertData(dataExel, arrayCell)
if (dataReady) {
    function main(dataReady, dataNeedCaculate) {


        for (var prop in dataNeedCaculate) {
            if (dataNeedCaculate[prop] && !dataNeedCaculate[prop].toString().isNumeric()) {
                let value = caculate(dataNeedCaculate[prop], dataReady, dataNeedCaculate, prop);

                if (value === null) {
                    console.log('Lỗi sai cú pháp tính toán hoặc sai trường khai báo')
                    return false;
                }
            }
        }
        return true

    }


    let result = main(dataReady, dataNeedCaculate);
    if (result) {
        console.log('kết quả thuật toán tính toán là ')
        arrayCell.sort();
        arrayCell.forEach(cell => {
            console.log(cell, dataReady[cell])
        })
    } else {
        alert('Lỗi sai cú pháp tính toán hoặc sai trường khai báo')
    }
} else {
    alert('Lỗi sai cú pháp tính toán hoặc sai trường khai báo')

}