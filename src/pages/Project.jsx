import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Input } from 'reactstrap';
import { Icon } from '@iconify/react';
import ProjectService from '../services/project.service';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/auth.service';


const Project = () => {
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const toggle = () => setModal(!modal);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [selectedProject, setSelectedProject] = useState(null); // Store the selected project
  const [reloadProjects, setReloadProjects] = useState(false);

  const navigate = useNavigate();

  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

  useEffect(() => {
    ProjectService.getAll()
      .then((res) => {
        console.log("Response data:", res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
      });
  }, [reloadProjects]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const projectData = {
      name: name,
      type: type,
      organisation: organisation
    };
    
    // Create new project
    ProjectService.add(projectData)
      .then(response => {
        console.log('Project added successfully:', response.data);
        setReloadProjects(true);
        toggle(); // Close the modal
      })
      .catch(error => {
        console.error('Error adding project:', error);
      });
  };

  const handleRemove = (project) => {
    ProjectService.deleteOne(project.id)
      .then(response => {
        console.log('Project deleted successfully:', response.data);
        setReloadProjects(true);
      })
      .catch(error => {
        console.error('Error deleting project:', error);
      });
  };
  const handleApp = (selectedProject) => {
    const projectId = selectedProject.id; // Get the project ID
  
    axios
      .post('http://127.0.0.1:8000/api/applications/filter', { id: projectId }, AuthService.authHeader())
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        // Navigate to the applications page or perform other actions
        navigate('/projects/applications');
      })
      .catch((error) => {
        // Handle the error
        console.error('Error:', error);
      });
  };
  

  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form submission

    const updatedData = {
      id: selectedProject.id,
      name: name,
      type: type,
      organisation: organisation
    };

    ProjectService.update(selectedProject.id, updatedData)
      .then((response) => {
        console.log('Project updated successfully:', response.data);
        setReloadProjects(true);
        toggleUpdate(); // Close the modal
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "type") {
      setType(value);
    } else if (name === "organisation") {
      setOrganisation(value);
    }
  };

  const handleProjectDropdown = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].showDropdown = !updatedProjects[index].showDropdown;
    setProjects(updatedProjects);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setName(project.name);
    setType(project.type);
    setOrganisation(project.organisation);
    toggleUpdate();
  
  };

  return (
    <div>
      <div className="container-project mt-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="title-project">Projects</h1>
            <button className="btn-add-project" onClick={toggle}>
              <i>
                <Icon icon="material-symbols:add-box" />
              </i>
              Add new Project
            </button>
            <div className="search-container">
              <Input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="project-list">
              {projects &&
                projects.map((proj, index) => (
                  <div className="project-card" key={proj.id}>
                    <h5 className="card-title row">
                      {proj.name}
                      <i
                      
                        className="icon-card"
                        onClick={() => handleProjectDropdown(index)}
                      >
                        <Icon icon="uiw:setting" />
                      </i>
                    </h5>
                    <p>{proj.type}</p>
                    {proj.showDropdown && (
                      <div className="project-dropdown">
                        <ul className="drop-menu">
                          <li
                            className="dropdown-item"
                            onClick={() => handleEditProject(proj)}
                          >
                            <Icon icon="el:edit" />
                            Update
                          </li>
                          <li
                            className="dropdown-item"
                            onClick={() => handleRemove(proj)}
                          >
                            <Icon icon="ph:trash" />
                            Remove
                          </li>
                          <li
                            className="dropdown-item"
                            onClick={() => handleApp(proj)}
                          >
                            Applications
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="model mt-0"
        isOpen={modal}
        toggle={toggle}
        unmountOnClose={unmountOnClose}
      >
        <ModalBody className="model-body mt-0">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-2">
              <label htmlFor="ControlInput" className="form-label">
                Project Name
              </label>
              <Input
                className="form-control-model"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Type
              </label>
              <Input
                type="textarea"
                className="form-control-model textarea"
                id="type"
                name="type"
                rows="3"
                value={type}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="ControlInput" className="form-label">
                Company Name
              </label>
              <Input
                className="form-control-model"
                type="text"
                id="organisation"
                name="organisation"
                value={organisation}
                onChange={handleChange}
              />
            </div>
            <div className="form-btn">
              <button className="cancel-button" onClick={toggle}>
                Cancel
              </button>
              <button className="submit-button" type="submit">
                Add Project
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal
        className="model mt-0"
        isOpen={modalUpdate}
        toggle={toggleUpdate}
        unmountOnClose={unmountOnClose}
      >
        <ModalBody className="model-body mt-0">
          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <label htmlFor="ControlInput" className="form-label">
                Project Name
              </label>
              <Input
                className="form-control-model"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Type
              </label>
              <Input
                type="textarea"
                className="form-control-model textarea"
                id="type"
                name="type"
                rows="3"
                value={type}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="ControlInput" className="form-label">
                Company Name
              </label>
              <Input
                className="form-control-model"
                type="text"
                id="organisation"
                name="organisation"
                value={organisation}
                onChange={handleChange}
              />
            </div>
            <div className="form-btn">
              <button className="cancel-button" onClick={toggleUpdate}>
                Cancel
              </button>
              <button className="submit-button" type="submit">
                Update Project
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Project;
