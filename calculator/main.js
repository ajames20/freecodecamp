(function() {
    // Get all the keys from document
    var keys = document.querySelectorAll('.calc-btn-numbers');
    var output = document.getElementById('calculator-output');
    var negative = document.getElementById('negative');
    var percent = document.getElementById('percent');
    var clearBtn = document.getElementById('clear');
    var item = [];
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
            var btnVal = this.innerHTML;

            // cahnges the state fo the clear button from AC to C when Number is clicked
            if (clearBtn.innerHTML == state1) {
                clearBtn.innerHTML = state2;
            }

            //replace the 0 with new values inputed
            output.innerHTML = output.innerHTML.replace(0, '');
            //updates HTML with clicked value
            output.innerHTML += btnVal;
            item.push(btnVal);

            limit = item.length;

            if (limit > 9) {
                //limits the amount of charecters inputed and shows error memssage
                output.innerHTML = '<p class="error">too many numbers</p>';
            }
            // prevent page jumps
            e.preventDefault();
        };
    }


    clearBtn.addEventListener('click', function() {
        resetScreen();
    });

    negative.addEventListener('click', function() {
        //add a negative sign to output screen one time
    });

    percent.addEventListener('click', function() {
        output.innerHTML = output.innerHTML / 100;
    });

    function initilizeScreen() {
        output.textContent = '0';
    }

    function resetScreen() {
        clearBtn.innerHTML = state1;
        output.textContent = '0';
        item = [];
    }

    startTime();
    initilizeScreen();
})();
