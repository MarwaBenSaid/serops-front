import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Input } from 'reactstrap';
import { Icon } from '@iconify/react';
import ApplicationService from '../services/application.service';
import { useParams } from 'react-router-dom';

const Application = () => {
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const toggle = () => setModal(!modal);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [project, setProject] = useState("");
  const [reloadApplications, setReloadApplications] = useState(false);
  const [filter, setFilter] = useState(""); // New filter state

  const { id } = useParams();

  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

  useEffect(() => {
    ApplicationService.filter({ project: id, name: filter }) // Pass the filter options
      .then((res) => {
        console.log("Response data:", res.data);
        setApplications(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError(err.message);
      });
  }, [reloadApplications, filter]); // Include filter in the dependency array

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      name: name,
      description: description,
      source: source,
      project: project
    };

    ApplicationService.add(applicationData)
      .then(response => {
        console.log('Application added successfully:', response.data);
        setReloadApplications(!reloadApplications); // Invert the value to trigger useEffect
        toggle(); // Close the modal
      })
      .catch(error => {
        console.error('Error adding application:', error);
      });
  };

  const handleUpdate = (application) => {
    const updatedData = {
      name: application.name,
      description: application.description,
      source: application.source,
      project: application.project
    };

    ApplicationService.update(application.id, updatedData)
      .then(response => {
        console.log('Application updated successfully:', response.data);
        setReloadApplications(!reloadApplications); // Invert the value to trigger useEffect
      })
      .catch(error => {
        console.error('Error updating application:', error);
      });
  };

  const handleRemove = (application) => {
    ApplicationService.deleteOne(application.id)
      .then(response => {
        console.log('Application deleted successfully:', response.data);
        setReloadApplications(!reloadApplications); // Invert the value to trigger useEffect
      })
      .catch(error => {
        console.error('Error deleting application:', error);
      });
  };

  return (
    <div>
      <div className="container-project mt-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="title-project">Applications</h1>
            <button className="btn-add-project" onClick={toggle}>
              <i>
                <Icon icon="material-symbols:add-box" />
              </i>
              Add new Application
            </button>
            <div className="search-container">
              <Input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {error && <div className="error">{error}</div>}
            <div className="applications">
              {applications.map((application) => (
                <div key={application.id} className="application">
                  <div className="application-details">
                    <h3>{application.name}</h3>
                    <p>{application.description}</p>
                    <span>Source: {application.source}</span>
                    <span>Project: {application.project}</span>
                  </div>
                  <div className="application-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate(application)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(application)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        unmountOnClose={unmountOnClose}
        className="modal-dialog modal-dialog-centered"
      >
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="source">Source</label>
              <input
                type="text"
                className="form-control"
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="project">Project</label>
              <input
                type="text"
                className="form-control"
                id="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Application;
