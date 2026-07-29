pipeline {
    agent any
    tools {
        nodejs 'Node'
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
    }
}