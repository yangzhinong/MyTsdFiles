//跨域上传文件响应接口.
declare namespace GZ {

    export interface ImgUploadResponse {
        files: IFile[];
    }

    interface IFile {
        filePath: string;
        url: string;
        type: string;
        length: number;
        oldFileName: string;
        oldFileNameWithOutExtension: string;
    }

}