const csv = require('csvtojson');
const fs = require('fs');

var dates = [
    "Saturday, 16th November",
    "Sunday, 17th November",
    "Saturday, 23th November",
    "Sunday, 24th November",
    "Saturday, 30th November",
    "Sunday, 1st December",
    "Saturday, 7th December",
    "Sunday, 8th December",
    "Saturday, 14th December",
    "Sunday, 15th December"
];

csv({
    delimiter: "#"
})
.fromFile('_tmp_out.log')
.then(d => {
    d.forEach(e => {
        e.na = (e.na || "").split(", ");
        e.avl =  [];
        for (let i = 1; i < 11; i++) {
            if (false && i == 2) {
                /* 17 nov: Ultra */
                continue;
            }
            if (!e.na.find(e1 => e1 == i)) {
                e.avl.push(i);
            }
        }
    });

    let avlDates = d.reduce((a,e) => {
        e.avl.forEach(d1 => {
            if (!a[d1]) {
                a[d1] = 0;
            }
            ++a[d1];
        });
        return a;
    }, {})

    console.log("Total athletes:", d.length);
//    Object.keys(avlDates).forEach(k => console.log(dates[k - 1], avlDates[k]))

    let ret = [];

    for (let i = 0; i < 5; i++) {
        for (let j = i; j < 5; j++) {
            if (j == i) {
                continue;
            }
            /*
            console.log("finding for weekend", ((i * 2) + 1), "and",
                       ((j * 2) + 1));
                       */
            let users1 = d.filter(e => {
                let available = e.avl.find(e1 => {
                    return (e1 == (i * 2 + 1)) ||
                           (e1 == (i * 2) + 2)
                });
                return !available;
            });

            let users2 = users1.filter(e => {
                let available = e.avl.find(e1 => {
                    return (e1 == (j * 2 + 1)) ||
                           (e1 == (j * 2) + 2)
                });
                return !available;
            });

            ret.push([i, j, users2.length]);
        }
    }
    ret = ret.sort((a, b) => a[2] - b[2]);

    console.log("------------------------");
    console.log("The best fit options are");

    console.log("Weekends of", dates[(ret[0][0] * 2)], "and", dates[(ret[0][0] * 2 + 1)]);
    console.log("Weekends of", dates[(ret[0][1] * 2)], "and", dates[(ret[0][1] * 2 + 1)]);
    console.log("This will leave out", ret[0][2], "athlete/s");

    console.log("------------------------");
    console.log("\nThe next best options are");
    console.log("Weekends of", dates[(ret[1][0] * 2)], "and", dates[(ret[1][0] * 2 + 1)]);
    console.log("Weekends of", dates[(ret[1][1] * 2)], "and", dates[(ret[1][1] * 2 + 1)]);
    console.log("This will leave out", ret[1][2], "athlete/s");
    console.log("------------------------");

});
