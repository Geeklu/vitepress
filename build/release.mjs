// 该脚本来自开源项目vitepress,不过也没有尝试过,暂时可以先直接用 

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import c from 'picocolors'
import prompts from 'prompts'
import { execa } from 'execa'
import semver from 'semver'

const { version: currentVersion } = createRequire(import.meta.url)(
  '../package.json'
)
const { inc: _inc, valid } = semver

const versionIncrements = ['patch', 'minor', 'major']

const tags = ['latest', 'next']

const dir = fileURLToPath(new URL('.', import.meta.url))
const inc = (i) => _inc(currentVersion, i)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const step = (msg) => console.log(c.cyan(msg))

async function main() {
  let targetVersion

  const versions = versionIncrements
    .map((i) => `${i} (${inc(i)})`)
    .concat(['custom'])

  const { release } = await prompts({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versions
  })

  if (release === 3) {
    targetVersion = (
      await prompts({
        type: 'text',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion
      })
    ).version
  } else {
    targetVersion = versions[release].match(/\((.*)\)/)[1]
  }

  if (!valid(targetVersion)) {
    throw new Error(`Invalid target version: ${targetVersion}`)
  }

  const { tag } = await prompts({
    type: 'select',
    name: 'tag',
    message: 'Select tag type',
    choices: tags
  })

  const { yes: tagOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion} on ${tags[tag]}. Confirm?`
  })

  if (!tagOk) {
    return
  }

  // Update the package version.
  step('\n正在更新包版本...')
  updatePackage(targetVersion)

  // Build the package.
  // step('\nBuilding the package...')
  // await run('pnpm', ['build'])

  // Generate the changelog.
  step('\n生成变更日志...')
  await run('npm', ['changelog'])

  //美化变更日志

  // await run('pnpm', ['prettier', '--write', 'CHANGELOG.md'])

  const { yes: changelogOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `已生成变更日志。它看起来好看吗?`
  })

  if (!changelogOk) {
    return
  }

  // Commit changes to the Git and create a tag.
  step('\n提交更改...')

  await run('git', ['add', 'CHANGELOG.md', 'package.json'])
  await run('git', ['commit', '-m', `release: v${targetVersion}`])
  await run('git', ['tag', `v${targetVersion}`])

  // 发布包到npm
  // step('\n正在发布包...')
  // await run('pnpm', [
  //   'publish',
  //   '--tag',
  //   tags[tag],
  //   '--ignore-scripts',
  //   '--no-git-checks'
  // ])

  // Push to GitHub.
  step('\n推送至GitHub...')
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await run('git', ['push'])
}

function updatePackage(version) {
  const pkgPath = resolve(resolve(dir, '..'), 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

  pkg.version = version

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

main().catch((err) => console.error(err))
