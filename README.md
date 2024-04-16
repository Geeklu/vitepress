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





# commit-and-tag-version的一些简单教程


## 第一次用

```
# npm run script
npm run release -- --first-release
# global bin
commit-and-tag-version --first-release
# npx
npx commit-and-tag-version --first-release
```

## 作为预发布版本发布
npm run release -- --prerelease

这会将您的版本标记为：1.0.1-0

包含前缀

npm run release -- --prerelease alpha

这会将版本标记为：1.0.1-alpha.0

## 强制指定不适用语义版本

--release-as参数major,minor或patch

```
# npm run script
npm run release -- --release-as minor
# Or
npm run release -- --release-as 1.1.0
```


tips：您可以组合--release-as和--prerelease来生成版本。这在发布实验性功能时非常有用。


## 防止Git Hook

```
# npm run script
npm run release -- --no-verify
# or global bin
commit-and-tag-version --no-verify
```

## 包含"Signed-off-by"

如果您设置了 GPG 密钥，请将--sign或-s标志添加到您的commit-and-tag-version命令中。


要将“Signed-off-by”预告片添加到提交消息中，请将该--signoff标志添加到您的commit-and-tag-version命令中。




