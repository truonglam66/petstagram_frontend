import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class ApiService {
  host = `${environment.backEnd}/`;
  eventCloseModal = new BehaviorSubject<boolean>(false);
  eventCloseModalPO = new BehaviorSubject<boolean>(false);
  eventUpdateCollectEmployee = new BehaviorSubject<boolean>(false);
  eventUpdatReadNotify = new BehaviorSubject<boolean>(false);
  eventChangeLocal = new BehaviorSubject<boolean>(false);
  constructor(public coreService: CoreService, private http: HttpClient) {}

  isLoggedIn() {
    return this.eventChangeLocal.asObservable();
  }

  //#region API Construct

  DEPARTMENT = {
    FIND: 'departments/find',
    FINDONE: 'departments/find_one',
    LOAD_DETAIL: 'departments/load_detail',
    PAGINATION: 'departments/pagination',
    CREATE: 'departments/create_data',
    UPDATE: 'departments/update_data',
    DELETE: 'departments/update_delete',
    ACTIVE: 'departments/update_active',
  };

  CITY = {
    FIND: `cities/find`,
    PAGINATION: 'cities/pagination',
    CREATE: 'cities/create_data',
    UPDATE: 'cities/update_data',
    DELETE: 'cities/update_active',
  };

  DISTRICT = {
    LOAD_DISTRICT_BY_CITY: (cityId: string) => {
      return `districts/LOAD_DISTRICT_BY_CITY/${cityId}`;
    },
    FIND: 'districts/find',
    FIND_ONE: 'districts/find_one',
    PAGINATION: 'districts/pagination',
    CREATE: 'districts/create_data',
    UPDATE: 'districts/update_data',
    DELETE: 'districts/update_active',
  };

  WARD = {
    LOAD_WARD_BY_DISTRICT: (districtId: string) => {
      return `wards/load_ward_by_district/${districtId}`;
    },
    FIND: `wards/find`,
    FIND_ONE: 'wards/find_one',
    PAGINATION: 'wards/pagination',
    CREATE: 'wards/create_data',
    UPDATE: 'wards/update_data',
    DELETE: 'wards/update_active',
  };

  SETTINGSTRING = {
    FIND: 'setting_string/find',
    FIND_KEY: 'setting_string/find_by_key',
    PAGINATION: 'setting_string/pagination',
    CREATE: 'setting_string/create_data',
    CREATELIST: 'setting_string/create_data_list',
    UPDATE: 'setting_string/update_data',
    DELETE: 'setting_string/update_delete',
    SK_NEW_STRING: 'setting_string/socket-new',
  };

  EMPLOYEE = {
    FIND: 'employee/find',
    FINDONE: 'employee/find_one',
    PAGINATION: 'employee/pagination',
    CREATE: 'employee/create_data',
    UPDATE: 'employee/update_data',
    DELETE: 'employee/update_active',
    UPDATE_PASSWORD: 'employee/update_password',
    LOAD_DATA: 'employee/load_data',
    LOAD_BY_APARTMENT: 'employee/load_by_apartment',
    LOAD_APARTMENT_FOR_EMPLOYEE: 'employee/load_apartment_for_employee',
  };

  UPLOAD_FILE = {
    UPLOAD_SINGLE: 'uploadFiles/upload_single',
  };

  PERMISSION = {
    FIND: 'permission/find',
    FINDONE: 'permission/find_one',
    PAGINATION: 'permission/pagination',
    CREATE: 'permission/create_data',
    UPDATE: 'permission/update_data',
    DELETE: 'permission/update_active',
  };

  DASHBOARD = {
    //#region SAAS
    ANALYSIS_DAILY: 'dashboard/analysis_daily',
    SUMMARY_PAYMENT: 'dashboard/summary_payment',
    SUMMARY_FINANCE_IN_YEAR: 'dashboard/summary_finance_in_year',
    //#endregion
    LOAD_ALL_DEADLINES: 'dashboard/load_all_deadlines',
  };

  CONTRACT = {
    DETAIL: 'contract/load_detail',
    PAGINATION: 'contract/pagination',
    CREATE: 'contract/create_data',
    UPDATE: 'contract/update_data',
    DELETE: 'contract/update_delete',
    ACTIVE: 'contract/update_active',
    UPDATE_SERVICE_INIT_INDEX: 'contract/update_service_init_index',
    UPDATE_SERVICE_CURRENT_INDEX: 'contract/update_service_current_index',
    LOAD_SERVICE_BY_BILL: 'contract/load_service_by_bill',
    LOAD_SERVICE_BY_CONTRACT: 'contract/load_service_by_contract',
    CLOSE: 'contract/update_close',
    CHECK_CLOSE: 'contract/check_close',
    LOAD_RESIGN: 'contract/load_resign',
    UPDATE_EXTEND: 'contract/update_extend',
    UPDATE_EFFECTIVE: 'contract/update_effective',
    UPDATE_RETURN_ROOM: 'contract/update_return_room',
    LOAD_CONTRACT_SENT_ZALO_FAILED: 'contract/load_contract_sent_zalo_failed',
    CREATE_DEPOSIT: 'contract/create_deposit',
    IMPORT_EXCEL: 'contract/import_excel',
    FIND_CONTRACT_RESIDENT_DEPOSIT: 'contract/find_contract_resident_deposit',
  };

  SERVICE = {
    LOAD_DATA: `service/load_data`,
    PAGINATION: 'service/pagination',
    CREATE: 'service/create_data',
    CREATE_DATA_BY_EXCEL: 'service/create_data_by_excel',
    UPDATE: 'service/update_data',
    DELETE: 'service/update_active',
    LOAD_SERVICE_BY_APARTMENT: `service/load_service_by_apartment`,
    LOAD_SERVICE_BY_ROOM: `service/load_service_by_room`,
  };

  APARTMENT = {
    LOAD_DATA: `apartment/load_data`,
    LOAD_DETAIL: `apartment/load_detail`,
    FINDONE: 'apartment/find_one',
    PAGINATION: 'apartment/pagination',
    CREATE: 'apartment/create_data',
    UPDATE: 'apartment/update_data',
    DELETE: 'apartment/update_active',
    EXCEL: 'apartment/create_data_list',
    UPDATE_EMPLOYEE: 'apartment/update_employee',
    LOAD_SERVICE_IN_APARTMENT: 'apartment/load_service_in_apartment',
    CREATE_SERVICE_IN_APARTMENT: 'apartment/create_service_in_apartment',
    SEARCH_DATA_FOR_FILTER: 'apartment/search_data_for_filter'
  };

  ROOM = {
    LOAD_DATA: `room/load_data`,
    LOAD_DATA_BY_APARTMENT: `room/load_data_by_apartment`,
    LOAD_ROOM_BY_APARTMENT: `room/load_room_by_apartment`,
    PAGINATION: 'room/pagination',
    CREATE: 'room/create_data',
    UPDATE: 'room/update_data',
    DELETE: 'room/update_active',
    EXCEL: 'room/create_data_list',
    FINDONE: 'room/find_one',
    FIND: 'room/find',
    LOAD_SERVICE_OF_ROOM: 'room/load_service_apartment_of_room',
  };

  JOB_CATEGORY = {
    LOAD_DATA: `job_category/load_data`,
    FIND: 'job_category/find',
    FINDONE: 'job_category/find_one',
    PAGINATION: 'job_category/pagination',
    CREATE: 'job_category/create_data',
    UPDATE: 'job_category/update_data',
    DELETE: 'job_category/update_active',
  };

  ASSET = {
    FINDONE: 'asset/find_one',
    LOAD_DETAIL: 'asset/load_detail',
    PAGINATION: 'asset/pagination',
    CREATE: 'asset/create_data',
    UPDATE_DATA: 'asset/update_data',
    DELETE: 'asset/update_delete',
    CREATE_EXCEL: 'asset/create_data_excel',
    ACTIVE: 'asset/update_active',
    CLOSE: 'asset/update_close',
    LOAD_DATA: 'asset/load_data',
  };

  ASSET_CATEGORY = {
    FINDONE: 'asset_category/find_one',
    FIND: 'asset_category/find',
    PAGINATION: 'asset_category/pagination',
    CREATE: 'asset_category/create_data',
    UPDATE: 'asset_category/update_data',
    ACTIVE: 'asset_category/update_active',
    LOAD_DATA: 'asset_category/load_data',
  };

  RESIDENT = {
    FINDONE: 'resident/find_one',
    DETAIL: 'resident/find_detail',
    LOAD_DATA: `resident/load_data`,
    PAGINATION: 'resident/pagination',
    CREATE: 'resident/create_data',
    UPDATE: 'resident/update_data',
    UPDATE_TEMP_DECLARATION: 'resident/update_temp_declaration',
    DELETE: 'resident/update_active',
    LOAD_RESIDENT: 'resident/load_resident_by_place',
    IMPORT_EXCEL: 'resident/import_excel',
    FIND_BY_IDNO: 'resident/find_by_idno',
  };

  BILL = {
    PAID: 'bill/update_status_paid',
    CONFIRM_PAID: 'bill/confirm_paid',
    LOAD_DETAIL: 'bill/load_detail',
    COMPUTE: 'bill/compute_bill',
    LOAD_DATA: `bill/load_room_in_month`,
    LOAD_BILL_BY_ROOM: 'bill/load_bill_of_room',
    COMPUTE_BILL_BY_ROOM: 'bill/compute_bill_by_room',
    COMPUTE_BILL_TO_CLOSE_CONTRACT: 'bill/compute_bill_to_close_contract',
    SEND_ZALO_FOR_ROOM: 'bill/send_zalo_for_room',
    SEND_ZALO_FOR_APARTMENT: 'bill/send_zalo_for_apartment',
    SEND_ZALO_FOR_PAID_BILL_ROOM: 'bill/send_zalo_for_paid_bill_room',
    LOAD_BILL_BY_ROOM_ZALO: 'bill/load_bill_of_room_zalo',
    LOAD_BILL_SENT_FAILED: 'bill/load_bill_sent_zalo_failed_in_month',

    RECOMPUTE_BILL_JOB: 'bill/recompute_bill_job',
    RECOMPUTE_BILL_ROOM: 'bill/recompute_bill_room',
    CREATE_BILL_SERVICE: 'bill/create_bill_service',
    CREATE_BILL_OTHER: 'bill/create_bill_other',
    DELETE_BILL_OTHER: 'bill/delete_bill_other',

    UPDATE_PAID_BILL: 'bill/update_paid_bill',
    UPDATE_PAID_BR: 'bill/update_paid_bill_room',
    UPDATE_PAID_BO: 'bill/update_paid_bill_other',
    UPDATE_PAID_BJ: 'bill/update_paid_bill_job',
    UPDATE_PAID_BS: 'bill/update_paid_bill_service',
    UPDATE_TRANSFER_BILL: 'bill/update_paid_transfer_bill',
    UPDATE_TRANSFER_BR: 'bill/update_paid_transfer_bill_room',
    UPDATE_TRANSFER_BO: 'bill/update_paid_transfer_bill_other',
    UPDATE_TRANSFER_BJ: 'bill/update_paid_transfer_bill_job',
    UPDATE_TRANSFER_BS: 'bill/update_paid_transfer_bill_service',
    CONFIRM_TRANSFER_BILL: 'bill/confirm_paid_transfer_bill',
    CONFIRM_TRANSFER_BR: 'bill/confirm_paid_transfer_bill_room',
    CONFIRM_TRANSFER_BO: 'bill/confirm_paid_transfer_bill_other',
    CONFIRM_TRANSFER_BJ: 'bill/confirm_paid_transfer_bill_job',
    CONFIRM_TRANSFER_BS: 'bill/confirm_paid_transfer_bill_service',

    DETAIL_BILL_ROOM: 'bill/load_detail_bill_room',
    DETAIL_BILL_OTHER: 'bill/load_detail_bill_other',
    DETAIL_BILL_SERVICE: 'bill/load_detail_bill_service',
    DETAIL_BILL_JOB: 'bill/load_detail_bill_job',
  };

  CONTRACTSERVICE = {
    LOAD_DATA: `resident/load_data`,
    PAGINATION: 'resident/pagination',
    CREATE: 'resident/create_data',
    UPDATE: 'resident/update_data',
    DELETE: 'resident/update_active',
  };

  SUPPLIER = {
    LOAD_DATA: `suppliers/load_data`,
    FINDONE: 'suppliers/find_one',
    PAGINATION: 'suppliers/pagination',
    CREATE: 'suppliers/create_data',
    UPDATE: 'suppliers/update_data',
    DELETE: 'suppliers/update_active',
  };

  PAYSLIP = {
    FINDONE: 'payslip/find_one',
    PAGINATION: 'payslip/pagination',
    CREATE: 'payslip/create_data',
    UPDATE: 'payslip/update_data',
    DELETE: 'payslip/update_delete',
    APPROVED: 'payslip/update_approved',
    CANCEL: 'payslip/update_cancel',
    PRINT: 'payslip/print',
    CREATE_JOB: 'payslip/create_data_job',
    APPROVED_LIST: 'payslip/update_approved_list',
  };

  CHARTER_CAPITAL = {
    FINDONE: 'charter_capital/find_one',
    PAGINATION: 'charter_capital/pagination',
    CREATE_PAYMENT: 'charter_capital/create_payment',
    CREATE_WITHDRAW: 'charter_capital/create_withdraw',
    UPDATE: 'charter_capital/update_data',
    DELETE: 'charter_capital/update_delete',
    APPROVED: 'charter_capital/update_approved',
    CANCEL: 'charter_capital/update_cancel',
  };

  RECEIPT = {
    PAGINATION: 'receipt/pagination',
    CREATE: 'receipt/create_data',
    UPDATE: 'receipt/update_data',
    DELETE: 'receipt/update_active',
    LOAD_DETAIL: 'receipt/load_detail',
    PRINT: 'receipt/print',
  };

  NOTIFY = {
    FIND: 'notify/find',
    FINDONE: 'notify/find_one',
    PAGINATION: 'notify/pagination',
    CREATE: 'notify/create_data',
    UPDATE: 'notify/update_data',
    DELETE: 'notify/update_active',
    CREATE_EXCEL: 'notify/create_data_excel',
    LOAD: 'notify/load',
    LOAD_DATA: 'notify/load_data',
    READ: 'notify/read',
    READ_LIST: 'notify/read_list_notify',
    LOAD_NEWS_FROM_DATA: 'notify/load_news_from_data',
  };

  NOTIFYCATEGORY = {
    LOAD_DATA: `notify_category/load_data`,
    FIND: 'notify_category/find',
    FINDONE: 'notify_category/find_one',
    PAGINATION: 'notify_category/pagination',
    CREATE: 'notify_category/create_data',
    UPDATE: 'notify_category/update_data',
    DELETE: 'notify_category/update_active',
    CREATE_EXCEL: 'notify_category/create_data_excel',
    ACTIVE: 'notify_category/update_active',
  };

  JOB = {
    LOAD_DATA: `job/load_data`,
    LOAD_DATA_COMPLETE: `job/load_data_complete`,
    DETAIL: 'job/load_detail',
    PAGINATION: 'job/pagination',
    CREATE: 'job/create_data',
    UPDATE: 'job/update_data',
    DELETE: 'job/update_delete',
    APPROVED: 'job/update_approved',
    CANCEL: 'job/update_cancel',
    COMPLETE: 'job/update_complete',
    LOAD: 'job/load',
    UPDATE_PRICE: 'job/update_price',
    CREATE_MULTI_JOB: 'job/create_data_multi',
    UPDATE_PAID_SIGLE: 'job/update_paid_single',
    COMFIRM_PAID_SINGLE: 'job/confirm_paid_single',
    // LOAD_JOB_SENT_ZALO_FAIL: 'job/load_job_sent_zalo_fail',
  };

  JOB_DAILY = {
    FIND: 'jobDaily/find',
    FINDONE: 'jobDaily/find_one',
    DETAIL: 'jobDaily/load_detail',
    PAGINATION: 'jobDaily/pagination',
    CREATE: 'jobDaily/create_data',
    UPDATE: 'jobDaily/update_data',
    ACTIVE: 'jobDaily/update_active',
    UPDATE_APARTMENT: 'jobDaily/update_data_apartment',
  };

  REPORT = {
    PAYMENT: 'report/payment_in_month',
    PAYSLIP: 'report/payslip_in_month',
    SUMMARY_FINANCE: 'report/summary_finance',
    SUMMARY_APARTMENT: 'report/revenue_month_in_apartment',
    PAYSLIP_APARTMENT: 'report/payslip_apartment',
    PAYSLIP_OFFICE: 'report/payslip_office',
    PROFIT_MONTH_APARTMENT: 'report/profit_month_in_apartment',
    ASSET_AND_DEPRECIATION: 'report/asset_tracking_and_depreciation',
    CASH_FLOW_ANALYSIS: 'report/cash_flow_analysis',
    REVENUE_BY_APARTMENT: 'report/revenue_by_apartment',
    SUMMARY_REVENUE_APARTMENT: 'report/summary_revenue_apartment',
    JOB_DAILY_IN_APARTMENT: 'report/job_daily_in_apartment',
    REVENUE_DETAIL_BY_APARTMENT: 'report/revenue_detail_by_apartment',
    DEPOSIT_REPORT: 'report/deposit_report',
    BILL_SENT_ZALO: 'report/load_bill_sent_zalo_in_month',
    ROOM_STATUS: 'report/room_status',
    SENT_ZALO_IN_MONTH: 'report/sent_zalo_in_month',
    BAO_CAO_THU_CHI_CUA_1_KHU: 'report/bao_cao_thu_chi_cua_1_khu',
    BAO_CAO_THUC_THU: 'report/bao_cao_thuc_thu',
  };

  MESSAGE = {
    LOAD_DATA: 'message/load_data',
    FIND: 'message/find',
    FINDONE: 'message/find_one',
    PAGINATION: 'message/pagination',
    CREATE: 'message/create_data',
    UPDATE: 'message/update_data',
    ACTIVE: 'message/update_active',
    LOAD_DETAIL: 'message/load_detail',
  };

  USER = {
    LOAD_DATA: 'user/load_data',
    UPDATE_CURRENT_USER: 'user/update_current_user',
  };

  COMPLAINT = {
    FIND: 'complaint/find',
    LOAD_DETAIL: 'complaint/load_detail',
    PAGINATION_ADMIN: 'complaint/pagination_for_admin',
    PAGINATION_EMPLOYEE: 'complaint/pagination_for_employee',
    CREATE: 'complaint/create_data',
    UPDATE: 'complaint/update_data',
    UPDATE_COMPLETE: 'complaint/update_complete',
  };

  COMPLAINTTYPE = {
    LOAD_DATA: 'complaintType/load_data',
    FIND: 'complaintType/find',
    PAGINATION: 'complaintType/pagination',
    CREATE: 'complaintType/create_data',
    UPDATE: 'complaintType/update_data',
    ACTIVE: 'complaintType/update_active',
  };

  EMPLOYEE_DEBT = {
    PAGINATION: 'employeedebt/pagination',
    DETAIL: 'employeedebt/load_detail',
    UPDATE: 'employeedebt/update_status',
    HISTORY: 'employeedebt/load_history',
    APARTMENT: 'employeedebt/load_apartment_debt',
  };

  EMPLOYEE_ADVANCE = {
    CREATE: 'employeeAdvance/create_data',
    CREATE_DETAIL: 'employeeAdvance/create_advance_detail',
    DELETE_DETAIL: 'employeeAdvance/delete_advance_detail',
    CANCEL_DETAIL: 'employeeAdvance/cancel_advance_detail',
    APPROVED_DETAIL: 'employeeAdvance/approved_advance_detail',
    PAGINATION: 'employeeAdvance/pagination',
    DETAIL: 'employeeAdvance/load_detail',
    UPDATE: 'employeeAdvance/update_status',
    HISTORY: 'employeeAdvance/load_history',
  };

  ARCHIVAL_FILE = {
    LOAD_DETAIL: 'archivalFile/load_detail',
    PAGINATION: 'archivalFile/pagination',
    CREATE: 'archivalFile/create_data',
    UPDATE: 'archivalFile/update_data',
    DELETE: 'archivalFile/update_active',
  };

  CASH = {
    FIND: 'cashFlowAnalysis/find',
    LOAD_DETAIL: 'cashFlowAnalysis/load_detail',
    LOAD_PREVIOUS: 'cashFlowAnalysis/load_previous',
    PAGINATION: 'cashFlowAnalysis/pagination',
    CREATE: 'cashFlowAnalysis/create_data',
    UPDATE: 'cashFlowAnalysis/update_data',
    UPDATE_ACTIVE: 'cashFlowAnalysis/update_active',
  };

  UTILITY = {
    LOAD_DATA: 'utility/load_data',
    FIND: 'utility/find',
    FINDONE: 'utility/find_one',
    PAGINATION: 'utility/pagination',
    PAGINATION_BY_APARTMENT_UTILITY: 'utility/pagination_by_apartment_utility',
    CREATE: 'utility/create_data',
    CREATE_APARTMENT_UTILITY: 'utility/create_apartment_utility',
    CREATE_ROOM_UTILITY: 'utility/create_room_utility',
    CREATE_DATA_BY_EXCEL: 'utility/create_data_list',
    CREATE_ROOM_UTILITY_BY_EXCEL: 'utility/create_room_utility_list',
    UPDATE: 'utility/update_data',
    DELETE: 'utility/update_active',
    APARTMENT_UTILITY_PAGINATION: 'utility/apartment_utility_pagination',
    ROOM_UTILITY_PAGINATION: 'utility/room_utility_pagination',
    LOAD_ROOM_BY_APARTMENT: 'utility/load_room_by_apartment',
    LOAD_ROOM_UTILITY: 'utility/load_room_utility',
    LOAD_ALL_ROOM_UTILITY: 'utility/load_all_rooms_utility'
  }
  
  RESIDENT_DEPOSIT = {
    DETAIL: 'resident_deposit/find_detail',
    FIND: 'resident_deposit/find',
    PAGINATION: 'resident_deposit/pagination',
    CREATE: 'resident_deposit/create_data',
    UPDATE: 'resident_deposit/update_data',
    DELETE: 'resident_deposit/update_active',
    FIND_ROOM_RESIDENT_DEPOSIT: 'resident_deposit/find_room_resident_deposit',
    CANCEL: 'resident_deposit/update_cancel',
    COLLECT_MORE_DEPOSIT: 'resident_deposit/collect_more_deposit',
    FIND_ONE_WITH_LIST_STATUS: 'resident_deposit/find_one_with_list_status',
  };

  WARNING = {
    LOAD_DATA: 'warning/load_all_data',
    LOAD_DATA_FOR_USER: 'warning/load_data_for_user',
    CREATE_DATA: 'warning/create_data',
  }

  //#endregion

  //#region Handle

  objToQueryString = (obj: any) =>
    Object.keys(obj)
      .map((k) => {
        if (Array.isArray(obj[k])) {
          return `${k}=${JSON.stringify(obj[k])}`;
        }
        return `${k}=${obj[k]}`;
      })
      .join('&');

  post(url: string, data: any) {
    return (
      this.http
        .post(this.host + url, data)
        .toPromise()
        // tslint:disable-next-line: no-shadowed-variable
        .then((data: any) => {
          return data as any;
        })
    );
  }

  put(url: string, data: any) {
    return (
      this.http
        .put(this.host + url, data)
        .toPromise()
        // tslint:disable-next-line: no-shadowed-variable
        .then((data: any) => {
          return data as any;
        })
    );
  }

  get(url: string, data: any) {
    const query = this.objToQueryString(data);
    const newUrl = `${this.host + url}?${query}`;

    return (
      this.http
        .get(newUrl)
        .toPromise()
        // tslint:disable-next-line: no-shadowed-variable
        .then((data: any) => {
          return data as any;
        })
    );
  }
  //#endregion
}
