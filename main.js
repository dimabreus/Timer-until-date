const output = document.querySelector("#output");

let date, inputDate, inputTime;

const dateCheck = (date) => {
    inputDate = date.split("-").map(Number);
    inputDate[1]--;
    if (inputDate && inputTime) createDate();
};

const timeCheck = (time) => {
    inputTime = time.split(":").map(Number);
    if (inputDate && inputTime) createDate();
};

const createDate = () => {
    date = new Date(...inputDate, ...inputTime, 0, 0);
    document.cookie = `inputDate=${btoa(inputDate)}`;
    document.cookie = `inputTime=${btoa(inputTime)}`;
    start();
};

window.onload = () => {
    if (document.cookie && document.cookie != "") {
        document.querySelector("#date").value = atob(document.cookie.match(/(?:^|;) *inputDate=([^;]*)/)[1]).split(",").map((el, index) => index === 1 ? String(Number(el) + 1).padStart(2, '0') : (index === 0 ? el.padStart(4, '0') : el.padStart(2, '0'))).join("-");
        document.querySelector("#time").value = atob(document.cookie.match(/(?:^|;) *inputTime=([^;]*)/)[1]).split(",").map(el => el.padStart(2, '0')).join(":");
    }

    if (document.querySelector("#date").value) dateCheck(document.querySelector("#date").value);
    if (document.querySelector("#time").value) timeCheck(document.querySelector("#time").value);

}

const formatDays = count => {
    if (count === 1) {
        return "день";
    } else if (count >= 2 && count <= 4) {
        return "дня";
    } else {
        return "дней";
    }
}

const formatHours = count => {
    if (count === 1 || count === 21) {
        return "час";
    } else if ((count >= 2 && count <= 4) || (count >= 22 && count <= 24)) {
        return "часа";
    } else {
        return "часов";
    }
}

const formatMinutes = count => {
    if (count === 1 || count === 21 || count === 31 || count === 41 || count === 51) {
        return "минута";
    } else if ((count >= 2 && count <= 4) || (count >= 22 && count <= 24) || (count >= 32 && count <= 34) || (count >= 42 && count <= 44) || (count >= 52 && count <= 54)) {
        return "минуты";
    } else {
        return "минут";
    }
}

const formatSeconds = count => {
    if (count === 1 || count === 21 || count === 31 || count === 41 || count === 51) {
        return "секунда";
    } else if ((count >= 2 && count <= 4) || (count >= 22 && count <= 24) || (count >= 32 && count <= 34) || (count >= 42 && count <= 44) || (count >= 52 && count <= 54)) {
        return "секунды";
    } else {
        return "секунд";
    }
}

const start = () => {
    setInterval(() => {
        let currentDate = new Date();

        let dif = date - currentDate;

        if (dif < 0) {
            output.textContent = "Время истекло";
            return;
        }

        let difMilliSeconds;

        difMilliSeconds = +String(dif)[String(dif).length - 3];


        let difSeconds = +String(dif).slice(0, String(dif).length - 3);

        let difMinutes = Math.floor(difSeconds / 60);
        difSeconds = difSeconds - difMinutes * 60;

        let difHours = Math.floor(difMinutes / 60);
        difMinutes = difMinutes - difHours * 60;

        let difDays = Math.floor(difHours / 24);
        difHours = difHours - difDays * 24;


        output.innerHTML = `
            ${String(difDays)} ${formatDays(difDays)} <br/>
            ${String(difHours).padStart(2, 0)} ${formatHours(difHours)} <br/>
            ${String(difMinutes).padStart(2, 0)} ${formatMinutes(difMinutes)} <br/>
            ${String(difSeconds).padStart(2, 0)} ${formatSeconds(difSeconds)} <br/>
            ${String(difMilliSeconds).padStart(1, 0)} миллисекунд
        `;

    }, 10);
};