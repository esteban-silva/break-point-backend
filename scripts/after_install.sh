#!/bin/bash
echo 'run after_install.sh: ' >> /home/breakpoint/codedeploy-pipeline/deploy.log

echo 'sudo chmod -R 777 /home/ec2-user/express-app' >> /home/breakpoint/codedeploy-pipeline/deploy.log
sudo chmod -R 777 /home/breakpoint/breakpoint-backend >> /home/breakpoint/codedeploy-pipeline/deploy.log

echo 'npm run build' >> /home/breakpoint/codedeploy-pipeline/deploy.log
npm run build >> /home/breakpoint/codedeploy-pipeline/deploy.log

echo 'npm run start' >> /home/breakpoint/codedeploy-pipeline/deploy.log
npm run start >> /home/breakpoint/codedeploy-pipeline/deploy.log