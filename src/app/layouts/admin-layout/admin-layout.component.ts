import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CoreService } from '../../services/core.service';

import * as Flatted from 'flatted';
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
    await this.appService.post(this.appService.NOTIFY.LOAD_NEWS_FROM_DATA, "").then((res) => {
      this.listNews = res;
      this.listNews.forEach((news: any) => {
        this.listNewsShowData = this.listNewsShowData.concat(news.title+": "+news.content+"\t\t");
      })
    })

    this.appService.eventChangeLocal.subscribe((res) => {
      if (res === true) {
        const temp: any = null;
        let arr = localStorage.getItem('currentUser')
          ? Flatted.parse(localStorage.getItem('currentUser') || temp)
          : temp;
        this.currentUser.apartmentId = arr.apartmentId;
      }
    });
    {
      this.Permission = this.enumData.Role.Permission;
      this.Department = this.enumData.Role.Department;
      this.SettingString = this.enumData.Role.SettingString;
      this.Employee = this.enumData.Role.Employee;
      this.Contract = this.enumData.Role.Contract;
      this.Resident = this.enumData.Role.Resident;
      this.Bill = this.enumData.Role.Bill;
      this.Job = this.enumData.Role.Job;
      this.CharterCapital = this.enumData.Role.CharterCapital;
      this.Payslip = this.enumData.Role.Payslip;
      this.Receipt = this.enumData.Role.Receipt;
      this.Area = this.enumData.Role.Area;
      this.Apartment = this.enumData.Role.Apartment;
      this.Room = this.enumData.Role.Room;
      this.Service = this.enumData.Role.Service;
      this.JobCategory = this.enumData.Role.JobCategory;
      this.PaymentCategory = this.enumData.Role.PaymentCategory;
      this.Supplier = this.enumData.Role.Supplier;
      this.Notify = this.enumData.Role.Notify;
      this.Report = this.enumData.Role.Report;
      this.AssetManagement = this.enumData.Role.AssetManagement;
      this.AssetTypeManagement = this.enumData.Role.AssetTypeManagement;
      // this.Message = this.enumData.Role.Message

      this.AreaStatus = this.enumData.Role.AreaStatus;
      this.Complaint = this.enumData.Role.Complaint;
      this.ComplaintType = this.enumData.Role.ComplaintType;
      this.EmployeeDebt = this.enumData.Role.EmployeeDebt;
      this.EmployeeAdvance = this.enumData.Role.EmployeeAdvance;

      this.JobDailyInApartmentReport =
        this.enumData.Role.JobDailyInApartmentReport;
      this.FinanceAnalysis = this.enumData.Role.FinanceAnalysis;
      this.FinanceSummaryReport = this.enumData.Role.FinanceSummaryReport;
      this.RevenueApartmentByTypeReport =
        this.enumData.Role.RevenueApartmentByTypeReport;
      this.RevenueApartmentInMonthReport =
        this.enumData.Role.RevenueApartmentInMonthReport;
      this.SummaryRevenueApartmentReport =
        this.enumData.Role.SummaryRevenueApartmentReport;
      this.RevenueDetail = this.enumData.Role.RevenueDetail;
      this.CostApartmentReport = this.enumData.Role.CostApartmentReport;
      this.CostDepartmentReport = this.enumData.Role.CostDepartmentReport;
      this.CostDetailReport = this.enumData.Role.CostDetailReport;
      this.CashFlowAnalysisReport = this.enumData.Role.CashFlowAnalysisReport;
      this.AssetReport = this.enumData.Role.AssetAndDepreciationReport;
      this.ProfitApartmentInMonthReport =
        this.enumData.Role.ProfitApartmentInMonthReport;
      this.AssetAndDepreciationReport =
        this.enumData.Role.AssetAndDepreciationReport;
      this.BillSentToZalo = this.enumData.Role.BillSentToZalo;
      this.CollectionReport = this.enumData.Role.CollectionReport;
      this.AssetCategory = this.enumData.Role.AssetCategory;
      this.DepositReport = this.enumData.Role.DepositReport;
      this.currentUserName = this.authenticationService.currentUserValue.username;
      this.userAvatarUrl = this.currentUser.avatarUrl
      $(`#user-avatar`).attr("src",this.userAvatarUrl);
    }

    this.menuBarElement = $(`.app-navbar`);
    this.menuBarWidth = this.menuBarElement.width();

    this.getSocket();
    this.loadNotify();
    this.loadAllDataSelect();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/user/login']);
  }
  afterClose(): void {
    console.log('close');
  }
  loadNotify() {
    // this.loading = true;
    // this.appService
    //   .post(this.appService.NOTIFY.LOAD, {
    //     take: this.numNotify,
    //   })
    //   .then((res: { lstNotify: any[]; numNofityNew: number }) => {
    //     this.lstNotify = res.lstNotify;
    //     this.loading = false;
    //     this.numNofityNew = res.numNofityNew;

    //     for (const wa of this.lstNotify) {
    //       wa.checked = false;
    //     }
    //   });
  }

  onClickScrollHandler = (id: any) => {
    const menuWidth = $(`.sidebar-menu`).width()!*8
    const navbarWidth = $(`.app-navbar`).width()!
    const maxScrollDistance = (menuWidth - navbarWidth)
    if(id === 'arrow-right') {
      this.scrollDistance += maxScrollDistance;
      this.menuBarElement.animate(
        {
          scrollLeft: this.scrollDistance,
        }
      );
    }
    else if(id === 'arrow-left') {
      this.scrollDistance -= maxScrollDistance;
      this.menuBarElement.animate(
        {
          scrollLeft: this.scrollDistance,
        }
      );
    }
    if(this.isScrollLeftClimaxed()) this.scrollDistance = 0;
    if(this.isScrollRightClimaxed()) this.scrollDistance = maxScrollDistance;
  }

  isScrollLeftClimaxed = () => {
    return this.scrollDistance <= 0;
  }
  
  isScrollRightClimaxed = () => {
    return this.scrollDistance >= $(`.sidebar-menu`).width()!*8 - $(`.app-navbar`).width()!
  }

  onClickLogout = () => {
    this.authenticationService.logout();
    window.location.reload();
  }

  setLayoutColor = (event: any) => {
    let layoutColor = event.target.style.backgroundColor.toString();
    $('.app-navbar').css('background', layoutColor);
    $('.app-header').css('background', layoutColor);
  }

  setAppFontFamily = (event: any) => {
    let font = event.target.innerText;
    $(`*`).css('font-family', font);
  }

  getSocket() {

    this.socket.getNotifyNewSettingString().subscribe((res: any) => {
      if (res) {
      }
    });
  }

  loadMoreNotify() {
    this.numNotify += 10;
    this.loadNotify();
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

  hideModalViewNotify() {
    this.isVisibleNotify = false;
    this.numNotify = 10;
    this.loadNotify();
  }

  onReadAllNotify() {
    let data: any = [];
    if (this.setOfCheckedId.size > 0) {
      this.setOfCheckedId.forEach((x) => {
        if (x.status === this.enumData.NotifyStatus.New.code) {
          data.push({ id: x.id });
        }
      });
      this.notifyService.showloading();
      this.appService
        .post(this.appService.NOTIFY.READ_LIST, data)
        .then((res) => {
          this.notifyService.show(
            this.enumData.NotifyType.Success,
            res.message
          );
          this.notifyService.hideloading();
          this.loadNotify();
        });
    } else {
      this.notifyService.show(
        this.enumData.NotifyType.Warning,
        'Vui lòng chọn ít nhất một thông báo!'
      );
    }
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn muốn đánh dấu đọc tất cả thông báo?',
      nzOkText: 'Đánh dấu đọc tất cả',
      nzCancelText: 'Hủy',
      nzOnOk: () => this.onReadAllNotify(),
    });
  }

  loadAllDataSelect() {
    this.notifyService.showloading();
    this.appService
      .post(this.appService.APARTMENT.LOAD_DATA, {})
      .then(async (res) => {
        this.notifyService.hideloading();
        let lstApartment = res;
        for (let d of lstApartment) {
          let arr = d.name.split(', ');
          d.name = arr.join(' ');
        }
        this.apartmentCurrent = lstApartment.find(
          (s: any) => s.id == this.currentUser.apartmentId
        );
      });
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
