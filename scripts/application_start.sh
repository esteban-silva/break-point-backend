#!/bin/bash
echo 'run application_start.sh: '>> /home/breakpoint/codedeploy-pipeline/deploy.log

echo 'sudo chmod -R 777 /home/ec2-user/express-app' >> /home/breakpoint/codedeploy-pipeline/deploy.log
sudo chmod -R 777 /home/breakpoint/breakpoint-backend >> /home/breakpoint/codedeploy-pipeline/deploy.log

echo 'npm run build' >> /home/breakpoint/codedeploy-pipeline/deploy.log
npm run build >> /home/breakpoint/codedeploy-pipeline/deploy.log

echo 'npm run start' >> /home/breakpoint/codedeploy-pipeline/deploy.log
npm run start >> /home/breakpoint/codedeploy-pipeline/deploy.log

# #start our node app in the background
# node app.js > app.out.log 2> app.err.log < /dev/null & 