export interface ExcelTemplate {
  fileName?: string
  sheetName?: string
  columns: ExcelTempateColumn[]
}

export interface ExcelTempateColumn {
  field: string
  title: string
  required?: boolean
  ngStyleHeader?: {
    [key: string]: any
  }
  width?: string
}
