# 持续集成demo

自动发布到npm+自动release+自动部署文档


- npm version patch
- npm version minor 
- npm version major




# 3种生成changelog的方式

## 方式1：手动生成

```
"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
```

## 方式2：使用commit-and-tag-version

推荐

## 方式3：自己编写脚本来生成

build/release.mjs

## 总结

暂时推荐方式2，最简单
