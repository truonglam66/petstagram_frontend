import { environment } from '../../environments/environment';
export const enumData = {
  /** Kích thước tối đa tính bằng MB */
  maxSizeUpload: 10,
  BaseUrl: {
    backEnd: environment.backEnd,
  },
  ApiUrl: environment.backEnd,

  /** Kích thước tối đa tính bằng MB */
  UploadUrl: `${environment.backEnd}/uploadFiles/upload_single`,
  Page: {
    pageIndex: 1,
    pageSize: 10,
    pageSizeMax: 1000000,
    total: 0,
  },
  Constants: {
    Message_Create_Success: 'Thêm mới thành công!',
    Message_Update_Success: 'Cập nhật thành công!',
    Message_Delete_Success: 'Xoá thành công!',
    Message_Import_Success: 'Nhập excel thành công!',
    Message_Action_Success: 'Thao tác thành công!',
  },
  StatusFilter: {
    All: { value: 0, code: 'all', name: 'Tất cả' },
    Active: { value: 1, code: 'active', name: 'Đang hoạt động' },
    InActive: { value: 2, code: 'inactive', name: 'Ngưng hoạt động' },
  },
  StatusFilterNew: {
    All: { value: null, code: 'all', name: 'Tất cả' },
    Active: { value: false, code: 'active', name: 'Đang hoạt động' },
    InActive: { value: true, code: 'inactive', name: 'Ngưng hoạt động' },
  },
  LightColor: {
    LightCyan: "#a6d6d6",
    LightGoldRob: "#e6d5aa",
    LightRed: "#d19999",
    LightViolet: "#dfb2f2",
    LightBlue: "#9999d1",
    LightGreen: "#99c199",
  },
  DarkColor: {
    DarkCyan: "#008B8B",
    DarkGoldRob: "#B8860B",
    DarkRed: "#8B0000",
    DarkVilolet: "#9400d3",
    DarkBlue: "#00008b",
    DarkGreen: "#006400",
  },
  StatusOfPrice: {
    Standand: { code: 'standand', name: 'dưới 5 triệu VND'},
    Extra: { code: 'extra', name: '5 - 20 triệu VND'},
    Premium: { code: 'premium', name: 'trên 20 triệu VND'},
  },
};
