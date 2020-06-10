/**
 * 用于国密验签，仅提供验签流程接口，不提供视图界面
 * 传入验签类型和id（或id列表），自动组织验签
 */
import { api, urlNames, apiAll } from "@src/api";

export default {
    data() {
        return {};
    },
    methods: {
        validSignature(
            loadingMsg,
            validInfoList,
            successCallback,
            errorCallback
        ) {
            let loader = this.$loading({
                fullscreen: true,
                text: loadingMsg,
            });

            let requests = [];
            validInfoList.forEach((item) => {
                requests.push(
                    api[urlNames["validSignature"]]({
                        entityId: item.id,
                        entityType: item.type,
                        date: item.date || "",
                    })
                );
            });

            apiAll(requests)
                .then((responses) => {
                    responses.forEach((res) => {
                        if (res.message !== "success" || res.data === 0) {
                            throw new Error("验证签名不通过");
                        }
                    });

                    loader.close();
                    this.$message({
                        message: "签名验证通过",
                        type: "success",
                    });
                    successCallback();
                })
                .catch(() => {
                    loader.close();
                    errorCallback();
                });
        },
    },
};
