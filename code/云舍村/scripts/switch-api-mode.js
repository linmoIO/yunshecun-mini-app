'use strict';

const fs = require('fs');
const path = require('path');

const mode = process.argv[2];
if (!['local', 'remote'].includes(mode)) {
  console.error('用法: node scripts/switch-api-mode.js <local|remote>');
  process.exit(1);
}

const configPath = path.join(__dirname, '..', 'utils', 'config.js');
const source = fs.readFileSync(configPath, 'utf8');
const pattern = /const API_MODE = "(?:local|remote)";/;
if (!pattern.test(source)) {
  console.error('未找到 API_MODE 配置');
  process.exit(1);
}

fs.writeFileSync(configPath, source.replace(pattern, `const API_MODE = "${mode}";`));
console.log(`小程序接口已切换为${mode === 'local' ? '本地' : '远程'}模式`);
