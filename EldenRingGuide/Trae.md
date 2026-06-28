# Trae Website Task

日期：2026-06-16

## 给 Trae 的执行任务

今天做轻量网站推进，不做大改版。目标是把 Reddit/Discord 里反复出现的“新手不知道怎么变强、路线推进、打不过 Boss”问题，继续沉淀成网站可承接内容。

### 任务目标

检查并补强 `Underleveled Guide / Too Weak Helper` 和 `Limgrave Boss Checklist` 的承接关系，让用户从“我太弱 / 不知道去哪 / 打不过 Boss”能快速找到下一步。

### 必做项

1. 检查 `Underleveled Guide / Too Weak Helper` 页面：
   - 是否首屏直接回答 “why am I weak / how do I improve”
   - 是否清楚解释 weapon upgrade、vigor、medium load、side areas 的优先级
   - 是否有明显入口指向 `Limgrave Boss Checklist`

2. 检查 `Limgrave Boss Checklist` 页面：
   - 是否适合新手快速判断下一个能打的 Boss
   - 是否有返回 `Underleveled Guide / Too Weak Helper` 的入口
   - checklist 状态、按钮、保存逻辑是否正常

3. 补一个短 FAQ 或段落，围绕这个问题：

```text
What should I do when I feel too weak in Elden Ring?
```

4. 做一次轻量验证：
   - 桌面端页面不乱
   - 移动端表单和按钮不拥挤
   - FAQ 可读
   - 两个页面之间内链可点击

### 不要做

- 不要新增大型功能。
- 不要加登录、数据库、复杂后端。
- 不要重构全站样式。
- 不要加网站推广话术。
- 不要加 Reddit / Discord 引流诱导。

## Trae 完成后请回填

请按这个格式返回：

```text
今天完成：

改动文件：

页面路径/本地预览：

验证结果：
- 桌面端：
- 移动端：
- 交互：
- 链接：

遗留问题：

建议下一步：
```

## Codex 这边需要记录的内容

Trae 完成后，Codex 需要更新：

- `GamePanduan_每日执行记录_2026-06-11.md`：记录今天网站任务完成情况。
- `TASKS.md`：更新已完成和下一步。
- `CHANGELOG.md`：记录实际改动、涉及文件、验证结果、遗留问题。
- 如果 Trae 产生长期页面模板、SEO 策略或技术边界决策，再更新 `DECISIONS.md`。
