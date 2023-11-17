import React, { useState, useEffect} from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./components/Home";


function App(){


  return(
    <Router>
      <div className="app">
        <NavBar />
        <div className="content">
          <Sidebar/>
          <main>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/ambientes' element={<Ambientes />} />
              <Route path='/usuarios' element={<Usuarios />} />
              <Route path='/ativos' element={<Ativos />} />
              <Route path='/categorias' element={<Categorias />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function Ativos(){
  const [ativos, setAtivos] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingAtivo, setIsAddingAtivo] = useState(false);
  const [editingAtivo, setEditingAtivo] = useState(null);
  const [nomeAtivo, setNomeAtivo] = useState("");
  const [idAtivo, setIdAtivo] = useState("");
  const [descricaoAtivo, setDescricaoAtivo] = useState("");
  const [marcaAtivo, setMarcaAtivo] = useState("");
  const [nsAtivo, setNsAtivo] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [ambienteId, setAmbienteId] = useState("");
  const [criadoPor, setCriadoPor] = useState("");
  const [ambientesList, setAmbientesList] = useState([]);
  const [categoriasList, setCategoriasList] = useState([]);
  const [selecionadoUsuario, setSelecionadoUsuario] = useState("");
  const [usuariosList, setUsuariosList] = useState ([]);
  
  useEffect(() => {
    fetchAtivosData();
    fetchAmbientesList();
    fetchCategoriasList();
    fetchUsuariosList();
  }, []);

  const fetchAmbientesList = async () => {
    setIsLoading(true);

    try{
      const response = await fetch("http://localhost:8080/api/ambientes");
      if(!response.ok){
      throw new Error ("Erro ao buscar ambientes.");
    }
    const data = await response.json();
    setAmbientesList(data);
    } catch(error){
      console.error("Erro ao buscar ambientes:", error);
    } finally{
      setIsLoading(false);
    }
  };

  const fetchCategoriasList = async () => {
    setIsLoading(true);

  try{
    const response = await fetch("http://localhost:8080/api/categorias");
    if (!response.ok){
      throw new Error("Erro ao buscar categorias.");
    }
    const data = await response.json();
    setCategoriasList(data);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
  } finally {
    setIsLoading(false);
  }    
  };

  const fetchUsuariosList = async () => {
    setIsLoading(true);

  try{
    const response = await fetch("http://localhost:8080/api/usuarios");
    if (!response.ok){
      throw new Error("Erro ao buscar usuários.");
    }
    const data = await response.json();
    setUsuariosList(data);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  } finally {
    setIsLoading(false);
  }    
  };

  const fetchAtivosData = async () => {
    setIsLoading(true);

  try{
    const response = await fetch("http://localhost:8080/api/ativos");
    if (!response.ok){
      throw new Error("Erro ao buscar ativos.");
    }
    const data = await response.json();
    setAtivos(data);
  } catch (error) {
    console.error("Erro ao buscar ativos:", error);
  } finally {
    setIsLoading(false);
  }    
  };

  const handleAddAtivoClick = () =>{
    setIsAddingAtivo(true);
  };

  const handleCancelAtivoClick = () => {
    setIsAddingAtivo(false);
    setEditingAtivo(null);
  };

  const handleSaveAtivoClick = async () => {
    if (
      !nomeAtivo.trim() ||
      !descricaoAtivo.trim() ||
      !marcaAtivo.trim() ||
      !nsAtivo.trim() ||
      !categoriaId ||
      !ambienteId ||
      !selecionadoUsuario
    ){
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novoAtivo = {
      nomeAtivo,
      descricaoAtivo,
      marcaAtivo,
      nsAtivo,
      categoria: { idCategoria: categoriaId },
      ambiente: { idAmbiente: ambienteId },
      criadoPor: { idUsuario: selecionadoUsuario },
    };

    try{
      const response = await fetch("http://localhost:8080/api/ativos",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoAtivo),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar ativo.");
      }

      fetchAtivosData();
      setIsAddingAtivo(false);
      clearAtivoForm();
    } catch (error){
      console.error("Erro ao criar ativo:", error);
    }
  };

  const handleEditAtivo = (ativo) => {
    setEditingAtivo(ativo);
    setIdAtivo(ativo.idAtivo);
    setNomeAtivo(ativo.nomeAtivo);
    setDescricaoAtivo(ativo.descricaoAtivo);
    setMarcaAtivo(ativo.marcaAtivo);
    setNsAtivo(ativo.nsAtivo);
    setCategoriaId(ativo.categoria.idCategoria);
    setAmbienteId(ativo.ambiente.idAmbiente);
    setCriadoPor(ativo.criadoPor);
  };

  const handleCancelEdit = () => {
    setEditingAtivo(null);
    clearAtivoForm();
  };

  const handleUpdateAtivo = async () => {
    if(
      !nomeAtivo.trim() ||
      !descricaoAtivo.trim() ||
      !marcaAtivo.trim() ||
      !nsAtivo.trim() ||
      !categoriaId ||
      !ambienteId ||
      !selecionadoUsuario
    ) {
      alert("Por favor, Preenca todos os campos.");
      return;
    }

    const ativoAtualizado = {
      nomeAtivo,
      descricaoAtivo,
      marcaAtivo,
      nsAtivo,
      categoria: { idCategoria: categoriaId},
      ambiente: { idAmbiente: ambienteId},
      criadoPor: { idUsuario: selecionadoUsuario},
    };

    const requestBody = JSON.stringify(ativoAtualizado);
    console.log("Dados no corppo da solicitação PUT:", requestBody);

    try{
      const response = await fetch(`http:localhost:8080/api/ativos/${idAtivo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar ativo.");
      }
      fetchAtivosData();
      setEditingAtivo(null);
      clearAtivoForm();
    } catch (error){
      console.error("Erro ao atualizar ativo:", error);
    }
  };

  const handleDeleteAtivo = (idAtivo) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este ativo?");

    if (confirmDelete) {
      fetch(`http://localhost:8080/api/ativos/${idAtivo}`,{
        method: "Delete",
      })
      .then((response) => {
        if(response.ok) {
          const updateAtivos = ativos.filter((ativo) => ativo.id !== idAtivo);
          setAtivos(updateAtivos);
        } else {
          console.error("Erro ao excluir ativo:", response.status);
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir ativo:", error);
      });
    }
  };

  const clearAtivoForm = () => {
    setNomeAtivo("");
    setDescricaoAtivo("");
    setMarcaAtivo("");
    setNsAtivo("");
    setCategoriaId("");
    setAmbienteId("");
    setCriadoPor("");
  };

  return (
    <div>
      <h2>Ativos</h2>

      <button class="add-dados-button" onClick={handleAddAtivoClick}>
        Adicionar Ativo
      </button>

      {isAddingAtivo || editingAtivo ? (
        <div className="add-dados-form">
          <h3>{editingAtivo ? "Editar Aativo" : "Novo Ativo"}</h3>
          <label htmlFor="nomeAtivo">Nome do Ativo:</label>
          <input
          type="text"
          placeholder="Nome"
          value={nomeAtivo}
          onChange={(e) => setNomeAtivo(e.target.value)}
          />
          <label htmlFor="descricaoAtivo">Descrição do ativo</label>
          <input
          type="text"
          placeholder="Descrição"
          value={descricaoAtivo}
          onChange={(e) => setDescricaoAtivo(e.target.value)}
          />
          <label htmlFor="marcaAtivo">Marca do ativo</label>
          <input
          type="text"
          placeholder="Marca"
          value={marcaAtivo}
          onChange={(e) => setMarcaAtivo(e.target.value)}
          />
          <label htmlFor="nsAtivo">Número de série do ativo</label>
          <input
          type="text"
          placeholder="Número de Série"
          value={nsAtivo}
          onChange={(e) => setNsAtivo(e.target.value)}
          />
          <label htmlFor="categoria">Categoria do ativo</label>
          <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categoriasList.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nomeCategoria}               
              </option>
            ))}
          </select>
          <label htmlFor="ambiente">Ambiente do ativo</label>
          <select
          value={ambienteId}
          onChange={(e) => setAmbienteId(e.target.value)}
          >
            <option value="">Selecione um ambiente</option>
            {ambientesList.map((ambiente) => (
              <option key={ambiente.idAmbiente} value={ambiente.idAmbiente}>
                {ambiente.nomeAmbiente}
              </option>
            ))}
          </select>
          <label htmlFor="criadoPor">Criado Por</label>
          <select
          value={selecionadoUsuario}
          onChange={(e) => setSelecionadoUsuario(e.target.value)}
          >
            <option value="">Selecione um usuário</option>
            {usuariosList.map((usuario) => (
              <option key={usuario.idUsuario} value={usuario.idUsuario}>
                {usuario.nomeUsuario}
              </option>
            ))}
          </select>
          {editingAtivo ? (
            <div>
              <button onClick={handleUpdateAtivo}>Atualizar Ativo</button>
              <button classname="cancel" onClick={handleCancelEdit}>Canecelar Edição</button>
              </div>
          ) : (
            <button onClick={handleSaveAtivoClick}>Salvar ativo</button>
          )}
          <button classname="cancel" onClcik={handleCancelAtivoClick}>Cancelar</button>
          </div>
      ) : null}
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Marca</th>
            <th>Número de Série</th>
            <th>Categoria</th>
            <th>Ambiente</th>
            <th>Criado por</th>
            <th>Ações</th>
          </tr>
          </thead>
          <tbody>
            {ativos.map((ativo) => (
              <tr key={ativo.idAtivo}>
                <td>{ativo.nomeAtivo}</td>
                <td>{ativo.descricaoAtivo}</td>
                <td>{ativo.marcaAtivo}</td>
                <td>{ativo.nsAtivo}</td>
                <td>{ativo.categoria.nomeCategoria}</td>
                <td>{ativo.ambiente.nomeAmbiente}</td>
                <td>{ativo.criadoPor.nomeUsuario}</td>
                <td>
                  <button className="tableedit" onClick={() => handleEditAtivo(ativo)}><FontAwesomeIcon icon={faEdit}/></button>
                  <button className="tabledelete" onClick={() => handleDeleteAtivo(ativo.id)}><FontAwesomeIcon icon={faTrash}/></button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>

    </div>
  );
}




  function Ambientes() {
    const [ambientes, setAmbientes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddingAmbiente, setIsAddingAmbiente] = useState(false);
    const [editingAmbiente, setEditingAmbirente] = useState(null);
    const [nomeAmbiente, setNomeAmbiente] = useState("");
    const [tipoAmbiente, setTipoAmbiente] = useState("");
    const [idAmbiente, setIdAmbiente] = useState("");

    useEffect(() => {
      fetchAmbientesData();
    }, []);

    const fetchAmbientesData = async () => {
      setIsLoading(true);

      try{
        const response = await fetch("http://localhost:8080/api/ambientes");
        if(!response.ok) {
          throw new Error("Erro ao buscar ambientes.");
        }
        const data = await response.json();
        setAmbientes(data);
      } catch (error) {
        console.error("Erro ao buscar ambientes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleAddAmbienteClick = () => {
      setIsAddingAmbiente(true);
    };

    const handleCancelAmbienteClick = () =>{
      setIsAddingAmbiente(false);
      setEditingAmbirente(null);
      clearAmbienteForm();
    };

    const handleSaveAmbienteClick = async () => {
      if (!nomeAmbiente.trim() || !tipoAmbiente.trim()){
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const novoAmbiente = {
        nomeAmbiente,
        tipoAmbiente,
        idAmbiente,
      };

      try{
        const response = await fetch("http://localhost:8080/api/ambientes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoAmbiente),
        });

        if(!response.ok) {
          throw new Error("Erro ao criar ambiente.");
        }

        fetchAmbientesData();
        setIsAddingAmbiente(false);
        clearAmbienteForm();
      } catch (error) {
        console.error("Erro ao criar ambiente:", error);
      }
    };

    const handleEditAmbiente = (ambiente) => {
      setEditingAmbirente(ambiente);
      setIdAmbiente(ambiente.idAmbiente);
      setNomeAmbiente(ambiente.nomeAmbiente);
      setTipoAmbiente(ambiente.tipoAmbiente);
    };

    const handleCancelEdit = () => {
      setEditingAmbirente(null);
      clearAmbienteForm();
    };

    const handleUpdateAmbiente = async () => {
      if (!nomeAmbiente.trim() || !tipoAmbiente.trim()){
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const ambienteAtualizado = {
        nomeAmbiente,
        tipoAmbiente,
        idAmbiente,
      };

      const requestBody = JSON.stringify(ambienteAtualizado);
      
      try{
        const response = await fetch(`http/localhost:8080/api/ambientes/${idAmbiente}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });

        if(!response.ok) {
          throw new Error("Erro ao atualizar ambiente.");
        }
 
        fetchAmbientesData();
        setEditingAmbirente(null);
        clearAmbienteForm();
      } catch (error) {
        console.error("Erro ao atualizar ambiente:", error);
      }
    };

    const handleDeleteAmbiente = (idAmbiente) => {
      const confirmDelete = window.confirm("Tem certeza de que deseja excluir este ambiente? ");

      if(confirmDelete) {
        fetch(`http://localhost:8080/api/ambiente/${idAmbiente}`, {
          method: "DELETE",
        })
        .then((response) => {
          if(response.ok) {
            const updateAmbientes = ambientes.filter((ambiente) => ambiente.idAmbiente !== idAmbiente);
            setAmbientes(updateAmbientes);
          } else {
            console.error("Erro ao excluir ambiente", response.status);
          }
        })
        .catch((error) => {
          console.error("Erro ao excluir ambiente:", error);
        });
      }
    };
    
    const clearAmbienteForm = () => {
      setNomeAmbiente("");
      setTipoAmbiente("");
      setIdAmbiente("");
    };

    return (
      <div>
        <h2>Ambientes</h2>

        <button className="add-dados-button" onClick={handleAddAmbienteClick}>
          Adicionar Ambiente
        </button>

        {isAddingAmbiente || editingAmbiente ? (
          <div className="add-dados-form">
            <h3>{editingAmbiente ? "Editor Ambiente" : "Novo Ambiente"}</h3>
            <label htmlFor="nomeAmbiente">Nome do Ambiente:</label>
            <input
            type="text"
            placeholder="Nome"
            value={nomeAmbiente}
            onChange={(e) => setNomeAmbiente(e.target.value)}
            />
            <label htmlFor="tipoAmbiente">Tipo do Ambiente:</label>
            <input
            type="texto"
            placeholder="Tipo"
            value={tipoAmbiente}
            onChange={(e) => setTipoAmbiente(e.target.value)}
            />
            {editingAmbiente ? (
              <div>
                <button onClick={handleUpdateAmbiente}>Atualizar Ambiente</button>
                <button className="cancel" onClick={handleCancelEdit}>Cancelar Edição</button>
              </div>
            ): (
              <button onClick={handleSaveAmbienteClick}>Salvar Ambiente</button>
            )}
            <button className="cancel" onClick={handleCancelAmbienteClick}>Cancelar</button>
            </div>
        ) : null}

        <table>
          <thead>
            <tr>
              <th>Nome do Ambiente</th>
              <th>Tipo do Ambiente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ambientes.map((ambiente) => (
              <tr key={ambiente.idAmbiente}>
                <td>{ambiente.nomeAmbiente}</td>
                <td>{ambiente.tipoAmbiente}</td>
                <td>
                  <button className="tableedit" onClick={() => handleEditAmbiente(ambiente)}><FontAwesomeIcon icon={faEdit}/></button>
                  <button className="tabledelete" onClick={() => handleDeleteAmbiente(ambiente.idAmbiente)}><FontAwesomeIcon icon={faTrash}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingCategoria, setIsAddingCategoria] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [descricaoCategoria, setDescricaoCategoria] = useState("");
  const [idCategoria, setIdCategoria] = useState("");

  useEffect(() => {
    fetchCategoriasData();
  }, []);

  const fetchCategoriasData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/categorias");
      if (!response.ok) {
        throw new Error("Erro ao buscar categorias.");
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategoriaClick = () => {
    setIsAddingCategoria(true);
  };

  const handleCancelCategoriaClick = () => {
    setIsAddingCategoria(false);
    setEditingCategoria(null);
    clearCategoriaForm();
  };

  const handleSaveCategoriaClick = async () => {
    if (!nomeCategoria.trim() || !descricaoCategoria.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novaCategoria = {
      nomeCategoria,
      descricaoCategoria,
    };
    
    try {
      const response = await fetch("http://localhost:8080/api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaCategoria),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar categoria.");
      }

      fetchCategoriasData();
      setIsAddingCategoria(false);
      clearCategoriaForm();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  const handleEditCategoria = (categoria) => {
    setEditingCategoria(categoria);
    setIdCategoria(categoria.idCategoria);
    setNomeCategoria(categoria.nomeCategoria);
    setDescricaoCategoria(categoria.descricaoCategoria);
  };

  const handleCancelEdit = () => {
    setEditingCategoria(null);
    clearCategoriaForm();
  };

  const handleUpdateCategoria = async () => {
    if (!nomeCategoria.trim() || !descricaoCategoria.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const categoriaAtualizada = {
      nomeCategoria,
      descricaoCategoria,
    };

    const requestBody = JSON.stringify(categoriaAtualizada);

    try {
      const response = await fetch(`http://localhost:8080/api/categorias/${idCategoria}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar categoria.");
      }

      fetchCategoriasData();
      setEditingCategoria(null);
      clearCategoriaForm();
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
    }
  };

  const handleDeleteCategoria = (idCategoria) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta categoria?");

    if (confirmDelete) {
      fetch(`http://localhost:8080/api/categorias/${idCategoria}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            const updatedCategorias = categorias.filter((categoria) => categoria.idCategoria !== idCategoria);
            setCategorias(updatedCategorias);
          } else {
            console.error("Erro ao exlcluir categoria:", response.status);
          }
        })
        .catch((error) => {
          console.error("Erro ao excluir categoria:", error);
        });
        
    }
  };

  const clearCategoriaForm = () => {
    setNomeCategoria("");
    setDescricaoCategoria("");
    setIdCategoria("");
  };

  return (
    <div>
      <h2>Categorias</h2>

      <button className="add-dados-button" onClick={handleAddCategoriaClick}>
        Adicionar Categoria
      </button>

      {isAddingCategoria || editingCategoria ? (
        <div className="add-dados-form">
          <h3>{editingCategoria ? "Editar Categoria" : "Nova Categoria"}</h3>
          <label htmlFor="nomeCategoria">Nome da Categoria:</label>
          <input
            type="text"
            placeholder="Nome"
            value={nomeCategoria}
            onChange={(e) => setNomeCategoria(e.target.value)}
          />
          <label htmlFor="descricaoCategoria">Descrição da Categoria:</label>
          <input
            type="text"
            placeholder="Descrição"
            value={descricaoCategoria}
            onChange={(e) => setDescricaoCategoria(e.target.value)}
          />
          {editingCategoria ? (
            <div>
              <button onClick={handleUpdateCategoria}>Atualizar Categoria</button>
              <button className="cancel" onClick={handleCancelEdit}>Cancelar Edição</button>
            </div>
          ) : (
            <button onClick={handleSaveCategoriaClick}>Salvar Categoria</button>
          )}
          <button className="cancel" onClick={handleCancelEdit}>Cancelar Edição</button>
        </div>
      ) : null}

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.idCategoria}>
              <td>{categoria.nomeCategoria}</td>
              <td>{categoria.descricaoCategoria}</td>
              <td>
                <button className="tableedit" onClick={() => handleEditCategoria(categoria)}><FontAwesomeIcon icon={faEdit} /></button>
                <button className="tabledelete" onClick={() => handleDeleteCategoria(categoria.idCategoria)}><FontAwesomeIcon icon ={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingUsuario, setIsAddingUsuario] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senhaUsuario, setSenhaUsuario] = useState("");

  useEffect(() => {
    fetchUsuariosData();
  }, []);

  const fetchUsuariosData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/usuarios");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários.");
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUsuarioClick = () => {
    setIsAddingUsuario(true);
  };

  const handleCancelUsuarioClick = () => {
    setIsAddingUsuario(false);
    setEditingUsuario(null);
    clearUsuarioForm();
  };

  const handleSaveUsuarioClick = async () => {
    if (!nomeUsuario.trim() || !senhaUsuario.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novoUsuario = {
      tipoUsuario: "Administrador",
      nomeUsuario,
      idUsuario: usuarios.length + 1,
      senhaUsuario,
    };

    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "appçocation/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário.")
      }

      fetchUsuariosData();
      setIsAddingUsuario(false);
      clearUsuarioForm();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const handleEditUsuario = (usuario) => {
    setEditingUsuario(usuario);
    setNomeUsuario(usuario.nomeUsuario);
    setSenhaUsuario(usuario.senhaUsuario);
  };

  const handleCancelEdit = () => {
    setEditingUsuario(null);
    clearUsuarioForm();
  };

  const handleUpdateUsuario = async () => {
    if (!nomeUsuario.trim() || !senhaUsuario.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const usuarioAtualizado = {
      tipoUsuario: "Administrador",
      nomeUsuario,
      idUsuario: editingUsuario.idUsuario,
      senhaUsuario,
    };

    const requestBody = JSON.stringify(usuarioAtualizado);

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${editingUsuario.idUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário.");
      }

      fetchUsuariosData();
      setEditingUsuario(null);
      clearUsuarioForm();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const handleDeleteUsuario = (idUsuario) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este usuário?");

    if (confirmDelete) {
      fetch(`http://localhost:8080/api/usuarios/${idUsuario}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            const updatedUsuarios = usuarios.filter((usuario) => usuario.idUsuario !== idUsuario);
            setUsuarios(updatedUsuarios);
          } else {
            console.error("Erro ao excluir usuário:", response.status);
          }
        })
        .catch((error) => {
          console.error("Erro ao excluir usuário:", error);
        });
    }
  };

  const clearUsuarioForm = () => {
    setNomeUsuario("");
    setSenhaUsuario("");
  };

  return (
    <div>
      <h2>Usuários</h2>

      <button className="add-dados-button" onClick={handleAddUsuarioClick}>
        Adicionar Usuário
      </button>

      {isAddingUsuario || editingUsuario ? (
        <div className="add-dados-form">
          <h3>{editingUsuario ? "Editar Usuário" : "Novo Usuário"}</h3>
          <label htmlFor="nomeUsuario">Nome do Usuário:</label>
          <input
            type="text"
            placeholder="Nome"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
          />
          <label htmlFor="senhaUsuario">Senha:</label>
          <input
            type="password"
            placeholder="Senha"
            value={senhaUsuario}
            onChange={(e) => setSenhaUsuario(e.target.value)}
          />
          {editingUsuario ? (
            <div>
              <button onClick={handleUpdateUsuario}>Atualizar Usuário</button>
              <button className="cancel" onClick={handleCancelEdit}>Cancelar Edição</button>
            </div>
          ) : (
            <button onClick={handleSaveUsuarioClick}>Salvar Usuário</button>
          )}
          <button className="cancel" onClick={handleCancelUsuarioClick}>Cancelar</button>
        </div>
      ) : null}

      <table>
        <thead>
          <tr>
            <th>Nome de Usuário</th>
            <th>Senha</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario => (
            <tr key={usuario.idUsuario}>
              <td>{usuario.nomeUsuario}</td>
              <td>{usuario.senhaUsuario}</td>
              <td>
                <button className="tableedit" onClick={() => handleEditUsuario(usuarios)}><FontAwesomeIcon icon={faEdit} /></button>
                <button className="tabledelete" onClick={() => handleDeleteUsuario(usuarios.idUsuario)}><FontAwesomeIcon icon ={faTrash} /></button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
}

export default App;