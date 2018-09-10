import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    /*
        When a Square is clicked, the onClick function
        provided by the Board is called. This is how this
        is achieved:
          1. The onClick prop on the built-in DOM <button>
             component tells React to set up a click event
             listener.
          2. When the button is clicked, React will call the
             onClick event handle that is defined in Square's
             render() method.
          3. This event handler calls this.props.onClick().
             The Square's onClick prop was specified by the
             Board.
          4. Since the Board passed onClick={() => this.handleClick(i)}
             to Square, the Square calls this.handleClick(i) when clicked.
          5. We have not defined the handleClick() method yet, so our
             code crashes. 
    */
    render() {
        return (
            <button 
                className="square" 
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    /* 
        Add constructor to the Board and set the Board's 
        initial state to contain an array with 9 nulls. 
        These 9 nulls correspond to the 9 squares.
    */
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }
    
    /*
        Now the state is stored in the Board component instead
        of the individual Square components. When the Board
        state changes, the Square components re-render automatically.
        Keeping the state of all squares in the Board component
        will allow it to determine the winner in the future.
        The Square components are now controlled components. The
        Board has full control over them. We call .slice() to create
        a copy of the squares array to modify instea of modifying the
        existing array.
    */
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }

    /*
        Using the prop passing mechanism again. We modify 
        the Board to instruct each individual Square about 
        its current value ('X', 'O', or null). We defined the 
        squares array in the Board's constructor, and we will 
        modify the Board's renderSquare method to read from it.
    */
    renderSquare(i) {
        /*
            To maintain the Board's state's privacy, we'll pass
            down a function from the Board to the Square. This
            function will get called when a Square is clicked.
            Now we're passing down two props from Board to Square:
            value and onClick. The onClick prop is a function that
            Square can call when clicked. 
        */
        return ( 
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        
        );
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ============================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
