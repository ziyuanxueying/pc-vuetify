# 前端规范

## 版本号管理

1. vX.X.X（产品版本.计划版本.bug 修正 or 细节迭代）
2. 小版本 bug 修正 统统 末尾追加
3. git 上各自在自己的（dev\_姓名简写）分支上完成相关代码编写，需发版时，到 github 中进行 `Pull requests` 请求给管理员进行审批后，自动合并到 dev 分支
4. 提交 github 规则(v 当前版本号 '换行 ' 提交分支 修改内容备注)，示例如下

```bash
  v1.0.0
  dev 修改内容备注
```

`注意: 当前版本 v1.0.0`

## vue 约定

1. vue 方法放置顺序

   1 components  
   2 model
   3 props  
   4 beforeCreate # function
   5 data # function
   6 computed # 计算属性 object
   7 created # 实例创建完成后执行的钩子 object  
   8 mounted # 编译好的 html 挂载到页面完成后执行的事件钩子，一般执行 ajax 请求获取数据进行数据初始化（整个实例中只执行一次）function  
   9 activited  
   10 update # 更新之后的钩子  
   11 beforeRouteUpdate  
   12 methods # 执行方法 object
   13 filter  
   15 watch # 监听 object

2. props 必须声明验证，指定验证格式，适当情况指定默认值  
   prop 为单向数据流禁止子组件更新数据

正例：

    props: {
      miniVariant: {
        type: Boolean,
        required: true
      },
      clipped: {
        type: Boolean,
        required: true
      },
      drawer: {
        type: Boolean,
        required: true
      },
      st: {
        type: String,
        required: true
      }
    }

反例：
props: ['miniVariant', 'clipped', 'drawer']

3. 凡新建`前端页面存在按钮`的地方都需要维护

```bash
domType.productImport 等同于 domType.[按钮唯一标识]

<v-btn
    class="ma-2"
    text
    color="indigo"
    :to="`/product/save`"
    v-show="domType.edit"
    :disabled="domType._save"
    data-cy="save"
>
```

**注意：** `新增按钮及页面需要配置到权限中`

**`路径`：PC/菜单管理/新增**

## vuetify 约定

1. v-flex 使用 xs12 sm6 lg4 xl3
2. 表单校验采用 Vuelidate（<https://monterail.github.io/vuelidate/#getting-started>）
3. 合同选择，name 统一 ctName
4. from、to 后缀代表区间
5. 根据 required、counter 自动生成 rules 校验
6. 布局约定 container->form\data table\card->subheader\layout->flex
7. 不允许根据长度进行初始化判断，必须为 undefined
8. iframe 可支持，<iframe src="http://baidu.com" width="1200" height="300" frameborder="0" scrolling="auto"></iframe>

### e2e 约定

1. id=data-cy
