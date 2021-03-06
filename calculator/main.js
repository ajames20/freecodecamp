(function() {
    // Get all the keys from document
    var keys = document.querySelectorAll('.calc-btn');
    var output = document.querySelector('.calculator-output');
    var clearBtn = document.getElementById('clear');
    var entries = [];
    var temp = '';
    var limit;
    var state1 = 'AC';
    var state2 = 'C';


    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('clock').innerHTML =
            h + ':' + m + ':' + s;
        setTimeout(startTime, 500);
    }

    function checkTime(i) {
        if (i < 10) {
            i = '0' + i;
        } // add zero in front of numbers < 10
        return i;
    }

    for (var i = 0; i < keys.length; i++) {
        keys[i].onclick = function(e) {
            var btnVal = this.textContent;


            //if button textContent is !isNaN the number will print to screen
            if (!isNaN(btnVal) || btnVal === '.') {
                temp += btnVal;
                clearBtn.textContent = state2;
                output.textContent = temp.substring(0, 9).replace(/(\d)(?=(\d{3})+$)/g, '$1,');

            } else if (btnVal === 'AC') {
                output.classList.remove('large', 'medium', 'small');
                entries = [];
                temp = '';
                output.textContent = '';
                // Clear last entry
            } else if (btnVal === 'C') {
                output.classList.remove('large', 'medium', 'small');
                entries = [];
                temp = '';

                clearBtn.innerHTML = state1;
                output.textContent = '';

            } else if (btnVal === 'x') {
                entries.push(temp);
                entries.push('*');
                temp = '';
            } else if (btnVal === '÷') {
                entries.push(temp);
                entries.push('/');
                temp = '';
                // Got the equals sign, perform calculation
            } else if (btnVal === '+/-') {
                output.textContent = '-' + temp;
                temp = output.textContent;
            } else if (btnVal === '%') {
                output.textContent = temp / 100;
                temp = output.textContent;
            } else if (btnVal === '=') {
                entries.push(temp);
                var displayOutput = Number(entries[0]);
                for (var i = 1; i < entries.length; i++) {
                    var nextNum = Number(entries[i + 1]);
                    var symbol = entries[i];


                    if (symbol === '+') {
                        displayOutput += nextNum;
                        displayOutput = (displayOutput + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');

                    } else if (symbol === '*') {
                        displayOutput *= nextNum;

                        displayOutput = (displayOutput + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');

                    } else if (symbol === '/') {
                        displayOutput /= nextNum;
                        displayOutput = (displayOutput + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                    }

                }

                //Change '-' symbol so math is done correctly
                if (displayOutput < 0) {
                    displayOutput = '-' + Math.abs(displayOutput);
                }
                // handle output to fit in screen when user hits = sign
                if (displayOutput.length > 6) {
                    output.classList.remove('large', 'medium', 'small');
                    output.textContent = displayOutput;

                    if (displayOutput.length > 8) {
                        output.classList.add('large');
                        output.textContent = displayOutput;
                    }
                    if (displayOutput.length > 9) {
                        output.classList.add('medium');
                        output.textContent = displayOutput;
                    }
                    if (displayOutput.length >= 10) {
                        output.classList.remove('large', 'medium', 'small');
                        displayOutput = displayOutput.replace(/[, ]+/g, '');
                        displayOutput = (Number(displayOutput).toExponential(0).replace(/[+]/g, ''));
                        output.textContent = displayOutput;

                    }
                } else {
                    output.textContent = displayOutput;
                }

                entries = [];
                temp = '';
                // Push number
            } else {
                entries.push(temp);
                entries.push(btnVal);
                temp = '';
            }

            limit = temp.length;
            if (limit <= 5 && !isNaN(btnVal)) {
                output.classList.remove('large', 'medium', 'small');
            } else if (limit > 6) {
                output.classList.add('large');
                if (limit > 7) {
                    output.classList.add('medium');
                    if (limit > 8) {
                        output.classList.add('small');
                    }
                }
            }
            e.preventDefault();
        };
    }

    startTime();
})();
