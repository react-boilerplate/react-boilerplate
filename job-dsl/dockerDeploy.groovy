job('Docker Repo Update') {
    scm{
        git('https://github.com/theSupermacy/react-boilerplate') { node -> // is hudson.plugins.git.GitSCM
            node / gitConfigName('DSL User')
            node / gitConfigEmail('rahulanandsinha@turtlemint.com')
        }
    }
}