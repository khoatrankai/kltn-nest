
export interface FileUpload {
    /**
     * Buffer of file
     */
    buffer: Buffer;

    /**
     * Original name of file
     */
    originalname: string;

}

export interface UploadOpions {
    /**
     * BUCKET NAME
     * @description
     * This is the prefix folder name of the file
     * 
     * @example
     * a file name has url: https://s3.amazonaws.com/folder/folder-name/file-name.jpg
     * then BUCKET is folder-name: BUCKET: 'folder/folder-name'
     * 
     * @required
     */
    BUCKET: string;

    /**
     * ID
     * @description
     * This is the folder name of the file
     * 
     * @example
     * a file name has url: https://s3.amazonaws.com/post/1/file-name.jpg
     * then ID is 1: ID: '1'
     * 
     * @optional
     */
    id?: string | number;

    commentId?: string | number;

    accountId?: string | number;
}
