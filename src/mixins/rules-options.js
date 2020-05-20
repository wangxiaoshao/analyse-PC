import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            iptMsgInfoStr: "添加或修改该字段需要提交审核",
            rulesOption: {
                name: [
                    {
                        required: true,
                        message: "姓名不能为空",
                        trigger: "blur",
                    },
                    // { validator: validateName, trigger: 'blur' }
                ],
                mobile: [
                    {
                        required: true,
                        message: "手机号不能为空",
                        trigger: "blur",
                    },
                    // { validator: validateMobile, trigger: 'blur' }
                ],
                type: [
                    {
                        required: true,
                        message: "请选择身份类型",
                        trigger: "blur",
                    },
                ],
                // dutyName: [{ validator: validateProp, trigger: 'blur' }],
                // idcard: [{ validator: validateProp, trigger: 'blur' }],
                // orgName: [{ validator: validateProp, trigger: 'blur' }],
                // mobile2: [{ validator: validateProp, trigger: 'blur' }],
                // nation: [{ validator: validateProp, trigger: 'change' }],
                // politicalParty: [{ validator: validateProp, trigger: 'change' }],
                // userType: [{ validator: validateProp, trigger: 'change' }],
                // officePhone: [{ validator: validateProp, trigger: 'blur' }],
                // qualification: [{ validator: validateProp, trigger: 'change' }],
                // positionClass: [{ validator: validateProp, trigger: 'change' }],
                // userState: [{ validator: validateProp, trigger: 'change' }],
                // postName: [{ validator: validateProp, trigger: 'blur' }],
                // address: [{ validator: validateProp, trigger: 'blur' }],
                // instruction: [{ validator: validateProp, trigger: 'blur' }],
                // reason: [{ validator: validateProp, trigger: 'blur' }]
            },
        };
    },
    methods: {
        ...mapMutations(["SET_OPTION"]),
    },
    computed: {
        ...mapState(["app"]),
    },
};
