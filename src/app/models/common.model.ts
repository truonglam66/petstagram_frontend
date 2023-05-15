export interface SettingString {
  name?: string
}

export interface Service {
  id?: string
  name?: string
  level?: number
  isLast?: string
  disable?: boolean
}

export interface Department {
  id: string
  name?: string
}

export interface Employee {
  id: string
  name?: string
}

export interface BidType {
  id: string
  name?: string
  code?: string
}
