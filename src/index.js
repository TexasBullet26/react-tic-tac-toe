import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
    Changed the Square class to be a functional component.
    In React, functional components are a simpler way to
    write components that only contain a `render` method
    and don't have their own state. Functional components
    are less tedious to write than classes, and many components
    can be expressed this way.
*/
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
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
            /*
                Each time a player moves, xIsNext will be flipped
                to determine which player goes next and the game's
                state will be saved.
            */
            xIsNext: true,
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
        /*
            Returns early by ignoring a click if someone has won
            the game or if a Square is already filled.
        */
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        /*
            Updated the Board's handleClick function to flip the
            value of xIsNext. With this change, "X"s and "O"s can
            take turns.
        */
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
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
        /*
            Replaces the status declaration. This will call
            calculateWinner(squares) function to check if
            a player has won. If a player has won, we can
            display text such as "Winner: X" or "Winner: O".
        */
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }   else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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

/*
    Helper function that determines a winner. This function
    will be called in the Board's render function to check
    if a player has won.
*/
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
