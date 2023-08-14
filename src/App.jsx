// hooks react
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListBooks from './components/ListBooks';
import api from "./services/api";

const Container = styled.div`
  max-width: 960px;
  margin: 30px auto;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #ccc;
  padding: 10px;
`;

function App() {
  const[books, setBooks] = useState([]);
  const[search, setSearch] = useState('');

  useEffect( () => {
    const url= '/books';  

    const params = {};
    if (search) {
      
      params.title_like = search

      api.get('/books?_embed=books', {params})
      .then( (response) => {     // é uma promisse
        // console.log(response.data)
        setBooks(response.data)
      })

    } else {

      api.get(url)
          .then( (response) => {     // é uma promisse
            // console.log(response.data)
            setBooks(response.data)
          })
      
    }

  },[search])  


  return (
    <Container>
        <h1>Minhas Lista de Livros</h1>
        <input
          type="search"
          placeholder='Buscar Livros - Digite aqui o Título do Livro'
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />
        <ListContainer>
          {
            books.map(book => {
              return ( <ListBooks 
                key={book.url} 
                books={book}
                
                  /> )
            })
          }
          
        </ListContainer>
    </Container>

  )
}

export default App


