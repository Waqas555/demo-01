pipeline {
    agent any
    stages {
        stage('github') {
            steps {
                git branch: 'main', credentialsId: 'demo-01-token', url: 'https://github.com/Waqas555/demo-01.git'
            }
        }
    }
}