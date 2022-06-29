interface UserInfo {
    userName: string,
    password: string,
    id: string
}

interface SmokeLocation {
    x: string,
    y: string,
}

interface Smoke {
    when: Date,
    where: SmokeLocation
}

interface ReportDetail{
    time: {
        seconds:number,
        minutes:number,
        hours:number,
    },
    location: SmokeLocation
}

interface DailyReport{
    count: number,
    day: string,
    detail: ReportDetail[]
}

type SmokingReport = DailyReport[]