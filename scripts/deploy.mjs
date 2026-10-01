// Сайти тайёрро (dist/) ба шохаи gh-pages мефиристад — GitHub Pages аз ҳамин шоха кор мекунад.
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' });
const read = (cmd) => execSync(cmd).toString().trim();

const remote = read('git remote get-url origin');
const name = read('git config user.name');
const email = read('git config user.email');

run('npm run build');
writeFileSync('dist/.nojekyll', '');

run('git init -q -b gh-pages', 'dist');
run('git add -A', 'dist');
run(`git -c user.name="${name}" -c user.email="${email}" commit -q -m "Deploy ${new Date().toISOString()}"`, 'dist');
run(`git push -f "${remote}" gh-pages`, 'dist');

const [, owner, repo] = remote.match(/github\.com[/:]([^/]+)\/([^/.]+)/) ?? [];
if (owner) console.log(`\nТайёр: https://${owner}.github.io/${repo}/`);
