job('Docker Repo Update') {
    scm {
        git('https://github.com/theSupermacy/react-boilerplate') { node -> // is hudson.plugins.git.GitSCM
            node / gitConfigName('DSL User')
            node / gitConfigEmail('rahulanandsinha@gmail.com')
        }
    }
    triggers {
        scm('* * * * *')
    }
    steps {
        dockerBuildAndPublish {
            repositoryName('supermacy/react-boilerplate')
            tag('${GIT_REVISION,length=9}')
            registryCredentials('docker-hub')
            forcePull(false)
            createFingerprints(false)
            skipDecorate()
            forceTag(false)
        }
    }
}