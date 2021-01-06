pipeline {
    agent {
        label 'freebsd&&nodejs'
    }

    environment {
        // Used for tests, to make Jest running all tests without watcher
        CI = "true"
        NEXUS = "https://colossus.kruemel.home/nexus/"
	    REPOSITORY = "repository/webtools/portscannerui/"
    }

    triggers {
        pollSCM '@hourly'
        cron '@daily'
    }

    options {
        ansiColor('xterm')
        timestamps()
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '15')
        disableConcurrentBuilds()        
    }

    stages {
        stage('install yarn') {
            steps {
                sh 'npm install yarn'
                sh 'rm -f package-lock.json'
            }
        }

        stage('install packages') {
            steps {
                sh 'node_modules/yarn/bin/yarn install'
            }
        }

        stage('test') {
            steps {
                sh 'node_modules/yarn/bin/yarn test'
            }
        }

        stage('deploy') {
            when {
                branch "release/v*"
                not {
                    triggeredBy "TimerTrigger"
                }
            }

            steps {
                sh 'node_modules/yarn/bin/yarn build'

                sh 'tar -C build -cvzf portscannerui-${BRANCH_NAME#release/v}.tar.gz .'

                withCredentials([usernameColonPassword(credentialsId: '80a834f5-b4ca-42b1-b5c6-55db88dca0a4', variable: 'CREDENTIALS')]) {
                    sh 'curl -k -u "$CREDENTIALS" --upload-file portscannerui-${BRANCH_NAME#release/v}.tar.gz "${NEXUS}${REPOSITORY}/${BRANCH_NAME#release/v}/"'
                }

                script {
                    def version = env.BRANCH_NAME - 'release/v'
                    step([$class                 : "RundeckNotifier",
                          includeRundeckLogs     : true,
                          jobId                  : "cd3fda26-b00e-4f72-976c-de05257dc82a",
                          options                : "version=$version",
                          rundeckInstance        : "gizmo",
                          shouldFailTheBuild     : true,
                          shouldWaitForRundeckJob: true,
                          tailLog                : true])
                }
            }
        }
    }


    post {
        unsuccessful {
            mail to: "rafi@guengel.ch",
                    subject: "${JOB_NAME} (${BRANCH_NAME};${env.BUILD_DISPLAY_NAME}) -- ${currentBuild.currentResult}",
                    body: "Refer to ${currentBuild.absoluteUrl}"
        }
    }
}
