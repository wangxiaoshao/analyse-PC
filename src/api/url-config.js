/**
 * Created by luoxie on 2019-07-17.
 */
import homePage from "./modules/homePage";
import dataStatistics from "./modules/data-statistics";
import messageReminding from "./modules/message-reminding";
import roleManage from "./modules/role-manage";
import dataTemplate from "./modules/data-template";
import systemLog from "./modules/system-log";
import helpCenter from "./modules/help-center";
import shareManage from "./modules/share-manage";
import assessment from "./modules/assessment";
export default {
    // 应用管理
    ...homePage,
    ...dataStatistics,
    ...messageReminding,
    ...roleManage,
    ...dataTemplate,
    ...systemLog,
    ...helpCenter,
    ...shareManage,
    ...assessment,
};
