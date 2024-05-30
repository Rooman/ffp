import {expect, test} from "@jest/globals";
import {calculateStatistics} from "@/src/util/calc";

test('2h 2ms 1mc 1nc 4u', () => {
    const data = {
        msAndMedicoverCount: '2',
        msClassicCount: '1',
        noCardCount: '1',
        cardUsages: '6',
        courts: '1',
        people: '4',
        pricePerHour: '55',
        hours: 2,
    }

    const expected = {
        totalPrice: 110,
        discount: 90,
        priceAfterDiscount: 20,
        noMs: '19.00',
        msAndMedicover: '0.00',
        msClassic: '1.00'
    }

    expect(calculateStatistics(data)).toStrictEqual(expected);
});

test('2.5h 2ms 1mc 1nc 7u', () => {
    const data = {
        msAndMedicoverCount: '2',
        msClassicCount: '1',
        noCardCount: '1',
        cardUsages: '7',
        courts: '1',
        people: '4',
        pricePerHour: '55',
        hours: 2.5,
    }

    const expected = {
        totalPrice: 137.5,
        discount: 105,
        priceAfterDiscount: 32.5,
        noMs: '23.69',
        msAndMedicover: '0.00',
        msClassic: '8.82'
    }

    expect(calculateStatistics(data)).toStrictEqual(expected);
});



test('2.5h 2ms 1mc 1nc 6u', () => {
    const data = {
        msAndMedicoverCount: '2',
        msClassicCount: '1',
        noCardCount: '1',
        cardUsages: '6',
        courts: '1',
        people: '4',
        pricePerHour: '55',
        hours: 2.5,
    }

    const expected = {
        totalPrice: 137.5,
        discount: 90,
        priceAfterDiscount: 47.5,
        noMs: '30.13',
        msAndMedicover: '0.00',
        msClassic: '17.38'
    }

    expect(calculateStatistics(data)).toStrictEqual(expected);
});

test('1h 1ms 3mc 0nc 2u', () => {
    const data = {
        msAndMedicoverCount: '1',
        msClassicCount: '3',
        noCardCount: '0',
        cardUsages: '2',
        courts: '1',
        people: '4',
        pricePerHour: '55',
        hours: 1,
    }

    const expected = {
        totalPrice: 55,
        discount: 30,
        priceAfterDiscount: 25,
        noMs: 0,
        msAndMedicover: '6.25',
        msClassic: '6.25'
    }

    expect(calculateStatistics(data)).toStrictEqual(expected);
});


test('1h 1ms 2mc 1nc 3u', () => {
    const data = {
        msAndMedicoverCount: '1',
        msClassicCount: '2',
        noCardCount: '1',
        cardUsages: '3',
        courts: '1',
        people: '4',
        pricePerHour: '55',
        hours: 1,
    }

    const expected = {
        totalPrice: 55,
        discount: 45,
        priceAfterDiscount: 10,
        noMs: '10.00',
        msAndMedicover: '0.00',
        msClassic: '0.00'
    }

    expect(calculateStatistics(data)).toStrictEqual(expected);
});
