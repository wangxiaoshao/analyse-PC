//  report 路径

/* {
    id: -1, 系统id
    systemName: "", 系统名称
    areaTableSrc:"",区域汇总表格
    areaUrl:"", 区域汇总统计图
    unitUrl:"", 单位汇总
    personUrl: "", 人员明细
    homePersonUrl: "", 首页个人应用情况趋势
    allProvinceUrl: "", 首页全省应用情况趋势
    cityOrCountyUrl: "", 首页市州或区县应用情况趋势
    homeUnitUrl: "",  首页单位应用情况趋势
}, */
export const areaReportList = [
    {
        id: -1,
        systemName: "全部",
        areaTableSrc:
            "whole_statistics%252F%25E5%258C%25BA%25E5%259F%259F%25E6%25B1%2587%25E6%2580%25BB%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2589%2580%25E6%259C%2589%25E7%25B3%25BB%25E7%25BB%259F.cpt&ref_t=design&ref_c=2dd7526d-505a-4578-97b4-c48f9514d7ee",
        areaUrl:
            "whole_statistics%252F%25E5%258C%25BA%25E5%259F%259F%25E6%25B1%2587%25E6%2580%25BB%25E5%259B%25BE%25E8%25A1%25A8%25E6%2589%2580%25E6%259C%2589%25E7%25B3%25BB%25E7%25BB%259F.cpt&ref_t=design&op=write&ref_c=11a58911-162f-4be0-bd16-8175fb2229de",
        unitUrl:
            "whole_statistics%252F%25E5%258D%2595%25E4%25BD%258D%25E6%25B1%2587%25E6%2580%25BB%25E5%259B%25BE%25E8%25A1%25A8%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2589%2580%25E6%259C%2589%25E7%25B3%25BB%25E7%25BB%259F.cpt&ref_t=design&op=write&ref_c=11a58911-162f-4be0-bd16-8175fb2229de",
        personUrl:
            "whole_statistics%252F%25E4%25BA%25BA%25E5%2591%2598%25E6%2598%258E%25E7%25BB%2586%25E5%259B%25BE%25E8%25A1%25A8%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2589%2580%25E6%259C%2589%25E7%25B3%25BB%25E7%25BB%259F.cpt&ref_t=design&op=write&ref_c=ea3f9328-8e86-42eb-abb3-2d2eb114f89d",
        homePersonUrl: "",
        allProvinceUrl: "",
        cityOrCountyUrl: "",
        homeUnitUrl: "",
    },
    {
        id: 1,
        systemName: "门户",
        areaTableSrc:
            "mh_statistics%252F%25E9%2597%25A8%25E6%2588%25B7%25E5%258C%25BA%25E5%259F%259F%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A11.cpt&ref_t=design&ref_c=4bb275ab-a1a8-4d4a-b62f-fe5c1375ada0",
        areaUrl:
            "mh_statistics%252F%25E9%2597%25A8%25E6%2588%25B7%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        unitUrl:
            "mh_statistics%252F%25E9%2597%25A8%25E6%2588%25B7%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        personUrl: "",
        homePersonUrl: "",
        allProvinceUrl:
            "homepage_whole_province%252F%25E5%2585%25A8%25E7%259C%2581%25E9%2597%25A8%25E6%2588%25B7%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=f0f3b31d-4565-4d97-a727-3996f28620c5",
        cityOrCountyUrl:
            "homepage_whole_city_qx%252F%25E5%2585%25A8%25E5%25B8%2582%25E5%258C%25BA%25E9%2597%25A8%25E6%2588%25B7%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        homeUnitUrl:
            "homepage_organization%252F%25E5%258D%2595%25E4%25BD%258D%25E9%2597%25A8%25E6%2588%25B7%25E5%25BA%2594%25E7%2594%25A8%25E8%25B6%258B%25E5%258A%25BF%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
    },
    {
        id: 2,
        systemName: "台账",
        areaTableSrc:
            "tz_statistics%252F%25E5%258F%25B0%25E8%25B4%25A6%25E5%258C%25BA%25E5%259F%259F%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A11.cpt&ref_t=design&ref_c=43abfdf2-f306-4a8a-96cc-69ce74a927a3",
        areaUrl:
            "tz_statistics%252F%25E5%258F%25B0%25E8%25B4%25A6%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=29ea0bd9-e633-449a-b4c7-78f9dc34dc3b",
        unitUrl:
            "tz_statistics%252F%25E5%258F%25B0%25E8%25B4%25A6%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        personUrl:
            "tz_statistics%252F%25E5%258F%25B0%25E8%25B4%25A6%25E4%25BA%25BA%25E5%2591%2598%25E8%25AF%25A6%25E7%25BB%2586%25E6%2595%25B0%25E6%258D%25AE.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        homePersonUrl:
            "homepage_person%252F%25E4%25B8%25AA%25E4%25BA%25BA%25E5%258F%25B0%25E8%25B4%25A6%25E5%25BA%2594%25E7%2594%25A8%25E8%25B6%258B%25E5%258A%25BF%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        allProvinceUrl:
            "homepage_whole_province%252F%25E5%2585%25A8%25E7%259C%2581%25E5%258F%25B0%25E8%25B4%25A6%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=f0f3b31d-4565-4d97-a727-3996f28620c5",
        cityOrCountyUrl:
            "homepage_whole_city_qx%252F%25E5%2585%25A8%25E5%25B8%2582%25E5%258C%25BA%25E5%258F%25B0%25E8%25B4%25A6%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        homeUnitUrl:
            "homepage_organization%252F%25E5%258D%2595%25E4%25BD%258D%25E5%258F%25B0%25E8%25B4%25A6%25E5%25BA%2594%25E7%2594%25A8%25E8%25B6%258B%25E5%258A%25BF%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
    },
    {
        id: 3,
        systemName: "通知公告",
        areaTableSrc:
            "tzgg_statistics%252F%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%258C%25BA%25E5%259F%259F%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&ref_c=9ff6f754-a54e-4200-bc13-b86f29a75d34",
        areaUrl:
            "tzgg_statistics%252F%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        unitUrl:
            "tzgg_statistics%252F%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=e0a26a0d-938a-4067-96a6-49e7dcf5be36",
        personUrl:
            "tzgg_statistics%252F%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E4%25BA%25BA%25E5%2591%2598%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=e0a26a0d-938a-4067-96a6-49e7dcf5be36",
        homePersonUrl:
            "homepage_person%252F%25E4%25B8%25AA%25E4%25BA%25BA%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%25BA%2594%25E7%2594%25A8%25E8%25B6%258B%25E5%258A%25BF%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        allProvinceUrl:
            "homepage_whole_province%252F%25E5%2585%25A8%25E7%259C%2581%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=f0f3b31d-4565-4d97-a727-3996f28620c5",
        cityOrCountyUrl:
            "homepage_whole_city_qx%252F%25E5%2585%25A8%25E5%25B8%2582%25E5%258C%25BA%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        homeUnitUrl:
            "homepage_organization%252F%25E5%258D%2595%25E4%25BD%258D%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%25BA%2594%25E7%2594%25A8%25E8%25B6%258B%25E5%258A%25BF%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
    },
    {
        id: 4,
        systemName: "快传",
        areaTableSrc:
            "kc_statistics%252F%25E5%25BF%25AB%25E4%25BC%25A0%25E5%258C%25BA%25E5%259F%259F%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&ref_c=9ff6f754-a54e-4200-bc13-b86f29a75d34",
        areaUrl:
            "kc_statistics%252F%25E5%25BF%25AB%25E4%25BC%25A0%25E5%258C%25BA%25E5%259F%259F%25E5%259B%25BE%25E8%25A1%25A8%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=900a43f6-931f-4b9d-96e4-4f72710a4b3d",
        unitUrl:
            "kc_statistics%252F%25E5%25BF%25AB%25E4%25BC%25A0%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        personUrl:
            "kc_statistics%252F%25E5%25BF%25AB%25E4%25BC%25A0%25E4%25BA%25BA%25E5%2591%2598%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=e0a26a0d-938a-4067-96a6-49e7dcf5be36",
        homePersonUrl:
            "homepage_person%252F%25E4%25B8%25AA%25E4%25BA%25BA%25E5%25BF%25AB%25E4%25BC%25A0%25E5%25BA%2594%25E7%2594%25A8%25E8%25B6%258B%25E5%258A%25BF%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        allProvinceUrl:
            "homepage_whole_province%252F%25E5%2585%25A8%25E7%259C%2581%25E5%25BF%25AB%25E4%25BC%25A0%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=f0f3b31d-4565-4d97-a727-3996f28620c5",
        cityOrCountyUrl:
            "homepage_whole_city_qx%252F%25E5%2585%25A8%25E5%25B8%2582%25E5%258C%25BA%25E5%25BF%25AB%25E4%25BC%25A0%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        homeUnitUrl:
            "homepage_organization%252F%25E5%258D%2595%25E4%25BD%258D%25E5%25BF%25AB%25E4%25BC%25A0%25E5%25BA%2594%25E7%2594%25A8%25E8%25B6%258B%25E5%258A%25BF%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=29ea0bd9-e633-449a-b4c7-78f9dc34dc3b",
    },
    {
        id: 5,
        systemName: "组织机构",
        areaTableSrc:
            "zcjj_statistics%252F%25E7%25BB%2584%25E7%25BB%2587%25E6%259C%25BA%25E6%259E%2584%25E5%258C%25BA%25E5%259F%259F%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1%25E9%259B%25861.cpt&ref_t=design&ref_c=43abfdf2-f306-4a8a-96cc-69ce74a927a3",
        areaUrl:
            "zcjj_statistics%252F%25E7%25BB%2584%25E7%25BB%2587%25E6%259C%25BA%25E6%259E%2584%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        unitUrl:
            "zcjj_statistics%252F%25E7%25BB%2584%25E7%25BB%2587%25E6%259C%25BA%25E6%259E%2584%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        personUrl: "",
    },
    {
        id: 6,
        systemName: "公文与事务办理",
        areaTableSrc:
            "gw_statistics%252F%25E5%2585%25AC%25E6%2596%2587%25E5%258C%25BA%25E5%259F%259F%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A11.cpt&ref_t=design&ref_c=43abfdf2-f306-4a8a-96cc-69ce74a927a3",
        areaUrl:
            "gw_statistics%252F%25E5%2585%25AC%25E6%2596%2587%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=29ea0bd9-e633-449a-b4c7-78f9dc34dc3b",
        unitUrl:
            "gw_statistics%252F%25E5%2585%25AC%25E6%2596%2587%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=29ea0bd9-e633-449a-b4c7-78f9dc34dc3b",
        personUrl: "",
    },
    {
        id: 7,
        systemName: "单点登录",
        areaTableSrc:
            "cas_statistics%252F%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E5%258C%25BA%25E5%259F%259F%25E8%25A1%25A8%25E6%25A0%25BC%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&ref_c=9ff6f754-a54e-4200-bc13-b86f29a75d34",
        areaUrl:
            "cas_statistics%252F%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        unitUrl:
            "cas_statistics%252F%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        personUrl:
            "cas_statistics%252F%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E4%25BA%25BA%25E5%2591%2598%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=e0a26a0d-938a-4067-96a6-49e7dcf5be36",
        homePersonUrl:
            "homepage_person%252F%25E4%25B8%25AA%25E4%25BA%25BA%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E5%25BA%2594%25E7%2594%25A8%25E8%25B6%258B%25E5%258A%25BF%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        allProvinceUrl:
            "homepage_whole_province%252F%25E5%2585%25A8%25E7%259C%2581%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=f0f3b31d-4565-4d97-a727-3996f28620c5",
        cityOrCountyUrl:
            "homepage_whole_city_qx%252F%25E5%2585%25A8%25E5%25B8%2582%25E5%258C%25BA%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        homeUnitUrl:
            "homepage_organization%252F%25E5%258D%2595%25E4%25BD%258D%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E5%25BA%2594%25E7%2594%25A8%25E8%25B6%258B%25E5%258A%25BF%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
    },
];
export const reportParams = {
    // 首页各个角色单位和人员使用数据
    exportUrl:
        "export_statistics%252F%25E5%25AF%25BC%25E5%2587%25BA%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
    rolesUnitUser: [
        {
            roleName: "UNIT_MANAGER",
            unitSrc:
                "zzjgxxwh_sj%252F%25E7%25BB%2584%25E7%25BB%2587%25E6%259C%25BA%25E6%259E%2584%25E4%25BF%25A1%25E6%2581%25AF%25E7%25BB%25B4%25E6%258A%25A4%25E6%2595%25B0%25E6%258D%25AE%25E5%25B8%2582%25E7%25BA%25A7.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
            userSrc:
                "pjsjl_sj%252F%25E5%25B9%25B3%25E5%259D%2587%25E4%25BD%25BF%25E7%2594%25A8%25E7%258E%2587%25E5%258D%2595%25E4%25BD%258D.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        },
        {
            roleName: "CITY_MANAGER",
            unitSrc:
                "zzjgxxwh_sj%252F%25E7%25BB%2584%25E7%25BB%2587%25E6%259C%25BA%25E6%259E%2584%25E4%25BF%25A1%25E6%2581%25AF%25E7%25BB%25B4%25E6%258A%25A4%25E6%2595%25B0%25E6%258D%25AE%25E5%25B8%2582%25E7%25BA%25A7.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
            userSrc:
                "pjsjl_sj%252F%25E5%25B9%25B3%25E5%259D%2587%25E4%25BD%25BF%25E7%2594%25A8%25E7%258E%2587%25E5%25B8%2582%25E7%25BA%25A7.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        },
        {
            roleName: "PROVINCE_MANAGER",
            unitSrc:
                "zzjgxxwh_sj%252F%25E7%25BB%2584%25E7%25BB%2587%25E6%259C%25BA%25E6%259E%2584%25E4%25BF%25A1%25E6%2581%25AF%25E7%25BB%25B4%25E6%258A%25A4%25E6%2595%25B0%25E6%258D%25AE%25E7%259C%2581%25E7%25BA%25A7.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",

            userSrc:
                "pjsjl_sj%252F%25E5%25B9%25B3%25E5%259D%2587%25E4%25BD%25BF%25E7%2594%25A8%25E7%258E%2587%25E7%259C%2581%25E7%25BA%25A7.cpt&ref_t=design&op=write&ref_c=8b0e8398-30c4-457f-83de-19ff32bad3d7",
        },
    ],
};

// 系统日志
export const logSrc = {
    operationSrc:
        "system_log_statistics%252F%25E6%2593%258D%25E4%25BD%259C%25E6%2597%25A5%25E5%25BF%2597.cpt&ref_t=design&ref_c=ea3f9328-8e86-42eb-abb3-2d2eb114f89d",
    systemSrc:
        "system_log_statistics%252F%25E7%25B3%25BB%25E7%25BB%259F%25E6%2597%25A5%25E5%25BF%2597.cpt&ref_t=design&ref_c=ea3f9328-8e86-42eb-abb3-2d2eb114f89d",
};
