/**
 * Created by luoxie on 2019-09-18.
 * Des: 左侧菜单配置
 */
export default {
  list: [
    {
      'menuId': '1',
      'name': '组织机构',
      'path': '',
      'type': 1,
      'icon': 'fa fa-sitemap',
      'list': [{
        'menuId': '11',
        'name': '组织机构管理',
        'path': '/organization',
        'type': 1
      }]
    },
    {
      'menuId': '2',
      'name': '申请审核',
      'path': '',
      'type': 1,
      'icon': 'fa fa-check-square-o',
      'list': [
        {
          "menuId": '21',
          "name": "待我审核",
          "path": "/waitApprovalList",
          "type": 1
        },
        {
          "menuId": '22',
          "name": "我已审核",
          "path": "/approved",
          "type": 1
        },
        {
          "menuId": '23',
          "name": "我的申请",
          "path": "/myApplication",
          "type": 1
        },
        {
          "menuId": '24',
          "name": "信息确认",
          "path": "/confirmInfo",
          "type": 1
        },
      ]
    },
    {
      'menuId': '3',
      'name': '共享管理',
      'path': '',
      'type': 1,
      'icon': 'fa fa-address-card-o',
      'list': [
        {
          'menuId': '31',
          'name': '视图管理',
          'path': '/viewmanagement',
          'type': 1
        },
        {
          'menuId': '32',
          'name': '分组管理',
          'path': '/groupmanagement',
          'type': 1
        },
        {
          'menuId': '33',
          'name': '标签管理',
          'path': '/log',
          'type': 1
        },
        {
          'menuId': '34',
          'name': '应用管理',
          'path': '/log',
          'type': 1
        }
      ]
    },
    {
      'menuId': '4',
      'name': '统计管理',
      'path': '',
      'type': 1,
      'icon': 'fa fa-bar-chart-o',
      'list': [
        {
          "menuId": '41',
          "name": "数据统计",
          "path": "/statistics",
          "type": 1
        },
        {
          "menuId": '42',
          "name": "数据查询",
          "path": "/statistics",
          "type": 1
        },
        {
          "menuId": '43',
          "name": "系统日志",
          "path": "/statistics",
          "type": 1
        }
      ]
    },
    {
      'menuId': '5',
      'name': '系统设置',
      'path': '',
      'type': 1,
      'icon': 'fa fa-cogs',
      'list': [
        {
          'menuId': '51',
          'name': '角色权限',
          'path': '/parameter',
          'type': 1
        },
        {
          'menuId': '52',
          'name': '字典管理',
          'path': '/parameter',
          'type': 1
        },
        {
          'menuId': '53',
          'name': '修改密码',
          'path': '/parameter',
          'type': 1
        },
        {
          'menuId': '54',
          'name': '系统设置',
          'path': '/parameter',
          'type': 1
        }
      ]
    }
  ]
}


