import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CoreService } from './core.service'
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
// import * as InlineEditor from '@ckeditor/ckeditor5-build-inline'

declare var window: any
@Injectable()
export class FileService {
  constructor(private _http: HttpClient, private coreService: CoreService) {}

  // async downloadFile2(fileUrl, filename, type) {
  //   const body = { fileUrl, filename, type }
  //   const url = this.coreService.convertObjToParam(body)
  //   await new Promise<Response>((resolve, reject) => {
  //     this._http
  //       .get(enumData.BaseUrl.backEnd + '/api/v1/documents/getdownload?' + url, {
  //         headers: {
  //           'Content-type': 'application/json',
  //           Accept: type
  //         },
  //         responseType: 'blob'
  //       })
  //       .toPromise()
  //       .then(res => {
  //         const blob = new Blob([res], { type })
  //         const objectUrl = URL.createObjectURL(blob)
  //         window.open(objectUrl)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   })
  // }

  // downloadFile(fileUrl, filename, type) {
  //   const body = { fileUrl, filename, type }
  //   const url = this.coreService.convertObjToParam(body)
  //   this._http
  //     .get(enumData.BaseUrl.backEnd + '/api/v1/documents/getdownload?' + url, {
  //       headers: {
  //         'Content-type': 'application/json',
  //         Accept: type
  //       },
  //       responseType: 'blob'
  //     })
  //     .toPromise()
  //     .then(res => {
  //       const blob = new Blob([res], { type })
  //       saveAs(blob, filename)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  getEditor() {
    // const editor = DecoupledEditor
    // editor.defaultConfig.ckfinder = {
    //   uploadUrl: enumData.BaseUrl.backEnd + '/api/v1/documents/upload'
    // }
    // editor.defaultConfig.image = {
    //   toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
    // }
    // editor.defaultConfig.table = {
    //   contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    // }
    // return editor
  }

  // getEditorInline() {
  //   const editor = InlineEditor
  //   editor.defaultConfig.ckfinder = {
  //     uploadUrl: enumData.BaseUrl.backEnd + '/api/v1/documents/upload'
  //   }
  //   editor.defaultConfig.image = {
  //     toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
  //   }
  //   editor.defaultConfig.table = {
  //     contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  //   }
  //   return editor
  // }
}
