import moment from "moment";

export const muligeSvar = {
    JA: "ja",
    NEI: "nei",
    SNART: "snart",
    OVER: "over"
};

const fagdagSluttTime = 16;

export const erDetFagtorsdag = () => {
    const nå = new Date();

    const fagtorsdagTid = {
        erDetFagtorsdag: muligeSvar.JA,
        gjenståendeTid: null
    };

    const deadline = finnFagtorsdagStart(nå);
    const sammeDag = erSammeDag(nå, deadline);

    const fagdagSlutt = new Date(nå.getFullYear(), nå.getMonth(), nå.getDate(), fagdagSluttTime, 0)

    if (sammeDag && deadline.getTime() <= nå.getTime() && nå.getTime() <= fagdagSlutt.getTime()) {
        return fagtorsdagTid;
    }

    const gjenståendeTid = finnGjenståendeTid(nå, deadline);

    if (sumGjenstående(gjenståendeTid) <= 0) {
        return fagtorsdagTid;
    }

    fagtorsdagTid.gjenståendeTid = gjenståendeTid;

    if (sammeDag) {
        fagtorsdagTid.erDetFagtorsdag = muligeSvar.SNART;
    } else if (gjenståendeTid.dager >= 13 && gjenståendeTid.timer >= 12) {
        fagtorsdagTid.erDetFagtorsdag = muligeSvar.OVER
    } else {
        fagtorsdagTid.erDetFagtorsdag = muligeSvar.NEI;
    }

    return fagtorsdagTid;
};

const finnFagtorsdagStart = (nå, ukedag, timer, minutter) => {
    if (ukedag === undefined) {
        ukedag = 4;
    }

    if (timer === undefined) {
        timer = 12;
    }

    if (minutter === undefined) {
        minutter = 0;
    }

    const startDato = new Date(nå);

    startDato.setDate(startDato.getDate() + ((7 + ukedag - startDato.getDay()) % 7));

    if (moment(startDato).isoWeek() % 2 !== 0) {
        startDato.setDate(startDato.getDate() + 7);
    } else if (erSammeDag(startDato, nå) && nå.getHours() >= fagdagSluttTime) {
        startDato.setDate(startDato.getDate() + 14);
    }

    startDato.setHours(timer, minutter, 0, 0);

    return startDato;
};

const finnGjenståendeTid = (nå, sluttTid) => {
    const t = Date.parse(sluttTid) - nå;
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        dager: days,
        timer: hours,
        minutter: minutes,
        sekunder: seconds
    };
};

const erSammeDag = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
};

const sumGjenstående = gjenståendeTid =>
    gjenståendeTid.sekunder +
    gjenståendeTid.minutter +
    gjenståendeTid.timer +
    gjenståendeTid.dager;

export const padNumber = number => ("0" + number).slice(-2);
