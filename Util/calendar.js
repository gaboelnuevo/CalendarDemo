import moment from "moment";
import _ from "lodash";

function diffMonth(startDate, endDate) {
  var startMonths = startDate.getMonth() + startDate.getFullYear() * 12;
  var endMonths = endDate.getMonth() + endDate.getFullYear() * 12;
  return endMonths - startMonths;
}

function generateMonthly(startDate, endDate, times = 1) {
  var i;
  var shedule = [];
  for (i = 0; i < times; i++) {
    var obj = {};
    var nStartSpanDays = 0;
    var nEndSpanDays = 0;
    var days = [];
    var data = [];
    obj.startDate =
      i === 0
        ? startDate
        : getFirstDayOfMonth(addDays(shedule[i - 1].endDate, 1));
    obj.endDate = i === times - 1 ? endDate : getLastDayOfMonth(obj.startDate);

    days = generateDays(obj.startDate, obj.endDate);
    nStartSpanDays = obj.startDate.getDay();
    nEndSpanDays = 6 - obj.endDate.getDay();

    data = fillArray(null, nStartSpanDays)
      .concat(days)
      .concat(fillArray(null, nEndSpanDays));

    obj.weeks = _.chunk(data, 7);
    shedule.push(obj);
  }

  return shedule;
}

function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addDays(date, days) {
  var copyOf = new Date(date.valueOf());
  var dateInMs = copyOf.setDate(copyOf.getDate() + days);
  return new Date(dateInMs);
}

function generateDays(startDate, endDate) {
  var times = endDate.getDate() - startDate.getDate() + 1;
  var days = [];
  for (var i = 0; i < times; i++) {
    days.push(startDate.getDate() + i);
  }
  return days;
}

function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

const CURRENT_YEAR = moment().year();
const CURRENT_MONTH = moment().month();

export const generate = (month=CURRENT_MONTH, year = CURRENT_YEAR) => {
  const startDate = moment().month(month).year(year).startOf("month").toDate();
  const endDate = moment().month(month).year(year).endOf("month").toDate();
  // var nMonths = diffMonth(startDate, endDate) + 1;
  var shedule = generateMonthly(startDate, endDate);
  return shedule[0];
};
