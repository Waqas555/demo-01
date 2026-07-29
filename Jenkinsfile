pipeline {
    agent any
    tools {
        nodejs 'Node'
        // sonarqube 'sonar'
    }   

    environment {
        SONAR_AUTH_TOKEN = credentials('sonar-token')
        SONAR_URL = 'http://192.168.56.10:9000'
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
                    sh """
                    mvn clean verify sonar:sonar \
                    -Dsonar.projectKey=demo-01 \
                    -Dsonar.host.url=${env.SONAR_URL} \
                    -Dsonar.login=${env.SONAR_AUTH_TOKEN}
                    """
                }
            }
        }
    }
}