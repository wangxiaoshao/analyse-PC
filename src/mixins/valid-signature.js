/**
 * 用于国密验签
 * 传入验签类型和id（或id列表），自动组织验签
 */
import ValidSignature from "@src/components/ValidSignature";

export default {
    components: { ValidSignature },
    data() {
        return {
            // 验签参数列表
            validParams: [],
            // 开始验签的开关（验签结束会自动重置为false）
            startValid: false,
        };
    },
    methods: {
        validSignature(type, idList) {
            let params = [];

            if (Array.isArray(idList)) {
                idList.forEach((id) => {
                    params.push({
                        type: type,
                        id: id,
                    });
                });
            } else {
                params = [
                    {
                        type: type,
                        id: idList,
                    },
                ];
            }

            this.validParams = params;
            this.startValid = true;
        },
    },
};
