export interface ProductInt {
  _id?: string
  name: string,
  category: string,
  price: string,
  quantity: string,
  description: string,
  image?: {
    fileName: string
    filePath: string
    fileSize: string
    fileType: string
  }
}
