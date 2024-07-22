import styles from './NewProject.module.css'
import ProjectForm from '../projects/ProjectForm';
function NewProject(){
    return(
        <section className={styles.new_project_container}>
            <h1>Criar Projeto</h1>
            <p>Crie um projeto para depois adicionar os serviços.</p>
            <ProjectForm btnText="Criar Projeto" />
        </section>
    )
}

export default NewProject;