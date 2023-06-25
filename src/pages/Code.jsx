import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Input } from 'reactstrap';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import '../Styles/List.css';
import '../Styles/Add.css';
import '../Styles/Code.css';

import CodeService from '../services/code.service';

export default function Code() {
  const navigate = useNavigate();

  // Modal state
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const toggle = () => setModal(!modal);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
 

  // Code data
  const [codes, setCodes] = useState([]);
  const [error, setError] = useState("");

  // Form data
  const [name, setName] = useState('');
  const [hostname, setHostname] = useState('');
  const [hostlink, setHostlink] = useState('');
  const [repoId, setRepoId] = useState('');
  const [repoName, setRepoName] = useState('');
  const [workspace, setWorkspace] = useState('');
  const [owner, setOwner] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [branch, setBranch] = useState('');
  const [organisation, setOrganisation] = useState(null);
 // Dropdown state
 const [showDropdown, setShowDropdown] = useState(Array(codes.length).fill(false));
 const [selectedCode, setSelectedCode] = useState(null);

  const [reloadCodes, setReloadCodes] = useState(false);

  // Fetch codes on component mount
  useEffect(() => {
    CodeService.getAll()
      .then((res) => {
        console.log("Response data:", res.data);
        setCodes(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
      });
  }, [reloadCodes]);

 

  // Delete code
  const handleRemove = (code) => {
    CodeService.deleteOne(code.id)
      .then(response => {
        console.log('Code deleted successfully:', response.data);
        setReloadCodes(true);
      })
      .catch(error => {
        console.error('Error deleting code:', error);
      });
  };

  // Form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      hostname: hostname,
      hostlink: hostlink,
      repo_id: repoId,
      repo_name: repoName,
      workspace: workspace,
      owner: owner,
      access_token: accessToken,
      branch: branch,
      organisation: organisation
    };
    console.log(data);
    CodeService.add(data)
      .then(response => {
        console.log('Code added successfully:', response.data);
        setReloadCodes(true);
        toggle();
      })
      .catch(error => {
        console.error('Error adding code:', error);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form submission
  
    const updatedData = {
      id: selectedCode.id,
      name: name,
      hostname: hostname,
      hostlink: hostlink,
      repo_id: repoId,
      repo_name: repoName,
      workspace: workspace,
      owner: owner,
      access_token: accessToken,
      branch: branch,
      organisation: organisation
    };
  
    CodeService.update(selectedCode.id, updatedData)
      .then((response) => {
        console.log('Code updated successfully:', response.data);
        setReloadCodes(true);
        toggleUpdate(); // Close the modal
      })
      .catch((error) => {
        console.error('Error updating code:', error);
      });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "hostname") {
      setHostname(value);
    } else if (name === "hostlink") {
      setHostlink(value);
    } else if (name === "repo_id") {
      setRepoId(value);
    } else if (name === "repo_name") {
      setRepoName(value);
    } else if (name === "workspace") {
      setWorkspace(value);
    } else if (name === "owner") {
      setOwner(value);
    } else if (name === "access_token") {
      setAccessToken(value);
    } else if (name === "branch") {
      setBranch(value);
    } else if (name === "organisation") {
      setOrganisation(value);
    }
  };
  
  const handleCodeDropdown = (index) => {
    const updatedCodes = [...codes];
    updatedCodes[index].showDropdown = !updatedCodes[index].showDropdown;
    setCodes(updatedCodes);
  };
  
  const handleEditCode = (code) => {
    setSelectedCode(code);
    setName(code.name);
    setHostname(code.hostname);
    setHostlink(code.hostlink);
    setRepoId(code.repo_id);
    setRepoName(code.repo_name);
    setWorkspace(code.workspace);
    setOwner(code.owner);
    setAccessToken(code.access_token);
    setBranch(code.branch);
    setOrganisation(code.organisation);
    toggleUpdate();
  };

  return (
    <div>
      <div className="container-project mt-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="title-project">Code</h1>
            <button className='btn-add-project' onClick={toggle}>
              <i><Icon icon="material-symbols:add-box" /></i>
              Add Code
            </button>

            <Modal className="model mt-0" isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
              <ModalBody className='model-body mt-0'>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label">Code Name</label>
                    <Input className="form-control-model" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="hostname" className="form-label">Hostname</label>
                    <Input className="form-control-model" type="text" id="hostname" name="hostname" value={hostname} onChange={(e) => setHostname(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="hostlink" className="form-label">Host Link</label>
                    <Input className="form-control-model" type="text" id="hostlink" name="hostlink" value={hostlink} onChange={(e) => setHostlink(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="repoId" className="form-label">Repository ID</label>
                    <Input className="form-control-model" type="text" id="repoId" name="repoId" value={repoId} onChange={(e) => setRepoId(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="repoName" className="form-label">Repository Name</label>
                    <Input className="form-control-model" type="text" id="repoName" name="repoName" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="workspace" className="form-label">Workspace</label>
                    <Input className="form-control-model" type="text" id="workspace" name="workspace" value={workspace} onChange={(e) => setWorkspace(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="owner" className="form-label">Owner</label>
                    <Input className="form-control-model" type="text" id="owner" name="owner" value={owner} onChange={(e) => setOwner(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="accessToken" className="form-label">Access Token</label>
                    <Input className="form-control-model" type="text" id="accessToken" name="accessToken" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="branch" className="form-label">Branch</label>
                    <Input className="form-control-model" type="text" id="branch" name="branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="organisation" className="form-label">Organisation</label>
                    <Input className="form-control-model" type="text" id="organisation" name="organisation" value={organisation} onChange={(e) => setOrganisation(e.target.value)} />
                  </div>
                  <button className='btn-connection'>Test Code</button>
                  <div className='form-btn'>
                    <button className="cancel-button" onClick={toggle}>Cancel</button>
                    <button className="submit-button" onClick={toggle}>Submit</button>
                  </div>
                </form>
              </ModalBody>
            </Modal>
            <Modal className="model mt-0"
        isOpen={modalUpdate}
        toggle={toggleUpdate}
        unmountOnClose={unmountOnClose}>
              <ModalBody className='model-body mt-0'>
                <form onSubmit={handleUpdate}>
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label">Code Name</label>
                    <Input className="form-control-model" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="hostname" className="form-label">Hostname</label>
                    <Input className="form-control-model" type="text" id="hostname" name="hostname" value={hostname} onChange={(e) => setHostname(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="hostlink" className="form-label">Host Link</label>
                    <Input className="form-control-model" type="text" id="hostlink" name="hostlink" value={hostlink} onChange={(e) => setHostlink(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="repoId" className="form-label">Repository ID</label>
                    <Input className="form-control-model" type="text" id="repoId" name="repoId" value={repoId} onChange={(e) => setRepoId(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="repoName" className="form-label">Repository Name</label>
                    <Input className="form-control-model" type="text" id="repoName" name="repoName" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="workspace" className="form-label">Workspace</label>
                    <Input className="form-control-model" type="text" id="workspace" name="workspace" value={workspace} onChange={(e) => setWorkspace(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="owner" className="form-label">Owner</label>
                    <Input className="form-control-model" type="text" id="owner" name="owner" value={owner} onChange={(e) => setOwner(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="accessToken" className="form-label">Access Token</label>
                    <Input className="form-control-model" type="text" id="accessToken" name="accessToken" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="branch" className="form-label">Branch</label>
                    <Input className="form-control-model" type="text" id="branch" name="branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="organisation" className="form-label">Organisation</label>
                    <Input className="form-control-model" type="text" id="organisation" name="organisation" value={organisation} onChange={(e) => setOrganisation(e.target.value)} />
                  </div>
                  <button className='btn-connection'>Test Code</button>
                  <div className='form-btn'>
                    <button className="cancel-button" onClick={toggleUpdate}>Cancel</button>
                    <button className="submit-button" onClick={toggleUpdate}>Update Code</button>
                  </div>
                </form>
              </ModalBody>
            </Modal>
          </div>

          <div className="code-container">
            <div className="server-list">
              {codes && codes.map((code, index) => (
                <div className="server-card" key={code.id}>
                  <p>{code.name}</p>
                  <p>{code.hostname}</p>
                  <p>{code.hostlink}</p>
                  <p>{code.repoName}</p>
                  <p>{code.workspace}</p>
                  <p>{code.access_token}</p>
                  <p>{code.owner}</p>
                  <p>
                  <i onClick={() => {
                    const updatedShowDropdown = [...showDropdown];
                    updatedShowDropdown[index] = !updatedShowDropdown[index];
                    setShowDropdown(updatedShowDropdown);
                    setSelectedCode(code);
                  }}>
                    <Icon class="server-icon" icon="fe:elipsis-v" color='blue' />
                  </i>
                  </p>
                  {showDropdown[index] && selectedCode && (
                    <div className='code-dropdown'>
                      <ul className='drop-menu'>
                        <li className="dropdown-item" onClick={() => handleEditCode(code)}>
                          <Icon icon="raphael:edit" />
                          Edit
                        </li>
                        <li className="dropdown-item" onClick={() => handleRemove(selectedCode)}>
                          <Icon icon="ph:trash" />
                          Remove
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
    </div>
  );
}
