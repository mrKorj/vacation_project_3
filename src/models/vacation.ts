export interface IVacation {
    id: number,
    name: string,
    description: string,
    beginDate: Date,
    expDate: Date,
    picUrl: string,
    price: number,
    followers?: number,
    likes?: number
}
