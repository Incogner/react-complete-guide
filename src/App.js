import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import styled from 'styled-components';


const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inheri;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;
class App extends Component {
  state = {
    persons: [
      { id: 'wer1', name: 'Max', age: 28},
      { id: 'wer2', name: 'Manu', age: 29},
      { id: 'wer3', name: 'Stephanie', age: 26}
    ], 
    otherState: 'something',
    showPersons: false
  }

  switchHandler = (newName) => {
    //console.log('switch clicked!');
    
    this.setState({
      persons: [
        { id: 'wer1', name: newName, age: 28},
        { id: 'wer2', name: 'Manu', age: 29},
        { id: 'wer3', name: 'Stephanie', age: 27}
      ]
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // };
    
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
                      key={person.id}
                      name={person.name} 
                      age={person.age}
                      click={this.deletePersonHandler.bind(this, index)}
                      changed={(event) => {this.nameChangedHandler(event, person.id)}} />
          })}
            
          </div>
      );

      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    let classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red'); //classes will be red
    }

    if(this.state.persons.length <=1) {
      classes.push('bold'); // classes = ['red', 'bold']
    }

    return (
        <div className="App">
        <h1>Hello, I am a react guide app!</h1>
        <p className={classes.join(' ')} >This is really working!</p>
        <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
