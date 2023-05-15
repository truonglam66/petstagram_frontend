import { Injectable } from '@angular/core';
import { create, all } from 'mathjs';
import * as moment from 'moment';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';
const config = {};
const math = create(all, config);
declare var Object: any;
@Injectable()
export class CoreService {
  enumData: any;
  currentUser: User | any;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe((x: any) => {
      this.currentUser = x;
      this.enumData = x?.enumData;
    });
  }
  date = {
    to_yyyyMMddHHmmss: (d: Date) => {
      return (
        d.getFullYear() +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        ('0' + d.getDate()).slice(-2) +
        ('0' + d.getHours()).slice(-2) +
        ('0' + d.getMinutes()).slice(-2) +
        ('0' + d.getSeconds()).slice(-2)
      );
    },
    to_ddMMyyyy: (d: Date) => {
      return (
        ('0' + d.getDate()).slice(-2) +
        '/' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '/' +
        d.getFullYear()
      );
    },
    to_ddMMyyyyHHmmss: (d: Date) => {
      return (
        ('0' + d.getDate()).slice(-2) +
        '/' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '/' +
        d.getFullYear() +
        ' ' +
        ('0' + d.getHours()).slice(-2) +
        ':' +
        ('0' + d.getMinutes()).slice(-2) +
        ':' +
        ('0' + d.getSeconds()).slice(-2)
      );
    },

    getDate: (pDate: Date) => {
      return pDate && pDate.getTime()
        ? new Date(pDate.getFullYear(), pDate.getMonth(), pDate.getDate())
        : pDate;
    },
    getDateHM: (pDate: Date) => {
      return pDate && pDate.getTime()
        ? new Date(
            pDate.getFullYear(),
            pDate.getMonth(),
            pDate.getDate(),
            pDate.getHours(),
            pDate.getMinutes()
          )
        : pDate;
    },
    getDateHMS: (pDate: Date) => {
      return pDate && pDate.getTime()
        ? new Date(
            pDate.getFullYear(),
            pDate.getMonth(),
            pDate.getDate(),
            pDate.getHours(),
            pDate.getMinutes(),
            pDate.getSeconds()
          )
        : pDate;
    },
    addDay: (pDate: Date, pVal: number) => {
      return pDate && pDate.getTime
        ? new Date(pDate.getTime() + pVal * 24 * 60 * 60000)
        : pDate;
    },
    addHour: (pDate: Date, pVal: number) => {
      return pDate && pDate.getTime
        ? new Date(pDate.getTime() + pVal * 60 * 60000)
        : pDate;
    },
    addMinute: (pDate: Date, pVal: number) => {
      return pDate && pDate.getTime
        ? new Date(pDate.getTime() + pVal * 60000)
        : pDate;
    },
    addSecond: (pDate: Date, pVal: number) => {
      return pDate && pDate.getTime
        ? new Date(pDate.getTime() + pVal * 1000)
        : pDate;
    },
    setHour: (pDate: Date, pVal: number) => {
      return pDate && pDate.getTime()
        ? new Date(
            pDate.getFullYear(),
            pDate.getMonth(),
            pDate.getDate(),
            pVal,
            0
          )
        : pDate;
    },
  };

  public isEqual2Obj(objA: any, objB: any) {
    // Tạo các mảng chứa tên các property
    const aProps = Object.getOwnPropertyNames(objA);
    const bProps = Object.getOwnPropertyNames(objB);
    // Nếu độ dài của mảng không bằng nhau,
    // thì 2 objects đó không bằnh nhau.
    if (aProps.length !== bProps.length) {
      return false;
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];
      // Nếu giá trị của cùng một property mà không bằng nhau,
      // thì 2 objects không bằng nhau.
      if (objA[propName] !== objB[propName]) {
        return false;
      }
    }
    // Nếu code chạy đến đây,
    // tức là 2 objects được tính lằ bằng nhau.
    return true;
  }

  public sumArray(arr: string | any[], prop: string | number) {
    let total = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
      total += arr[i][prop];
    }
    return total;
  }

  public groupByArray(data: any[], key: string | number) {
    const groupedObj = data.reduce((prev, cur) => {
      if (!prev[cur[key]]) {
        prev[cur[key]] = [cur];
      } else {
        prev[cur[key]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map((Heading: string | number) => ({
      heading: Heading,
      list: groupedObj[Heading],
    }));
  }

  /** Sort từ nhỏ tới lớn */
  public dynamicSort(data: any[], key: any) {
    return data.sort(this.sortArray(key));
  }

  public sortArray(key: any) {
    let sortOrder = 1;
    if (key[0] === '-') {
      sortOrder = -1;
      key = key.substr(1);
    }
    return (a: any, b: any) => {
      const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      return result * sortOrder;
    };
  }

  /** Sort từ lớn tới nhỏ */
  public sortBy(array: Array<any>, args: any) {
    if (array !== undefined) {
      array.sort((a: any, b: any) => {
        if (a[args] > b[args]) {
          return -1;
        } else if (a[args] < b[args]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return array;
  }

  public convertObjToArray(obj: any) {
    const arr = [];
    // tslint:disable-next-line:forin
    for (const key in obj) {
      const value = obj[key];
      arr.push(value);
    }
    return arr;
  }

  genEnumMultiLevelToTreeView(enumData: object, source = null) {
    const res = [];
    let lstEnum = this.convertObjToArray(enumData);
    if (source) {
      lstEnum = this.convertObjToArray(source);
    }
    for (const e of lstEnum) {
      let item: any = new Object();
      item.value = e.code;
      item.label = e.name;
      item.isLeaf = !(e.child || e.children);
      if (e.child || e.children) {
        item.children = this.genEnumMultiLevelToTreeView(e.child || e.children);
      }
      res.push(item);
    }
    return res;
  }

  genEnumMultiLevelToArray(enumData: object, source = null) {
    const res = [];
    let lstEnum = this.convertObjToArray(enumData);
    if (source) {
      lstEnum = this.convertObjToArray(source);
    }
    for (const e of lstEnum) {
      res.push(e);
      if (e.child || e.children) {
        let lstChildren: any = this.genEnumMultiLevelToArray(
          e.child || e.children
        );
        for (const c of lstChildren) {
          c.parent = e;
          res.push(c);
        }
      }
    }
    return res;
  }

  public getEnumNameMultiLevel(enumData: object, code: string) {
    let lstEnum = this.genEnumMultiLevelToArray(enumData);
    const item = lstEnum.find((p) => p.code === code);
    return item && item.name ? item.name : '';
  }

  public convertObjToParam(obj: any) {
    let str = '';
    // tslint:disable-next-line:forin
    for (const key in obj) {
      if (str !== '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(obj[key]);
    }
    return str;
  }

  //#region xếp hạng A B C D

  public checkPermission(role: string) {
    if (!role) {
      return false;
    }
    if (!this.currentUser || !this.enumData) {
      return false;
    }
    if (this.currentUser.type === 'ADMIN') {
      return true;
    }
    if (
      !this.currentUser.permission ||
      this.currentUser.permission.length == 0
    ) {
      return false;
    }
    return this.currentUser.permission.some((s: any) => s === role);
  }

  //#endregion

  //#region Tính lại giá

  convertTypeList(list: any) {
    if (typeof list !== 'undefined') {
      const data = list.find((p: any) => p.isChosen);
      if (data) {
        return data.name;
      }
      return '';
    }
    return '';
  }

  calScore(item: any) {
    let score = 0;
    if (item.__childs__ && item.__childs__.length > 0) {
      const length = item.__childs__.length;
      let scoreC = 0;
      for (let i = 0; i < length; i++) {
        // tslint:disable-next-line: no-shadowed-variable
        let temp = this.calScore(item.__childs__[i]);

        if (isNaN(temp)) {
          temp = 0;
        }
        if (!isFinite(temp)) {
          temp = 0;
        }
        scoreC += temp;
      }
      const temp = (item.percent * scoreC) / 100;
      score += temp;
    } else {
      // tslint:disable-next-line:triple-equals
      if (
        item.dataType === this.enumData.DataType.Number.code &&
        item.value &&
        item.value.trim() != ''
      ) {
        let temp = 0;
        const x = parseFloat(item.value);
        if (item.isCalUp) {
          if (x >= item.percentRule) {
            temp = item.percent;
          } else {
            temp = (x * item.percent) / item.percentRule; // giá trị * tỉ trọng / điều kiện b
          }
        } else {
          if (x <= item.percentRule) {
            temp = item.percent;
          } else if (x >= item.percentDownRule) {
            temp = 0;
          } else {
            temp =
              100 -
              ((item.percentDownRule - x) * item.percent) /
                (item.percentDownRule - item.percentRule);
          }
        }
        if (isNaN(temp)) {
          score += 0;
        } else if (!isFinite(temp)) {
          score += 0;
        } else {
          score += temp;
        }
      } else if (item.dataType === this.enumData.DataType.List.code) {
        const chose = item.__supplierCapacityListDetails__.find(
          (p: any) => p.isChosen
        );
        const temp = chose ? chose.value : 0;
        const finalTemp = (temp * item.percent) / 100;
        score += finalTemp;
      }
    }
    if (isNaN(score)) {
      return 0;
    }
    if (!isFinite(score)) {
      return 0;
    }
    return score;
  }

  //#endregion

  //#region get enum name

  public getEnumElementName(enumData: object, value: string) {
    return this.getEnumElement(enumData, value, 'code', 'name');
  }

  public getEnumElementColor(enumData: object, value: string) {
    return this.getEnumElement(enumData, value, 'code', 'color');
  }

  public getEnumElement(
    enumData: object,
    value: string,
    keyIn: string,
    keyOut: string
  ) {
    const data = this.convertObjToArray(enumData);
    const item = data.find((p) => p[keyIn] === value);
    return item && item[keyOut] ? item[keyOut] : '';
  }

  //#endregion

  public distance(pFrom: any, pTo: any) {
    // Return Meter and Second between 2 points
    var obj = { Distance: 0, Time: 0 };
    if (pFrom && pTo) {
      if (pFrom.lat > 0 && pFrom.lng > 0 && pTo.lat > 0 && pTo.lng > 0) {
        var R = 6371;
        var dLat = (pTo.lat - pFrom.lat) * (Math.PI / 180.0);
        var dLon = (pTo.lng - pFrom.lng) * (Math.PI / 180.0);
        var lat1 = pFrom.lat * (Math.PI / 180.0);
        var lat2 = pTo.lat * (Math.PI / 180.0);
        var a =
          Math.pow(Math.sin(dLat / 2), 2) +
          Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        obj.Distance = R * c * 1000; // Meter
        obj.Time = (obj.Distance / 30) * 60 * 60; // Second
      }
    }
    return obj;
  }

  setCookie(name: string, value: any, days: number) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  getCookie(name: string) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  eraseCookie(name: string) {
    document.cookie =
      name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  convertToDate(d: any) {
    if (Object.prototype.toString.call(d) === '[object Date]') {
      d = moment(d, 'DD/MM/YYYY').toDate();
      if (isNaN(d)) {
        return null;
      } else {
        return new Date(d);
      }
    } else if (Object.prototype.toString.call(d) === '[object Number]') {
      d = this.excelDateToJSDate(d);
      if (isNaN(d)) {
        return null;
      } else {
        return d;
      }
    } else if (Object.prototype.toString.call(d) === '[object String]') {
      if (this.isValidDate(d) == true) {
        var dateParts = d.split('/');
        var dateObject = new Date(
          +dateParts[2],
          dateParts[1] - 1,
          +dateParts[0]
        );
        return dateObject;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  isValidDate(dateString: any) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
    // Parse the date parts to integers
    var parts = dateString.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  excelDateToJSDate(serial: any) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(
      date_info.getFullYear(),
      date_info.getMonth(),
      date_info.getDate(),
      hours,
      minutes,
      seconds
    );
  }

  // UPGRADE
  /**
   * Lọc properties không có giá trị
   *
   * @author senhoang
   * @param {Object} where - Đối tượng cần lọc.
   * @returns {void} Hàm không trả về giá trị. Nó sửa đổi đối tượng được truyền làm tham số tại chỗ.
   */
  public filterDataSearch(where: any) {
    return Object.keys(where).forEach(
      (k: any) =>
        !(where[k] || where[k] === false || where[k] === 0) && delete where[k]
    );
  }

  /**
   * Hàm Convert array to object (HashMap) [{id,name}] => {id:{id,name}}
   *
   * @author senhoang
   * @param {array} arr  - List Array muốn convert to hash map.
   * @param {string} key - Key để làm key trong hash map(mặc định là id)
   */
  public arrayToObject(arr: any[], key: string = 'id') {
    return arr.reduce(
      (a, v) =>
        a[v[key]]
          ? { ...a, [v[key]]: { ...a[v[key]], ...v } }
          : { ...a, [v[key]]: v },
      {}
    );
  }
}
