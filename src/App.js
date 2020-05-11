import React, { Component } from 'react'
import axios from 'axios'
import {Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Label , Input, FormGroup} from 'reactstrap';

export class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
        books : [],
        title: "",
        author: "",
        isbn: "",
        publicationDate: "",
        publisher: "",
        price: "",
        modal: false,
        modal1: false
    }

    this.onDelete = this.onDelete.bind(this)
    this.addNewBook = this.addNewBook.bind(this)
    this.toggle = this.toggle.bind(this)
    this.toggle1 = this.toggle1.bind(this)
    this.getOneBook = this.getOneBook.bind(this)
  }
  

  componentDidMount(){
     axios.get('http://localhost:3001/books')
     .then(response => {
        const books = response.data;
        this.setState({books})
     })

     console.log(this.state.books)
  }

  updateState(){
    axios.get('http://localhost:3001/books')
    .then(response => {
       const books = response.data;
       this.setState({books})
    })

  }

  onDelete(id){
    
    axios.delete(`http://localhost:3001/books/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })

    this.updateState();  
  }

  addNewBook(){
    let {title,author,isbn,publicationDate,publisher,price} = this.state;
     

     axios.post(`http://localhost:3001/books`, {
      "title": title,
      "author": author,
      "isbn": isbn,
      "publicationDate": publicationDate,
      "publisher": publisher,
      "price": price,
      
     })
      .then(res => {
        console.log(res);
        console.log(res.data);
      }) 

      this.updateState();
      this.setState({
        title: "",
        author: "",
        isbn: "",
        publicationDate: "",
        publisher: "",
        price: "",
        
        
      })
      this.updateState();
      
}

    getOneBook(id){
      axios.get(`http://localhost:3001/books/${id}`)
      .then(response => {
      const book = response.data;
      this.setState({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publicationDate: book.publicationDate,
          publisher: book.publisher,
          price: book.price,
         
      })
   })

   this.updateState();
  }

  updateBook(id){
    let {title,author,isbn,publicationDate,publisher,price} = this.state;

    axios.put(`http://localhost:3001/books/${id}`, {
      "title": title,
      "author": author,
      "isbn": isbn,
      "publicationDate": publicationDate,
      "publisher": publisher,
      "price": price,
      
     })
      .then(res => {
        console.log(res);
        console.log(res.data);
      }) 

      this.updateState();
      this.setState({
        title: "",
        author: "",
        isbn: "",
        publicationDate: "",
        publisher: "",
        price: "",
        
        
      })
      this.updateState();
  }
    
      
  changeTitle = (event) =>{
    this.setState({title: event.target.value})    
  }

 
changeAuthor = (event) =>{
    this.setState({author: event.target.value})    
  }

  changeIsbn = (event) =>{
    this.setState({isbn: event.target.value})    
  }

  changeDate = (event) =>{
    this.setState({publicationDate: event.target.value})    
  }

  changePublisher = (event) =>{
    this.setState({publisher: event.target.value})    
  }

  changePrice = (event) =>{
    this.setState({price: event.target.value})    
  }


 

 toggle(){
    this.setState({
      modal : !this.state.modal
    })
     
}



toggle1(id){
  this.setState({
    modal1 : !this.state.modal1
  })

  this.getOneBook(id)
}

   
  render() {
    return (
         <Table>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Publisher</th>
                  
               </tr>
            </thead>

            <tbody>
    { this.state.books.map((book) => {
          return ( 
            <tr>
              <td>{book.title}</td> 
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.publisher}</td>
              
              <td>
                  <Button color="danger" className="mr-2" onClick={() => {this.onDelete(book.id)} }>Delete</Button>
                  <Button color="success" onClick={() => this.toggle1(book.id)}>Update Book</Button>
               <Modal isOpen={this.state.modal1}>
                    <ModalHeader>Update old Book</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" value={this.state.title} onChange={this.changeTitle} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input id="author" value={this.state.author} onChange={this.changeAuthor}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="isbn">ISBN</Label>
                            <Input id="isbn" value={this.state.isbn} onChange={this.changeIsbn}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="pdate">Publication Date</Label>
                            <Input id="pdate" value={this.state.publicationDate} onChange={this.changeDate}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="publisher">Publisher</Label>
                            <Input id="publisher" value={this.state.publisher} onChange={this.changePublisher}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input id="price" value={this.state.price} onChange={this.changePrice}/>
                        </FormGroup>

                     </ModalBody>

                    <ModalFooter>
                      <Button color="primary" onClick={() => this.updateBook(book.id)}>Update</Button>
                      <Button color="secondary" onClick={this.toggle1}>Cancel</Button>
                    </ModalFooter>
               </Modal>
              </td>
            </tr>
          )
          })
    }
           </tbody>
           <div>
               <Button className="btn btn-block add" onClick={this.toggle}>Add new Book</Button>
               <Modal isOpen={this.state.modal}>
                    <ModalHeader>Enter new Book</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" value={this.state.title} onChange={this.changeTitle} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input id="author" value={this.state.author} onChange={this.changeAuthor}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="isbn">ISBN</Label>
                            <Input id="isbn" value={this.state.isbn} onChange={this.changeIsbn}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="pdate">Publication Date</Label>
                            <Input id="pdate" value={this.state.publicationDate} onChange={this.changeDate}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="publisher">Publisher</Label>
                            <Input id="publisher" value={this.state.publisher} onChange={this.changePublisher}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input id="price" value={this.state.price} onChange={this.changePrice}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.addNewBook}>ADD</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
               </Modal>
            </div>
         </Table>
    )
  }
}

export default App;
