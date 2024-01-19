const date = new Date(2024, 0, 15, 20, 0, 0, 0);

const goodMilliSeconds = true;

setInterval(() => {
    let nowDate = new Date();

    let dif = date - nowDate;

    let difMilliSeconds;

    if (goodMilliSeconds === true){
        difMilliSeconds = +String(dif)[String(dif).length - 3];
    } else{
        difMilliSeconds = +String(dif)[String(dif).length - 3] + String(dif)[String(dif).length - 2] + String(dif)[String(dif).length - 1];
    }

    let difSeconds = +String(dif).slice(0, String(dif).length - 3);

    let difMinutes = Math.floor(difSeconds / 60);
    difSeconds = difSeconds - difMinutes * 60;

    let difHours = Math.floor(difMinutes / 60);
    difMinutes = difMinutes - difHours * 60;

    if (goodMilliSeconds === true){
        console.log(`${String(difHours).padStart(2, 0)}:${String(difMinutes).padStart(2, 0)}:${String(difSeconds).padStart(2, 0)}:${String(difMilliSeconds).padStart(1, 0)}`);
    } else{
        console.log(`${String(difHours).padStart(2, 0)}:${String(difMinutes).padStart(2, 0)}:${String(difSeconds).padStart(2, 0)}:${String(difMilliSeconds).padStart(3, 0)}`);
    }

}, 10 ? goodMilliSeconds : 1);