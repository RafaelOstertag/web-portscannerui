pipeline {
    agent {
        label 'freebsd&&nodejs'
    }

    environment {
        // Used for tests, to make Jest running all tests without watcher
        CI = "true"
        NEXUS = "https://gizmo.kruemel.home/nexus/"
	    REPOSITORY = "repository/webtools/portscannerui/"
    }

    triggers {
        pollSCM ''
    }

    options {
        ansiColor('xterm')
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '5')
    }

    stages {
        stage('clean') {
            steps {
                sh 'rm -rf build'
            }
        }

        stage('install packages') {
            steps {
                sh 'yarn install'
            }
        }

        stage('test') {
            steps {
                sh 'yarn test'
            }
        }

        stage('deploy') {
            when {
                branch "release/v*"
            }

            steps {
                sh 'yarn build'

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
        always {
            mail to: "rafi@guengel.ch",
                    subject: "${JOB_NAME} (${BRANCH_NAME};${env.BUILD_DISPLAY_NAME}) -- ${currentBuild.currentResult}",
                    body: "Refer to ${currentBuild.absoluteUrl}"
        }
    }
}