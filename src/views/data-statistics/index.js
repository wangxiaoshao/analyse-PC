// report 区域地址
const areaReportList = [
    {
        id: 1,
        systemName: "门户",
        areaUrl:
            "mh_statistics%252F%25E9%2597%25A8%25E6%2588%25B7%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        unitUrl:
            "tz_statistics%252F%25E5%258F%25B0%25E8%25B4%25A6%25E4%25BA%25BA%25E5%2591%2598%25E8%25AF%25A6%25E7%25BB%2586%25E6%2595%25B0%25E6%258D%25AE.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        personUrl: "",
    },
    {
        id: 2,
        systemName: "台账",
        areaUrl:
            "tz_statistics%252F%25E5%258F%25B0%25E8%25B4%25A6%25E4%25BA%25BA%25E5%2591%2598%25E8%25AF%25A6%25E7%25BB%2586%25E6%2595%25B0%25E6%258D%25AE.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        unitUrl:
            "tz_statistics%252F%25E5%258F%25B0%25E8%25B4%25A6%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        personUrl:
            "tz_statistics%252F%25E5%258F%25B0%25E8%25B4%25A6%25E4%25BA%25BA%25E5%2591%2598%25E8%25AF%25A6%25E7%25BB%2586%25E6%2595%25B0%25E6%258D%25AE.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
    },
    {
        id: 3,
        systemName: "通知公告",
        areaUrl:
            "tzgg_statistics%252F%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
        unitUrl:
            "tzgg_statistics%252F%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=e0a26a0d-938a-4067-96a6-49e7dcf5be36",
        personUrl:
            "tzgg_statistics%252F%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E4%25BA%25BA%25E5%2591%2598%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=e0a26a0d-938a-4067-96a6-49e7dcf5be36",
    },
    {
        id: 4,
        systemName: "快传",
        areaUrl:
            "kc_statistics%252F%25E5%25BF%25AB%25E4%25BC%25A0%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        unitUrl:
            "kc_statistics%252F%25E5%25BF%25AB%25E4%25BC%25A0%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        personUrl:
            "kc_statistics%252F%25E5%25BF%25AB%25E4%25BC%25A0%25E4%25BA%25BA%25E5%2591%2598%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=e0a26a0d-938a-4067-96a6-49e7dcf5be36",
    },
    {
        id: 5,
        systemName: "组织机构",
        areaUrl:
            "zcjj_statistics%252F%25E7%25BB%2584%25E7%25BB%2587%25E6%259C%25BA%25E6%259E%2584%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        unitUrl:
            "zcjj_statistics%252F%25E7%25BB%2584%25E7%25BB%2587%25E6%259C%25BA%25E6%259E%2584%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        personUrl: "",
    },
    {
        id: 6,
        systemName: "公文与事务办理",
        areaUrl: "",
        unitUrl: "",
        personUrl: "",
    },
    {
        id: 7,
        systemName: "单点登录",
        areaUrl:
            "cas_statistics%252F%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        unitUrl:
            "cas_statistics%252F%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E5%258D%2595%25E4%25BD%258D%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=6cc8d849-f936-44b1-93d8-eaac44ba0a1c",
        personUrl:
            "cas_statistics%252F%25E7%25BB%259F%25E4%25B8%2580%25E8%25AE%25A4%25E8%25AF%2581%25E4%25BA%25BA%25E5%2591%2598%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=e0a26a0d-938a-4067-96a6-49e7dcf5be36",
    },
];
export default areaReportList;
