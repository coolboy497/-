// 富文本编辑器
// 创建编辑器函数，创建工具栏函数

// 富文本：带样式，多格式的文本，在前端一般使用标签配合内联样式实现

// 目标：发布文章页，富文本编辑器的集成
// 使用：wangEditor插件
// 步骤：参考文档
// 1.引入css定义样式
// 2.定义html结构
// 3.引入JS创建编辑器
// 4.监听内容改变,保存在隐藏文本域(便于后期收集

// 创建编辑器函数，创建工具栏函数
const { createEditor, createToolbar } = window.wangEditor

// 编辑器配置对象
const editorConfig = {
    placeholder: '发布文章内容...',
    // 编辑器变化时的回调函数
    onChange(editor) {
      // 获取富文本内容
      const html = editor.getHtml()
      console.log('editor content', html)
      // 也可以同步到 <textarea>
      // 为了后续快速收集整个表单内容做铺垫
      document.querySelector('.publish-content').value = html
    }
}
const editor = createEditor({
    // 创建位置
    selector: '#editor-container',
    //默认内容
    html: '<p><br></p>',
    //配置对象
    config: editorConfig,
    //配置集成模式，全部功能/简洁功能
    mode: 'default', // or 'simple'
})

// 工具栏配置对象
const toolbarConfig = {}

const toolbar = createToolbar({
    //为指定编辑器创建工具栏
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})