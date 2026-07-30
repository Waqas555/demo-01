pipeline {
    agent any
    tools {
        nodejs 'Node'
    }

    environment {
        SONAR_AUTH_TOKEN = credentials('sonar-token')
        SONAR_URL = 'http://192.168.56.10:9000'
        IMAGE_NAME = 'demo-01'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    stages {
        stage('github') {
            steps {
                git branch: 'main', credentialsId: 'demo-01-token', url: 'https://github.com/Waqas555/demo-01.git'
            }
        }
        stage('unit test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('code quality'){
            steps{
                withSonarQubeEnv('sonar'){
                    script {
                        def scannerHome = tool(name: 'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation')
                        sh """${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=demo-01 \
                        -Dsonar.sources=.
                        """
                    }
                }
            }
        }
        stage('docker build') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .'
            }
        }
        stage('trivy scan') {
            steps {
                sh '''
                    trivy image \
                        --severity HIGH,CRITICAL \
                        --exit-code 0 \
                        --no-progress \
                        --format table \
                        ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }
    }
}