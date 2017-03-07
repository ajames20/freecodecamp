// User Story: I can reset the clock for my next pomodoro.
//
// User Story: I can customize the length of each pomodoro.
(function() {
    const timerDisplay = document.querySelector('.time-left');
    const breakDisplay = document.getElementById('break-time-display');
    const endTime = document.querySelector('.end-time');
    const startTimer = document.querySelector('.start');
    const pauseTimer = document.querySelector('.pause');
    const resumeTimer = document.querySelector('.resume');
    const pomodoroControl = document.querySelectorAll('.pomodoro');
    const breakControl = document.querySelectorAll('.break');
    const resetTimer = document.querySelector('.reset');
    let countdown;


    function timer(seconds) {
        clearInterval(countdown);

        const now = (new Date()).getTime();
        const then = now + seconds * 1000;
        displayTimeLeft(seconds);
        displayEndTime(then);

        countdown = setInterval(function() {

            let secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0) {
                clearInterval(countdown);
                breakTimer(breakDisplay.textContent.slice(0, 2) * 60);
                return;
            }
            displayTimeLeft(secondsLeft);

            resumeTimer.addEventListener('click', function() {
                let minutes = timerDisplay.textContent.slice(0, 2) * 60;
                let secondsNow = timerDisplay.textContent.slice(3, 5);
                let seconds = minutes + Number(secondsNow);
                timer(seconds);
            });
        });
        pauseTimer.addEventListener('click', function() {
            clearInterval(countdown);
        });

    }

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes < 10 ? '0': ''}${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;
        timerDisplay.textContent = display;
    }


    function breakTimer(seconds) {
        clearInterval(countdown);

        const now = (new Date()).getTime();
        const then = now + seconds * 1000;
        displayBreakTimeLeft(seconds);

        countdown = setInterval(function() {

            let secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0) {
                clearInterval(countdown);
                return;
            }
            displayBreakTimeLeft(secondsLeft);
        });

    }


    function displayBreakTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes < 10 ? '0': ''}${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;

        breakDisplay.textContent = display;
    }



    function displayEndTime(timestamp) {
        const end = new Date(timestamp);
        const hours = end.getHours();
        const adjustedHours = hours > 12 ? hours - 12 : hours;
        const minutes = end.getMinutes();
        endTime.textContent = `Your break will begin at: ${adjustedHours}:${minutes < 10 ? '0': ''}${minutes}`;
    }



    startTimer.addEventListener('click', function() {
        timer(timerDisplay.textContent.slice(0, 2) * 60);
    });

    resetTimer.addEventListener('click', function() {
        timer(1500);
        breakTimer(300);
        clearInterval(countdown);
        endTime.textContent = 'Your break will begin at: ';
    });

    pomodoroControl.forEach(function(button) {
        let seconds;
        let minute = 60;
        return button.addEventListener('click', function() {
            if (this.textContent === '+') {
                seconds = timerDisplay.textContent.slice(0, 2) * 60;
                seconds += minute;
                updatePomodor(seconds);
            } else {
                if (timerDisplay.textContent.slice(0, 2) === '00') {
                    return;
                }
                seconds = timerDisplay.textContent.slice(0, 2) * 60;
                seconds -= minute;
                updatePomodor(seconds);
            }
        });

    });

    function updatePomodor(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsRemaning = seconds % 60;
        const display = `${minutes < 10 ? '0': ''}${minutes}:${secondsRemaning < 10 ? '0': ''}${secondsRemaning}`;
        timerDisplay.textContent = display;
    }

    breakControl.forEach(function(button) {
        let seconds;
        let minute = 60;
        return button.addEventListener('click', function() {
            if (this.textContent === '+') {
                seconds = breakDisplay.textContent.slice(0, 2) * 60;
                seconds += minute;
                updateBreak(seconds);
            } else {
                if (breakDisplay.textContent.slice(0, 2) === '00') {
                    return;
                }
                seconds = breakDisplay.textContent.slice(0, 2) * 60;
                seconds -= minute;
                updateBreak(seconds);
            }
        });
    });

    function updateBreak(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsRemaning = seconds % 60;
        const display = `${minutes < 10 ? '0': ''}${minutes}:${secondsRemaning < 10 ? '0': ''}${secondsRemaning}`;
        breakDisplay.textContent = display;
    }
})();
