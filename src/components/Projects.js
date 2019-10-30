import React,{useEffect,useState} from 'react'
import { FaHeart } from 'react-icons/fa'
import './Projects.css'
const url_ = 'https://platzi-connect-api.now.sh'

function Projects(props) {
  let url  = `${url_}/projects`
  const [projects,setProjects] = useState(() => {
    if(window.localStorage.getItem('projects')) return JSON.parse(window.localStorage.getItem('projects')) 
    return []
  })
  
  function getProjects() {
    fetch(url)
    .then((data) => {
      return data.json()
    })
    .then(( json) => {
      let projects = json.response.map( proj => ({
        ...proj,
        liked : false
      }))

      window.localStorage.setItem('projects',JSON.stringify(projects))
      setProjects([...projects])
    
    })
    .catch( e => console.log(e.message))
}
 

  function like(id) {
    fetch(`${url}?id=${id}`,{
      method : 'PATCH'
    })
    .then((data) => {
      return data.json()
    })
    .then((json) => {
      let updateProjects = projects.map( proj => {
        if(proj._id == id) {
          proj.likes = proj.likes += 1
          proj.liked = true
        }
        return proj
      })

      window.localStorage.setItem('projects',JSON.stringify(updateProjects))
      setProjects(updateProjects)
    })
  }

  function getTop() {
   
    let listLike = projects.map( proj => ({likes : proj.likes}) )
    let topsRanges = []
    let tops = []

    for(let i=0;i < 3;i++) {
      let m = Math.max.apply(Math,listLike.map( e => e.likes))
      topsRanges.push(m)
      listLike = listLike.filter( e => e.likes !== m)
    }

    topsRanges.forEach( range => {
     let item = projects.find( pro => pro.likes == range)
     tops.push(item)
    })

    return tops

  }

  useEffect(() => {
    if(! window.localStorage.getItem('projects')) getProjects()
  },[])

    
    return (
      <div>       
      <h3 className='titleSection'>Top 3 mas likeados</h3>
      <div className='projectsTopContainer'>
        {
         projects.length && getTop().map((project) => (
          <div className='projectItem' key={project._id}>
            <img src={project.image} alt=""/>
              <h3 className='projectTitle'>{project.title}</h3>
              <div>
            <div className='likesContainer'>
            <p className='projectLikes'>Likes : {project.likes}</p>
            <FaHeart className={`likeIcon ${project.liked ? 'active' : ''}`}  onClick={() => !project.liked && like(project._id)}/>
            </div>
            <p className='projectDescription'>{project.description}</p> 
            <strong>Habilidades Aprendidas :</strong>
            <p className='projectSkills'>{project.skills}</p>
          </div>
          </div>
          ))
        }
      </div>
      <h3 className='titleSection'>Proyectos de la comunidad</h3>
      <section className='projectsContainer'>
        {
          projects.map( (project) => (
            <div className='projectItem'  key={project._id}>
              <img src={project.image} alt=""/>
              <h3 className='projectTitle'>{project.title}</h3>
              <div>
                <div className='likesContainer'>
                  <p className='projectLikes'>Likes : {project.likes}</p>
                  <FaHeart className={`likeIcon ${project.liked ? 'active' : ''}`}  onClick={() => !project.liked && like(project._id)}/>
                </div>
                <p className='projectDescription'>{project.description}</p> 
                <strong>Habilidades Aprendidas :</strong>
                <p className='projectSkills'>{project.skills}</p>
              </div>
            </div>
          ))
        }
      </section>
      </div>
    )
  
}

export default Projects