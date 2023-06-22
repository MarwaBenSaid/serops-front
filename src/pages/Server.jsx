import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Input } from 'reactstrap';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import '../Styles/List.css';
import '../Styles/Add.css';
import '../Styles/Code.css';

import ServerService from '../services/server.service';

export default function Server() {
  const navigate = useNavigate();

  // Modal state
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const toggle = () => setModal(!modal);
  

  // Server data
  const [servers, setServers] = useState([]);
  const [error, setError] = useState("");

  // Form data
  const [serverName, setServerName] = useState('');
  const [ip, setIp] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');
  const [reloadServers, setReloadServers] = useState(false);


  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(Array(servers.length).fill(false));
  const [selectedServer, setSelectedServer] = useState(null);

  // Fetch servers on component mount
  useEffect(() => {
    ServerService.getAll()
      .then((res) => {
        console.log("Response data:", res.data);
        setServers(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
      })
      ;
  }, [reloadServers]);

  // Update server
  const handleEdit = (id, updatedData) => {
    ServerService.update(id, updatedData)
      .then(response => {
        console.log('Server updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating server:', error);
      });
  };

  // Delete server
  const handleRemove = (server) => {
    ServerService.deleteOne(server.id)
      .then(response => {
        console.log('Server deleted successfully:', response.data);
        setReloadServers(true); 
      })
      .catch(error => {
        console.error('Error deleting server:', error);
      })
  };

  // Form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: serverName,
      ip: ip,
      password: password,
     key: key
    };
    console.log(data);
    ServerService.add(data)
      .then(response => {
        console.log('Server added successfully:', response.data);
        setReloadServers(true);
        toggle()
      })
      .catch(error => {
        console.error('Error adding server:', error);
      });
      
  };

  return (
    <div>
      <div className="container-project mt-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="title-project">Server</h1>
            <button className='btn-add-project' onClick={toggle}>
              <i><Icon icon="material-symbols:add-box" /></i>
              Add Server
            </button>

            <Modal className="model mt-0" isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
              <ModalBody className='model-body mt-0'>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label">Server Name</label>
                    <Input className="form-control-model" type="text" id="name" name="name" value={serverName} onChange={(e) => setServerName(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="ip" className="form-label">IP Address</label>
                    <Input className="form-control-model" type="text" id="ip" name="ip" value={ip} onChange={(e) => setIp(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="tag" className="form-label">Password</label>
                    <Input className="form-control-model" type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="key" className="form-label">SSH Key</label>
                    <Input className="form-control-model" type="text" id="key" name="key" value={key} onChange={(e) => setKey(e.target.value)} />
                  </div>
                  <button className='btn-connection'>Test Connection</button>
                  <div className='form-btn'>
                    <button className="cancel-button" onClick={toggle}>Cancel</button>
                    <button className="submit-button" onClick={toggle}>Submit</button>
                  </div>
                </form>
              </ModalBody>
            </Modal>
          </div>

          <div className="code-container">
            <div className="server-list">
              {servers && servers.map((s, index) => (
                <div className="server-card" key={s.id}>
                  <h5 className='card-title row'>{s.name}</h5>
                  <p>{s.ip}</p>
                  <p>{s.key}</p>
                  <i onClick={() => {
                    const updatedShowDropdown = [...showDropdown];
                    updatedShowDropdown[index] = !updatedShowDropdown[index];
                    setShowDropdown(updatedShowDropdown);
                    setSelectedServer(s);
                  }}>
                    <Icon class="server-icon" icon="fe:elipsis-v" color='blue' />
                  </i>
                  {showDropdown[index] && selectedServer && (
                    <div className='code-dropdown'>
                      <ul className='drop-menu'>
                        <li className="dropdown-item " onClick={() => handleEdit(selectedServer)}>
                        <Icon icon="raphael:edit" />
                           Edit
                           </li>
                           
                        <li  className="dropdown-item " onClick={() => handleRemove(selectedServer)}> 
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
