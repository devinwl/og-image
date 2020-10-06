export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    fileType: FileType;
    md: boolean;
    summary: string;
    text: string;
}
