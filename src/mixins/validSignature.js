import { api, urlNames } from "@src/api";
import ValidSignatureManage from "@src/components/ValidSignatureManage";
export default {
    components: { ValidSignatureManage },
    data() {
        return {
            validVisable: false,
            isValidSuccess: true,
        };
    },
    methods: {
        /* 
      签名验证接口
      type 1 验证人员  2.验证日志 checkId 人员id 或日志id ,actionTime 日志操作时间
       */
        validSignature(type, checkId, actionTime) {
            let data = {
                type,
                checkId,
                actionTime,
            };
            // 首页效验一次
            if (type === 1 && this.$cookie.get("valid-signature-type-home")) {
                return;
            }
            api[urlNames["validSignature"]](data).then((res) => {
                if (res) {
                    this.isValidSuccess = res.data.success === 1;
                    this.validVisable = true;
                    if (type === 1) {
                        this.$cookie.set("valid-signature-type-home", type);
                    }
                }
            });
        },
    },
};
