export interface IVacation {
    id: number,
    name: string,
    description: string,
    fromDate: Date,
    toDate: Date,
    picUrl: string,
    price: number,
    followers?: number,
    likes?: number
}
