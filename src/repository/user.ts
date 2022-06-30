import { User } from '../model/index'

export default {
    create: async (newUser: UserInfo) => {
        return await User.create(newUser)
    },
    getByUserName: async (userName: string) => {
        return await User.findOne({ userName })
    },
    getByUserInfo: async (userInfo: UserInfo) => {
        return await User.findOne(userInfo, 'userName password') as UserInfo;
    },
    getById: async (id: string) => {
        return await User.findById(id)
    },
    addSmokePoint: async (id: string, smoke: Smoke) => {
        return await User.findByIdAndUpdate(id, { $push: { smoke: smoke } })
    },
    getSmoke: async (id: string, date: Date | null = null): Promise<Smoke[]> => {
        const smoke = await User.findById(id, 'smoke').then(result => result?.smoke as Array<Smoke>);
        let yesterDay = new Date();
        let tomorrow = new Date();
        if (date !== null) {
            yesterDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        }
        return date === null ?
            smoke : smoke.
                filter(
                    (
                        (item: Smoke) => yesterDay < item.when && item.when < tomorrow
                    )
                );
    },
}