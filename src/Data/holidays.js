
// Bangladesh Government Office Holidays - 2026

const holidays = [
    { start: "2026-02-04", end: "2026-02-04", name: "Shab-e-Barat" },
    { start: "2026-02-21", end: "2026-02-21", name: "Shaheed Day & International Mother Language Day" },

    { start: "2026-03-17", end: "2026-03-17", name: "Shab-e-Qadr" },
    { start: "2026-03-19", end: "2026-03-23", name: "Eid-ul-Fitr & Jumatul Bida" },
    { start: "2026-03-26", end: "2026-03-26", name: "Independence & National Day" },

    { start: "2026-04-13", end: "2026-04-13", name: "Chaitra Sankranti (Hill Districts Only)" },
    { start: "2026-04-14", end: "2026-04-14", name: "Bangla New Year" },

    { start: "2026-05-01", end: "2026-05-01", name: "May Day & Buddha Purnima" },
    { start: "2026-05-26", end: "2026-05-31", name: "Eid-ul-Azha" },

    { start: "2026-06-26", end: "2026-06-26", name: "Ashura" },

    { start: "2026-08-05", end: "2026-08-05", name: "July Mass Uprising Day" },
    { start: "2026-08-26", end: "2026-08-26", name: "Eid-e-Milad-un-Nabi" },

    { start: "2026-09-04", end: "2026-09-04", name: "Janmashtami" },

    { start: "2026-10-20", end: "2026-10-21", name: "Durga Puja" },

    { start: "2026-12-16", end: "2026-12-16", name: "Victory Day" },
    { start: "2026-12-25", end: "2026-12-25", name: "Christmas Day" },
];

// Date অনুযায়ী holiday খুঁজে বের করবে
export const getHolidayForDate = (year, month, day) => {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return holidays.find(
        (holiday) => date >= holiday.start && date <= holiday.end
    );
};

export default holidays;
