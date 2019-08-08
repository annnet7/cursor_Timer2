//функции для работы со временем
function SecondsToTime(seconds) {
    let min = Math.trunc(seconds / 60);
    let sec = seconds % 60
    let str = ((min < 10) ? "0" + min : min) + ":" + ((sec < 10) ? "0" + sec : sec);
    return str;
}

function TimeToSec(timeArr) {
    return timeArr[0] * 60 + timeArr[1];
}
//класс
class Timer {
    constructor(sec, auto, timeStrDiv, timeLineDiv) {
        this.sec = sec;
        this.auto = auto;
        this.pause = false;
        this.timeStrDiv = timeStrDiv;
        this.timeLineDiv = timeLineDiv;
        this.timeLineWidth = 100;
        this.step = 100 / sec;
    }
    set Autostart(auto) {
        if (auto) {
            this.start();
        } else {
            this.timeStrDiv.innerText = SecondsToTime(this.sec);
        }
    }
    start() {
        let obj = this;
        this.inter = setInterval(function() {
            if (obj.sec < 0) clearInterval(obj.inter);
            else {


                obj.timeStrDiv.innerText = SecondsToTime(obj.sec);
                obj.sec--;
                //сгладим анимацию
                const smoth = 60;
                let count = smoth;
                let smothInterval = setInterval(function() {
                    if (count <= 0) {
                        clearInterval(smothInterval);
                        return;
                    }
                    obj.timeLineWidth -= obj.step / smoth;
                    obj.timeLineDiv.style.width = Math.floor(obj.timeLineWidth) + "%";
                    count--;
                }, 1000 / smoth);
            }
        }, 1000);
    }
    stop() {
        clearInterval(this.inter);
    }
}
let createBtn = document.getElementById('btnCrt');
//console.log(createBtn);
createBtn.addEventListener('click', function() {
    ///считываем данные
    let min = Number(document.getElementById('minInput').value);
    let sec = Number(document.getElementById('secInput').value);
    let autostartCB = document.getElementById('autostartCB').checked;

    let timeAr = [min, sec];
    let timeinSec = TimeToSec(timeAr);
    //создаем элементы
    let timeStrDiv = document.createElement('div');
    timeStrDiv.innerText = "00:00";
    let timeLineDiv = document.createElement('div');
    timeLineDiv.className = "loadLine";
    let timeBtn = document.createElement('button');
    let contDiv = document.getElementById('container');
    contDiv.appendChild(timeStrDiv);
    contDiv.appendChild(timeLineDiv);
    contDiv.appendChild(timeBtn);

    //создаем объект
    let t = new Timer(timeinSec, true, timeStrDiv, timeLineDiv);
    t.Autostart = autostartCB;
    timeBtn.innerText = autostartCB ? "Stop" : "Start";
    timeBtn.addEventListener('click', function() {
        if (timeBtn.innerText == "Stop") {
            t.stop();
            timeBtn.innerText = "Start";
        } else {
            t.start();
            timeBtn.innerText = "Stop";
        }
    })
});