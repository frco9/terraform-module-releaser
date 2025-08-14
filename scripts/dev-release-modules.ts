/**
 * Development script to test the parseTerraformModules function locally
 */

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getConfig } from '@/config';
import { getContext } from '@/context';
import { findModuleNestedModules } from '@/utils/file';

async function main() {
  console.log('🔍 Development: Testing parseTerraformModules function');
  //console.log('Workspace directory:', context.workspaceDir);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  process.env.GITHUB_SERVER_URL = 'https://github.com';
  process.env.GITHUB_API_URL = 'https://api.github.com';
  process.env.GITHUB_EVENT_NAME = 'pull_request';
  process.env.GITHUB_EVENT_PATH = resolve(__dirname, 'event.pull-request.json'); // Path to a test event file
  process.env.GITHUB_WORKSPACE = resolve(__dirname, 'modules');
  process.env.GITHUB_REPOSITORY = 'techpivot/terraform-module-releaser';

  process.env['INPUT_MAJOR-KEYWORDS'] = 'major change,breaking change';
  process.env['INPUT_MINOR-KEYWORDS'] = 'feat,feature';
  process.env['INPUT_PATCH-KEYWORDS'] = 'fix,chore,docs';
  process.env['INPUT_DEFAULT-FIRST-TAG'] = 'v1.0.0';
  process.env['INPUT_TERRAFORM-DOCS-VERSION'] = 'v0.20.0';
  process.env['INPUT_DELETE-LEGACY-TAGS'] = 'false';
  process.env['INPUT_DISABLE-WIKI'] = 'true';
  process.env['INPUT_WIKI-SIDEBAR-CHANGELOG-MAX'] = '5';
  process.env['INPUT_DISABLE-BRANDING'] = 'false';
  process.env.INPUT_GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  process.env['INPUT_USE-SSH-SOURCE-FORMAT'] = 'true';
  process.env['INPUT_MODULE-PATH-IGNORE'] = '**/examples/**';
  process.env['INPUT_MODULE-CHANGE-EXCLUDE-PATTERNS'] = '.gitignore,*.md';

  // Initialize
  const config = getConfig();
  const context = getContext();

  // Test with empty tags and releases for now
  const module = findModuleNestedModules(context.workingDir, 'module-a');
  console.log('Output ', module);
}

main();
