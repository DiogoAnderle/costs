import styles from './Project.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import ProjectForm from '../projects/ProjectForm';

function Project(){


		const options = {style:'currency', currency: 'BRL', maximumFractionDigits:2}
    const formatNumber = new Intl.NumberFormat('pt-BR', options)

    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState('');
		const[type, setType] = useState('');

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
           .then((resp) => resp.json())
           .then((data) =>{
            setProject(data)
           })
           .catch(err => console.error(err))
        },500)
    },[id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }

		function editPost(project){
			setMessage('')
			if(project.budget < project.costs){
				setMessage('')
				setMessage('O custo do projeto não pode ultapassar o orçamento aprovado!')
				setType('error')
				
				return
		} if(project.budget <= 0){
				setMessage('O valor do orçamento precisa ser maior que zero!')
				setType('warning')
				return
		} 
		
		fetch(`http://localhost:5000/projects/${id}`,{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project),
		})
		.then((resp) => resp.json())
		.then((data) => {
			setProject(data);
			setShowProjectForm(false)
			setMessage('Projeto alterado com sucesso!')
			setType('success')
		})
		.catch(err => console.error(err))
	}
    
    return(
        <> {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
									{message &&<Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' :'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria: </span>{project.category.name}
                                </p>
                                <p>
                                    <span>Total do Orçamento: </span>{formatNumber.format(project.budget)}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span>{formatNumber.format(project.costs)}
                                </p>
                            </div>
                        ) : ( 
														<div className={styles.project_info}>
															<ProjectForm
																handleSubmit={editPost}
																btnText={"Salvar"}
																projectData={project}
															/>
														</div>)}
                    </div>
                </Container>
            </div>
        )
        :(<Loading/>)}</>
    )
}

export default Project;