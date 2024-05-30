import {StateType} from "@/App";


interface Statistics {
    totalPrice: number;
    priceAfterDiscount: number;
    discount: number;
    msClassic: string | number;
    msAndMedicover: string | number;
    noMs: string | number;
}

function transformState(state: StateType) {
    return {
        msAndMedicoverCount: parseStringOrZero(state.msAndMedicoverCount),
        msClassicCount: parseStringOrZero(state.msClassicCount),
        noCardCount: parseStringOrZero(state.noCardCount),
        cardUsages: parseStringOrZero(state.cardUsages),
        courts: parseStringOrZero(state.courts),
        people: parseStringOrZero(state.people),
        pricePerHour: parseStringOrZero(state.pricePerHour),
        hours: state.hours,
    }

}


export function calculateStatistics(stateType: StateType): Statistics {
    const state = transformState(stateType);

    const discount = state.cardUsages * 15;

    const total = state.courts * state.pricePerHour * state.hours;

    const priceAfterDiscount = total - discount;

    let noMs = total / state.people;

    const medicoverDiscaunt = discount / (state.msAndMedicoverCount + state.msClassicCount * msClassicDiscount(state.hours));
    console.log('noMs', noMs);
    console.log('medicoverDiscaunt', medicoverDiscaunt);

    const msAndMedicoverPrice = noMs - medicoverDiscaunt;

    let msClassicPrice = noMs - medicoverDiscaunt * msClassicDiscount(state.hours);


    let msClassisOverDiscaunt = 0;
    let msClassisDiscountForOthers = 0;


    let msDiscauntPerPerson = 0;
    if (state.msAndMedicoverCount > 0 &&  msAndMedicoverPrice < 0) {
         msDiscauntPerPerson = ((msAndMedicoverPrice * -1 * state.msAndMedicoverCount)
            / (state.noCardCount + state.msClassicCount));

        noMs = noMs - msDiscauntPerPerson;
    }

    if (msDiscauntPerPerson > 0) {
        msClassicPrice = msClassicPrice - msDiscauntPerPerson;
    }

    if(msClassicPrice < 0) {
        msClassisOverDiscaunt = msClassicPrice * state.msClassicCount * -1;
        msClassisDiscountForOthers = msClassisOverDiscaunt / state.noCardCount;
    }

    if (msClassisDiscountForOthers > 0) {
        noMs = noMs - msClassisDiscountForOthers;
    }



    const msClassicFinalPrice = state.msClassicCount === 0 || isNaN(msClassicPrice) ? 0
        : roundUp(msClassicPrice < 0 ? 0 : msClassicPrice);

    const msAndMedicoverFinalPrice = state.msAndMedicoverCount === 0 || isNaN(msAndMedicoverPrice) ? 0
        : roundUp(msAndMedicoverPrice < 0 ? 0 : msAndMedicoverPrice);

    const noMsPrice = state.noCardCount === 0 || isNaN(noMs) ? 0 : roundUp(noMs < 0 ? 0 : noMs);

    return {
        totalPrice: total,
        discount: discount,
        priceAfterDiscount: priceAfterDiscount < 0 ? 0 : priceAfterDiscount,
        noMs: noMsPrice,
        msAndMedicover: msAndMedicoverFinalPrice,
        msClassic: msClassicFinalPrice
    }
}

function parseStringOrZero(value: string): number {
    if (value === "") {
        return 0;
    }
    return Number(value);
}

function msClassicDiscount(hours: number) {
    if (hours === 1) {
        return 1;
    } else if (hours <= 2) {
        return 0.5;
    } else if (hours <= 3) {
        return 0.33;
    } else if (hours <= 4) {
        return 0.25;
    }
    return 1;
}

function roundUp(num: number) {
    let power = Math.pow(10, 2);
    return (Math.ceil(num * power) / power).toFixed(2);
}