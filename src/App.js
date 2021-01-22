import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';


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
    let persons = null;
    let btnClass = '';

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

      btnClass= classes.Red;
    }

    let assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red); //classes will be red
    }

    if(this.state.persons.length <=1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }

    return (
        <div className={classes.App}>
        <h1>Hello, I am a react guide app!</h1>
        <p className={assignedClasses.join(' ')} >This is really working!</p>
        <button className={btnClass} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
