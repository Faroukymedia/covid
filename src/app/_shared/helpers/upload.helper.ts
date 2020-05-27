export const MAX_FILE_SIZE = 3145728;

const FILE_MAX_NUMBER = 12;

const FILE_MAX_NUMBER_PER_TYPE = 5;

export const AUTHORIZED_FILES_TYPES = [
  'application/pdf',
  '.pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.docx',
  '.doc',
  'image/jpeg',
  'image/png',
  '.jpeg',
  '.jpg',
  '.png',
];

export const IMAGE_FILE_TYPE = ['image/jpeg', 'image/png', '.jpeg', '.jpg', '.png'];

export class UploadHelper {
  public static get inputAccept(): string {
    return AUTHORIZED_FILES_TYPES.join(',');
  }

  public static isUploadableFileForMaestro(file: File) {
    return AUTHORIZED_FILES_TYPES.includes(file.type.toLowerCase());
  }

  public static isFileTooBig(file: File) {
    return file.size >= MAX_FILE_SIZE;
  }

  public static isImageFileType(file: File) {
    return IMAGE_FILE_TYPE.includes(file.type.toLowerCase());
  }

  public static hasTooMuchFile(array: any[]) {
    return array.length >= FILE_MAX_NUMBER;
  }

  public static hasTooMuchFilePerType<T>(
    array: any[],
    filterFunc: (value: any, index: number, array: any[]) => any
  ) {
    return array.filter(filterFunc).length >= FILE_MAX_NUMBER_PER_TYPE;
  }
}
