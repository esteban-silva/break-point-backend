#!/bin/bash
echo 'run after_install.sh: ' >> /home/breakpoint/codedeploy-pipeline/deploy.log

echo 'cd /home/breakpoint/break-point-backend' >> /home/breakpoint/codedeploy-pipeline/deploy.log
cd /home/breakpoint/break-point-backend >> /home/breakpoint/codedeploy-pipeline/deploy.log


echo 'git pull' >> /home/breakpoint/codedeploy-pipeline/deploy.log
git pull >> /home/breakpoint/codedeploy-pipeline/deploy.log

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

echo 'npm install' >> /home/breakpoint/codedeploy-pipeline/deploy.log
npm install >> /home/breakpoint/codedeploy-pipeline/deploy.log