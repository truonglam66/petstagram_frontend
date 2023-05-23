import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CoreService } from '../../services/core.service';

import * as $ from 'jquery';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { enumData } from '../../core/enumData';
import { NotifyService } from '../../services/notify.service';
import { SocketService } from '../../services/socket.service';
import { EditAccountComponent } from '../edit-account/edit-account.component';



@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  currentUser: User | any;
  isCollapsed = true;
  enumData: any;
  Permission: any;
  Department: any;
  SettingString: any;
  Employee: any;
  Contract: any;
  Resident: any;
  Bill: any;
  Job: any;
  CharterCapital: any;
  Payslip: any;
  Receipt: any;
  Area: any;
  Apartment: any;
  Room: any;
  Service: any;
  JobCategory: any;
  PaymentCategory: any;
  Supplier: any;
  Notify: any;
  NotifyType: any;
  Report: any;
  AssetManagement: any;
  AssetTypeManagement: any;
  // Message: any
  AreaStatus: any;
  Complaint: any;
  ComplaintType: any;
  title!: any;
  checked: boolean = false;
  allChecked: boolean = false;
  indeterminate: any = false;
  setOfCheckedId = new Set<any>();
  isVisibleNotify = false;
  lstNotify: any[] = [];
  numNotify: number = 10;
  numNofityNew!: number;
  loading = false;
  EmployeeDebt: any;
  EmployeeAdvance: any;
  confirmModal?: NzModalRef;

  FinanceAnalysis: any;
  FinanceSummaryReport: any;
  RevenueApartmentByTypeReport: any;
  RevenueApartmentInMonthReport: any;
  RevenueDetail: any;
  CostApartmentReport: any;
  CostDepartmentReport: any;
  CostDetailReport: any;
  CashFlowAnalysisReport: any;
  AssetReport: any;
  ProfitApartmentInMonthReport: any;
  AssetAndDepreciationReport: any;
  JobDailyInApartmentReport: any;
  SummaryRevenueApartmentReport: any;
  BillSentToZalo: any;
  CollectionReport: any;
  AssetCategory: any;
  DepositReport: any;

  userAvatarUrl: any;
  currentUserName: any;

  isShow: boolean = true;
  apartmentCurrent: any;

  menuBarElement : any;
  menuBarWidth = 0;

  scrollDistance: number = 0;

  isShowSettingList: boolean = false;

  notificationsCount: number = 0;

  dataNotify = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];

  dataAccount = [
    'Đổi avatar',
    'Phông chữ',
    'Đăng xuất'
  ]

  listLightColor = Object.entries(enumData.LightColor);

  listDarkColor = Object.entries(enumData.DarkColor);

  listNews: any = [];

  listNewsShowData: string = "News: ";

  constructor(
    private notifyService: NotifyService,
    private router: Router,
    private authenticationService: AuthenticationService,
    public coreService: CoreService,
    private appService: ApiService,
    private modal: NzModalService,
    public dialog: MatDialog,
    private socket: SocketService,
  ) {
    this.authenticationService.currentUser.subscribe(
      (x: any) => (this.currentUser = x)
    );
    this.authenticationService.currentUser.subscribe(
      (x: any) => (this.enumData = x?.enumData)
    );
  }

  async ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/user/login']);
  }
  afterClose(): void {
    console.log('close');
  }


  onClickLogout = () => {
    this.authenticationService.logout();
    window.location.reload();
  }

  getSocket() {

    this.socket.getNotifyNewSettingString().subscribe((res: any) => {
      if (res) {
      }
    });
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.lstNotify.every((item: any) =>
      this.setOfCheckedId.has(item)
    );
    this.indeterminate =
      this.lstNotify.some((item: any) => this.setOfCheckedId.has(item)) &&
      !this.checked;
  }

  onAllChecked(value: boolean): void {
    this.setOfCheckedId = new Set<any>();
    this.lstNotify
      .filter((x: { status: string }) => x.status !== 'READ')
      .forEach((item: number) => this.updateCheckedSet(item, value));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: any): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  scrollTop() {
    var body = $("html, body");
    body.stop().animate({scrollTop:0}, 500, 'swing', function() {});
  }

  editAccount(data: any) {
    this.dialog.open(EditAccountComponent, { disableClose: false, data })
    .afterClosed()
    .subscribe((res) => {})
  }

  //#endregion
}
