<template>
    <div class="select-area">
        <el-dialog
            custom-class="select-member-dialog"
            :title="selectTreeDailog.title"
            :visible.sync="selectTreeDailog.openSelectTreeVisiable"
            center
            :before-close="handleClose"
        >
            <div
                class="search"
                v-if="
                    selectTreeDailog.isSelectType === 2 ||
                    selectTreeDailog.isSelectType === 3
                "
            >
                <el-input
                    placeholder="请输入内容"
                    v-model="searchKeyWord"
                    @keyup.enter.native="getResult"
                    class="input-with-select"
                >
                    <el-button
                        slot="append"
                        @click="getResult"
                        icon="el-icon-search"
                    ></el-button>
                </el-input>
            </div>
            <div class="select-panel" style="display: flex;">
                <div class="tree">
                    <el-tree
                        :data="treeData"
                        lazy
                        :load="loadArea"
                        :props="defaultProps"
                        @node-click="handleAreaClick"
                    >
                        <span class="svg-container" slot-scope="{ node }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
                <div class="wait-select">
                    <div v-if="!selectTreeDailog.isSingSelect">
                        <el-checkbox
                            v-show="optionalList.length > 0"
                            :indeterminate="isIndeterminate"
                            v-model="isCheckOptionalAll"
                            class="member-item"
                            @change="toggleOptionalAll"
                            >全选</el-checkbox
                        >
                        <el-checkbox-group
                            v-model="selectingList"
                            @change="selectOptionalChange"
                        >
                            <el-checkbox
                                style="display: block;"
                                class="member-item"
                                v-for="(item, index) in optionalList"
                                :disabled="
                                    item.treeType === 5 &&
                                    !item.canSelected &&
                                    item.canSelected !== null
                                "
                                :key="index"
                                :label="JSON.stringify(item)"
                            >
                                {{
                                    item.treeType === 5 &&
                                    !item.canSelected &&
                                    item.canSelected !== null
                                        ? item.treeName +
                                          "(已绑定其他角色不可选)" +
                                          (item.orgName
                                              ? "--" + item.orgName
                                              : "")
                                        : item.treeName +
                                          (item.orgName
                                              ? "--" + item.orgName
                                              : "")
                                }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div v-else>
                        <el-radio-group
                            v-model="selectingSingle"
                            @change="singleSelectingChange"
                        >
                            <el-radio
                                v-for="(item, index) in optionalList"
                                :key="index"
                                :disabled="
                                    item.treeType === 5 &&
                                    !item.canSelected &&
                                    item.canSelected !== null &&
                                    singleSelectingChange.isDisabled
                                "
                                style="display: block;"
                                :label="JSON.stringify(item)"
                            >
                                {{
                                    item.treeType === 5 &&
                                    !item.canSelected &&
                                    item.canSelected !== null &&
                                    singleSelectingChange.isDisabled
                                        ? item.treeName +
                                          "(已绑定其他角色不可选)" +
                                          (item.orgName
                                              ? "--" + item.orgName
                                              : "")
                                        : item.treeName +
                                          (item.orgName
                                              ? "--" + item.orgName
                                              : "")
                                }}</el-radio
                            >
                        </el-radio-group>
                    </div>
                </div>
                <div class="container">
                    <div>
                        <el-button
                            size="small"
                            type="text"
                            v-show="selectCheckList.length > 0"
                            @click="removeSelectingAll"
                            >取消全部
                        </el-button>
                        <el-checkbox-group
                            v-model="selectedList"
                            @change="selectedChange"
                        >
                            <el-checkbox
                                style="display: block;"
                                class="member-item"
                                v-for="(item, index) in selectCheckList"
                                :key="index"
                                :label="JSON.stringify(item)"
                            >
                                {{ item.treeName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="submit">
                <el-button
                    type="primary"
                    @click="next"
                    :disabled="selectCheckList.length === 0"
                    v-if="
                        selectTreeDailog.isNext && roleId !== 1 && roleId !== 2
                    "
                    >下一步</el-button
                >
                <el-button
                    v-if="selectTreeDailog.isLast"
                    type="primary"
                    @click="last"
                    >上一步</el-button
                >
                <el-button
                    v-if="
                        !selectTreeDailog.isNext || roleId === 1 || roleId === 2
                    "
                    type="primary"
                    @click="submitSelectedData"
                    :disabled="selectCheckList.length === 0"
                    >确定</el-button
                >

                <el-button @click="handleClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 单位 人员  区县 组件
//  selectTreeDailog: {
//     title: "选择授权区县",//标题 必传
//     openSelectTreeVisiable: false,
//     isSelectType: 2, // 1 区县  2  单位  3 人员 4 市州 必传
//     isSingSelect: true, // 是否单选,true 单选，false:多选  必传
// },
import { api, urlNames } from '@src/api'
import { mapState } from 'vuex'
export default {
  name: 'SelectTree',
  props: ['selectTreeDailog'],
  data () {
    return {
      roleId: parseInt(this.$route.params.roleId),
      searchKeyWord: '',
      optionalList: [], // 可选列表
      treeData: [],
      selectingList: [], // 候选列表, 多选
      selectedList: [], // 已选列表  多选
      isIndeterminate: true,
      isCheckOptionalAll: false, // 可选是否全选
      selectingSingle: '', // 候选 单选
      defaultProps: {
        children: 'hasChild',
        label: 'treeName',
        id: '',
        isLeaf: 'leaf'
      },
      lastData: [],
      nextData: [],
      selectCheckList: [],
      listData: []
    }
  },
  created () {
    console.log(this.app.rolesInfo)
    this.findAreaTree()
  },
  methods: {
    // 初始化树
    findAreaTree () {
      // 通知提醒加载树
      if (this.selectTreeDailog.orgId) {
        // this.
        const data = {
          treeId: this.selectTreeDailog.orgId,
          treeType: 3,
          treeName: this.$route.query.treeName
        }
        this.treeData[0] = data
        // api[urlNames["getTreeList"]](data).then((res) => {
        //     this.treeData = res.data;
        // });
        return
      }
      // 授权范围--区域管理员  市州管理员加载树
      if (
        this.app.rolesInfo.roleName === 'CITY_MANAGER' ||
                this.app.rolesInfo.roleName === 'COUNTY_MANAGER'
      ) {
        const data = {
          codeList: this.app.rolesInfo.authorizedOid,
          authorizedType: this.app.rolesInfo.authorizedType
        }
        api[urlNames.getAreaList](data).then((res) => {
          if (res.data) {
            // 授权区县的时候处理贵安新区和省直单位
            if (this.selectTreeDailog.isSelectType === 1) {
              res.data.forEach((item, index) => {
                if (
                  item.areaCode === '522800' ||
                                    item.areaCode === '520000'
                ) {
                  res.data.splice(index, 1)
                }
              })
              const list = res.data
              const aryList = []
              list.forEach((item, index) => {
                if (item.treeType === 2) {
                  item.leaf = true
                }
                const obj = {
                  treeId: item.areaCode,
                  treeName: item.areaName,
                  // treeType: this.app.rolesInfo.authorizedType,
                  treeType: item.areaType
                }
                aryList.push(obj)
              })
              this.treeData = aryList
            } else {
              const aryList = []
              res.data.forEach((item) => {
                const obj = {
                  treeId: item.areaCode,
                  treeName: item.areaName,
                  // treeType: this.app.rolesInfo.authorizedType,
                  treeType: item.areaType
                }
                aryList.push(obj)
              })
              this.treeData = aryList
            }
          }
        })
      } else {
        // 其他管理员加载树
        api[urlNames.getTreeList]().then((res) => {
          this.treeData = res.data
        })
      }
    },
    // 加载下一级
    loadArea (node, resolve) {
      // console.log(node, "hhhhhhh");
      // this.listData = [];
      if (node.level === 0) {
        return resolve(this.treeData)
      }
      api[urlNames.getTreeList]({
        treeId: node.data.treeId,
        treeType: node.data.treeType
      }).then((res) => {
        if (res.status === 0) {
          let treeData = []
          // 1. 选择区县
          // 处理省直单位和贵安新区（无区域）
          if (this.selectTreeDailog.isSelectType === 1) {
            res.data.forEach((item, index) => {
              if (
                item.treeId === '522800' ||
                                item.treeId === '520000'
              ) {
                res.data.splice(index, 1)
              }
            })
            const list = res.data
            list.forEach((item, index) => {
              if (item.treeType === 2) {
                item.leaf = true
              }
            })
            treeData = list
            // 2. 选择单位 3.选择人员
          } else if (
            this.selectTreeDailog.isSelectType === 2 ||
                        this.selectTreeDailog.isSelectType === 3
          ) {
            const list = res.data || []
            list.forEach((item, index) => {
              if (item.hasChild === 0 || !item.hasChild) {
                item.leaf = true
              }
              if (this.selectTreeDailog.isSelectType === 2) {
                if (
                  item.treeType !== 5 &&
                                    item.treeType !== 4
                ) {
                  treeData.push(item)
                }
              } else {
                /* 排除单位下面有人员的情况 ：只显示部门和单位 */
                if (item.treeType !== 5) {
                  treeData.push(item)
                }
              }
            })
            this.listData = treeData
          } else if (this.selectTreeDailog.isSelectType === 4) {
            const list = res.data || []
            list.forEach((item) => {
              item.leaf = true
            })
            treeData = list
          }
          // this.listData = treeData;
          resolve(treeData)
        }
      })
    },
    handleAreaClick (data) {
      if (data.hasChild) {
        this.optionalList = []
      }
      // 1. 区县
      if (this.selectTreeDailog.isSelectType === 1) {
        // 候选框只加载到区县
        if (data.treeType === 1) {
          api[urlNames.getTreeList]({
            treeId: data.treeId,
            treeType: data.treeType
          }).then((res) => {
            res.data.forEach((item) => {
              this.optionalList.push(item)
            })
          })
        } else {
          this.optionalList = []
        }
        // 2.单位  treeType=2 treeId = "520000"，单独处理省直单位
        // 3.人员  treeType=3
      } else if (
        this.selectTreeDailog.isSelectType === 2 ||
                this.selectTreeDailog.isSelectType === 3
      ) {
        if (
          (data.treeType !== 1 && data.treeType) ||
                    (data.treeId === '520000' && data.treeType)
        ) {
          api[urlNames.getTreeList]({
            treeId: data.treeId,
            treeType: data.treeType
          }).then((res) => {
            if (this.selectTreeDailog.isSelectType === 2) {
              res.data.forEach((item) => {
                /* 排除单位下面有人员部门的情况 ：只显示单位 */
                if (item.treeType === 3) {
                  this.optionalList.push(item)
                }
              })
            } else if (this.selectTreeDailog.isSelectType === 3) {
              res.data.forEach((item) => {
                /* 排除单位下面有单位部门的情况 ：只显示人员 */
                if (item.treeType === 5) {
                  this.optionalList.push(item)
                }
              })
            }
          })
        }
        // 4 选择市州
      } else if (
        this.selectTreeDailog.isSelectType === 4 &&
                data.treeType === 0
      ) {
        api[urlNames.getTreeList]({
          treeId: data.treeId,
          treeType: data.treeType
        }).then((res) => {
          res.data.forEach((item) => {
            this.optionalList.push(item)
          })
        })
      } else {
        this.optionalList = []
      }
    },
    handleAreaClick1 (data) {
      console.log(888888, this.listData)
      if (data.hasChild) {
        this.optionalList = []
      }
      // 1. 区县
      if (this.selectTreeDailog.isSelectType === 1) {
        // 候选框只加载到区县
        if (data.treeType === 1) {
          this.listData.forEach((item) => {
            this.optionalList.push(item)
          })
        } else {
          this.optionalList = []
        }
        // 2.单位  treeType=2 treeId = "520000"，单独处理省直单位
        // 3.人员  treeType=3
      } else if (
        this.selectTreeDailog.isSelectType === 2 ||
                this.selectTreeDailog.isSelectType === 3
      ) {
        if (
          (data.treeType !== 1 && data.treeType) ||
                    (data.treeId === '520000' && data.treeType)
        ) {
          if (this.selectTreeDailog.isSelectType === 2) {
            this.listData.forEach((item) => {
              /* 排除单位下面有人员部门的情况 ：只显示单位 */
              if (item.treeType === 3) {
                this.optionalList.push(item)
              }
            })
          } else if (this.selectTreeDailog.isSelectType === 3) {
            this.listData.forEach((item) => {
              /* 排除单位下面有单位部门的情况 ：只显示人员 */
              if (item.treeType === 5) {
                this.optionalList.push(item)
              }
            })
          }
        }
        // 4 选择市州
      } else if (
        this.selectTreeDailog.isSelectType === 4 &&
                data.treeType === 0
      ) {
        this.listData.forEach((item) => {
          this.optionalList.push(item)
        })
      } else {
        this.optionalList = []
      }
    },
    // 全选可选区域
    toggleOptionalAll (selected) {
      this.isIndeterminate = false
      const that = this
      if (selected) {
        that.optionalList.forEach((item) => {
          const label = JSON.stringify(item)
          if (item.canSelected === 1) {
            that.addToSelected(label)
            that.addSelecting(item)
            if (!that.selectingList.includes(label)) {
              that.selectingList.push(label)
            }
          }
        })
      } else {
        that.optionalList.forEach((item) => {
          const label = JSON.stringify(item)
          that.removeSelecting(label)
          that.removeSelected(item)
          const indexOf = that.selectingList.indexOf(label)
          if (indexOf !== -1) {
            that.selectingList.splice(indexOf, 1)
          }
        })
      }
    },
    // 取消全选候选区域
    removeSelectingAll () {
      this.isCheckOptionalAll = false
      this.selectedList = []
      this.selectingList = []
      this.selectCheckList = []
    },
    selectOptionalChange (val) {
      const checkedCount = val.length
      this.isCheckOptionalAll = checkedCount === this.optionalList.length
      this.isIndeterminate =
                val.length > 0 && val.length < this.optionalList.length
      this.selectCheckList = val.map((item) => {
        const label = JSON.parse(item)
        this.addToSelected(item)
        return label
      })
    },
    selectedChange (val) {
      this.selectingList.forEach((item) => {
        if (!val.includes(item)) {
          this.removeSelecting(item)
          this.removeSelected(JSON.parse(item))
        }
      })
    },
    addToSelected (label) {
      if (!this.selectedList.includes(label)) {
        this.selectedList.push(label)
      }
    },
    addSelecting (label) {
      let i = this.selectCheckList.length - 1
      while (i >= 0) {
        const current = this.selectCheckList[i]
        if (current.treeId === label.treeId) {
          return
        }

        i -= 1
      }
      this.selectCheckList.push(label)
    },
    removeSelected (label) {
      let i = this.selectCheckList.length - 1
      while (i >= 0) {
        const current = this.selectCheckList[i]
        if (current.treeId === label.treeId) {
          this.selectCheckList.splice(i, 1)
          return
        }

        i -= 1
      }
    },
    removeSelecting (label) {
      const index = this.selectingList.indexOf(label)
      if (index !== -1) {
        this.selectingList.splice(index, 1)
      }
    },

    // 单选方法
    singleSelectingChange (val) {
      this.selectedList = []
      this.selectCheckList[0] = JSON.parse(this.selectingSingle)
      this.selectedList[0] = val
    },

    // 返回数据
    submitSelectedData () {
      this.$emit('dialogReturnData', this.selectCheckList, this.lastData)
      if (this.selectTreeDailog.isClearSelected) {
        this.$emit('closeSelectDailog')
      } else {
        this.handleClose()
      }
    },

    // 关闭授权区域弹窗组件
    handleClose () {
      this.selectingList = []
      this.selectedList = []
      this.selectCheckList = []
      this.$emit('closeSelectDailog')
    },

    // 处理授权范围数据
    next () {
      this.lastData = [...this.selectCheckList]
      this.$emit('next')
    },
    last () {
      this.nextData = [...this.selectCheckList]
      this.$emit('last')
    },
    getResult () {
      // 搜索人
      if (this.selectTreeDailog.isSelectType === 3) {
        // 通知提醒的搜索人
        if (this.selectTreeDailog.orgId) {
          const data = {
            orgId: this.selectTreeDailog.orgId,
            keyword: this.searchKeyWord
          }
          api[urlNames.searchOrgUser](data).then((res) => {
            const userList = []
            res.data.forEach((item) => {
              const obj = {
                treeId: item.userId,
                treeType: 5,
                treeName: item.userName,
                orgName: item.orgName,
                canSelected: item.canSelected
              }
              userList.push(obj)
            })
            this.optionalList = userList
          })
          return
        }
        // 其他管理员搜索人
        const data = {
          keyword: this.searchKeyWord
        }
        // 区县管理员 区域管理员搜索人
        if (
          this.app.rolesInfo.roleName === 'CITY_MANAGER' ||
                    this.app.rolesInfo.roleName === 'COUNTY_MANAGER'
        ) {
          data.codeList = this.app.rolesInfo.authorizedOid
          data.authorizedType = this.app.rolesInfo.authorizedType
        }
        api[urlNames.searchAreaUsers](data).then((res) => {
          const userList = []
          res.data.forEach((item) => {
            const obj = {
              treeId: item.userId,
              treeType: 5,
              treeName: item.userName,
              orgName: item.orgName,
              canSelected: item.canSelected
            }
            userList.push(obj)
          })
          this.optionalList = userList
        })
      } else if (this.selectTreeDailog.isSelectType === 2) {
        // 其他管理员搜索单位
        const data = {
          keyword: this.searchKeyWord
        }
        // 区县管理员 区域管理员搜索单位
        if (
          this.app.rolesInfo.roleName === 'CITY_MANAGER' ||
                    this.app.rolesInfo.roleName === 'COUNTY_MANAGER'
        ) {
          data.codeList = this.app.rolesInfo.authorizedOid
          data.authorizedType = this.app.rolesInfo.authorizedType
        }
        api[urlNames.searchAreaOrgs](data).then((res) => {
          const userList = []
          res.data.forEach((item) => {
            const obj = {
              treeId: item.orgId,
              treeName: item.orgName
            }
            userList.push(obj)
          })
          this.optionalList = userList
        })
      }
    }
  },
  computed: {
    ...mapState(['app']),
    type () {
      return this.selectTreeDailog.isSelectType
    },
    noticeUser () {
      if (this.selectTreeDailog.noticeUser) {
        return this.selectTreeDailog.noticeUser
      } else {
        return []
      }
    }
  },
  watch: {
    type (val1, val2) {
      this.searchKeyWord = ''
      this.optionalList = []
      this.selectedList = []
      this.selectingList = []
      this.selectCheckList = []
      if (!this.selectTreeDailog.isLast) {
        this.selectCheckList = this.lastData.map((item) => {
          const label = item
          this.addToSelected(JSON.stringify(item))
          return label
        })
      } else if (!this.selectTreeDailog.isNext) {
        this.selectCheckList = this.nextData.map((item) => {
          const label = item
          this.addToSelected(JSON.stringify(item))
          return label
        })
      } else {
        this.selectedList = []
        this.selectCheckList = []
        this.selectedList = []
      }
      this.findAreaTree()
    },
    noticeUser () {
      console.log(this.selectTreeDailog.noticeUser, 'uuuuu')
      this.selectCheckList = this.selectTreeDailog.noticeUser.map(
        (item) => {
          const label1 = item
          const label = JSON.stringify(item)
          if (!this.selectingList.includes(label)) {
            this.selectingList.push(label)
          }
          this.addToSelected(JSON.stringify(item))
          return label1
        }
      )
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
